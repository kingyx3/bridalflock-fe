import { useStateProvider } from "../../../context/StateContext";
// Link component might not be directly used here anymore if OrdersDisplay handles it, but keep for now.
// import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { db } from "../../../utils/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import OrdersDisplay from "../../../components/OrdersDisplay"; // Import OrdersDisplay

function BuyerOrdersPage() { // Renamed component for clarity
  const [{ user }] = useStateProvider();

  // --- Data fetching logic remains the same ---
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [allFetchedOrders, setAllFetchedOrders] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreGroupsToLoad, setHasMoreGroupsToLoad] = useState(true);
  const [totalOrdersFromMeta, setTotalOrdersFromMeta] = useState(0);

  const ORDERS_PER_GROUP = 100;

  // State for upcoming and past orders
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);


  const processGroupData = useCallback((groupData, groupIndex) => {
    const ordersInGroup = Object.entries(groupData)
      .filter(([key, value]) => key.startsWith("item_") && key !== "updatedAt" && value && !value.deletedAt && typeof value === 'object')
      .map(([key, value]) => value)
      // Initial sort by createdAt to maintain consistency before splitting
      .sort((a, b) => (b.createdAt?.seconds || b.createdAt?._seconds || b.createdAt || 0) - (a.createdAt?.seconds || a.createdAt?._seconds || a.createdAt || 0));

    setAllFetchedOrders(prevOrders => {
      const otherOrders = prevOrders.filter(order => order.groupIndex !== groupIndex);
      const updatedOrders = [...otherOrders, ...ordersInGroup.map(o => ({ ...o, groupIndex }))];
      // Sort all fetched orders by createdAt to ensure correct processing order if needed later
      updatedOrders.sort((a, b) => (b.createdAt?.seconds || b.createdAt?._seconds || b.createdAt || 0) - (a.createdAt?.seconds || a.createdAt?._seconds || a.createdAt || 0));
      return updatedOrders;
    });
  }, []);

  // Effect to split allFetchedOrders into upcoming and past orders
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day for comparison

    const currentUpcoming = [];
    const currentPast = [];

    allFetchedOrders.forEach(order => {
      // Ensure serviceDate is valid and convert to Date object
      // Assuming serviceDate is stored as a string 'YYYY-MM-DD' or a Firestore Timestamp
      let serviceDateObj;
      if (order.serviceDate && typeof order.serviceDate === 'string') {
        serviceDateObj = new Date(order.serviceDate);
      } else if (order.serviceDate && order.serviceDate.seconds) { // Firestore Timestamp
        serviceDateObj = new Date(order.serviceDate.seconds * 1000);
      } else {
        // If serviceDate is missing or invalid, treat as past or handle as an error
        // For now, let's put it in past orders if date is uncertain.
        currentPast.push(order);
        return;
      }
      serviceDateObj.setHours(0,0,0,0); // Normalize service date

      if (serviceDateObj >= today) {
        currentUpcoming.push(order);
      } else {
        currentPast.push(order);
      }
    });

    // Sort upcoming orders by serviceDate ascending
    currentUpcoming.sort((a, b) => {
        const dateA = a.serviceDate?.seconds ? new Date(a.serviceDate.seconds * 1000) : new Date(a.serviceDate || 0);
        const dateB = b.serviceDate?.seconds ? new Date(b.serviceDate.seconds * 1000) : new Date(b.serviceDate || 0);
        return dateA - dateB;
    });
    // Sort past orders by serviceDate descending
    currentPast.sort((a, b) => {
        const dateA = a.serviceDate?.seconds ? new Date(a.serviceDate.seconds * 1000) : new Date(a.serviceDate || 0);
        const dateB = b.serviceDate?.seconds ? new Date(b.serviceDate.seconds * 1000) : new Date(b.serviceDate || 0);
        return dateB - dateA;
    });

    setUpcomingOrders(currentUpcoming);
    setPastOrders(currentPast);
  }, [allFetchedOrders]);


  useEffect(() => {
    if (!user?.uid) {
      setAllFetchedOrders([]);
      setLoadingInitial(false);
      return;
    }
    setLoadingInitial(true);
    const metadataRef = doc(db, "users", user.uid, "userOrdersMetadata", "summary");
    const unsubscribeMetadata = onSnapshot(metadataRef, (metadataSnap) => {
      if (metadataSnap.exists()) {
        const newTotal = metadataSnap.data().totalOrdersCount || 0;
        setTotalOrdersFromMeta(newTotal);
        const maxPossibleGroupsBasedOnMeta = Math.ceil(newTotal / ORDERS_PER_GROUP);
        setHasMoreGroupsToLoad(currentGroupIndex < maxPossibleGroupsBasedOnMeta - 1);
      } else {
        setTotalOrdersFromMeta(0);
        setHasMoreGroupsToLoad(false);
      }
    }, (error) => {
      console.error("Error listening to metadata:", error);
      setTotalOrdersFromMeta(0);
      setHasMoreGroupsToLoad(false);
    });

    const group0Ref = doc(db, "users", user.uid, "userOrders", "0");
    const unsubscribeGroup0 = onSnapshot(group0Ref, (groupDocSnap) => {
      if (groupDocSnap.exists()) {
        processGroupData(groupDocSnap.data(), 0);
      } else {
        setAllFetchedOrders(prev => prev.filter(o => o.groupIndex !== 0));
        if (totalOrdersFromMeta === 0) {
            setHasMoreGroupsToLoad(false);
        }
      }
      setLoadingInitial(false);
    }, (error) => {
      console.error("Error listening to order group 0:", error);
      setLoadingInitial(false);
    });

    return () => {
      unsubscribeMetadata();
      unsubscribeGroup0();
    };
  }, [user?.uid, processGroupData, totalOrdersFromMeta, currentGroupIndex]);

  const fetchNextOrderGroup = async () => {
    if (!user?.uid || loadingMore || !hasMoreGroupsToLoad) return;
    setLoadingMore(true);
    const groupIndexToFetch = currentGroupIndex + 1;
    try {
      const groupDocRef = doc(db, "users", user.uid, "userOrders", String(groupIndexToFetch));
      const groupDocSnap = await getDoc(groupDocRef);
      if (groupDocSnap.exists()) {
        processGroupData(groupDocSnap.data(), groupIndexToFetch);
        setCurrentGroupIndex(groupIndexToFetch);
        const maxPossibleGroups = Math.ceil(totalOrdersFromMeta / ORDERS_PER_GROUP);
        setHasMoreGroupsToLoad(groupIndexToFetch < maxPossibleGroups - 1);
      } else {
        setHasMoreGroupsToLoad(false);
      }
    } catch (err) {
      console.error(`Error fetching order group ${groupIndexToFetch}:`, err);
      setHasMoreGroupsToLoad(false);
    } finally {
      setLoadingMore(false);
    }
  };
  // --- End of data fetching logic ---

  // renderOrderStatus is removed as OrdersDisplay will handle it.

  return (
    <div className="min-h-[80vh] my-6 sm:my-10 px-4 sm:px-6 md:px-8">
      {/* The h3 title will be passed to OrdersDisplay via pageTitle prop */}
      {/* Loading indicators and "Load More" button will be handled by this page if needed,
          or by OrdersDisplay if it were fetching its own data.
          Since we are passing data, this page manages its specific loading UI. */}

      {loadingInitial && (
        <div className="text-center my-4 dark:text-white">Loading recent orders...</div>
      )}

      <OrdersDisplay
        pageTitle="Your Orders" // Changed title
        userRole="buyer"
        emptyOrdersMessage="You have no orders yet."
        upcomingOrders={upcomingOrders} // Pass upcoming orders
        pastOrders={pastOrders} // Pass past orders
        // OrdersDisplay will now handle rendering these two lists
      />

      {/* "Load More" button logic specific to this page's fetching mechanism */}
      {/* This button loads more into `allFetchedOrders`, which then get processed by the useEffect hook */}
      {!loadingInitial && allFetchedOrders.length > 0 && hasMoreGroupsToLoad && (
        <div className="flex justify-center my-6">
          <button
            onClick={fetchNextOrderGroup}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More Orders"}
          </button>
        </div>
      )}
      {!loadingInitial && !loadingMore && !hasMoreGroupsToLoad && allFetchedOrders.length > 0 && (
         <div className="text-center my-4 text-gray-500 dark:text-gray-400">No more older orders to load.</div>
      )}
      {/* This specific empty message for when allFetchedOrders is empty after initial load
          is slightly different from OrdersDisplay's generic one, so we keep it here
          if OrdersDisplay's empty message isn't sufficient or if loadingInitial is a factor.
          However, OrdersDisplay also has an emptyOrdersMessage. We should consolidate.
          For now, OrdersDisplay will show its own empty message if displayedOrders is empty.
      */}
       {allFetchedOrders.length === 0 && !loadingInitial && !loadingMore && (
        // This specific message might be redundant if OrdersDisplay handles it well.
        // OrdersDisplay will show its `emptyOrdersMessage` if its `displayedOrders` (after its own filtering) is empty.
        // Since orderType="all", its internal filtering won't remove items.
        // So, if allFetchedOrders is empty, OrdersDisplay will also see an empty list.
        // Let's rely on OrdersDisplay's empty message for now.
        // <div className="text-center my-10 text-xl text-gray-500 dark:text-gray-300">You have no orders yet.</div>
        null // Rely on OrdersDisplay's empty message.
      )}
    </div>
  );
}

export default BuyerOrdersPage; // Renamed export
