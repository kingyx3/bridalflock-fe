import { useStateProvider } from '../../../context/StateContext';
// Link might not be directly used. OrdersDisplay handles message links.
// import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// httpsCallable, functions from firebaseConfig are not needed here if OrdersDisplay handles actions.
// approveOrderFn and rejectOrderFn are also not needed if OrdersDisplay handles them.
import { db } from "../../../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import OrdersDisplay from '../../../components/OrdersDisplay'; // Import OrdersDisplay

function SellerOrdersPage() { // Renamed component
  const [{ user }] = useStateProvider();
  // updatingOrder and message state will be managed by OrdersDisplay.
  // If this page needs to react to messages from OrdersDisplay, a callback prop could be added.
  // For now, OrdersDisplay has its own message state for approve/reject actions.
  // This page can keep a page-level message for fetch errors, for example.
  const [pageMessage, setPageMessage] = useState({ text: '', type: '' });


  // --- Data fetching logic remains the same ---
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [allFetchedOrders, setAllFetchedOrders] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [hasMoreGroups, setHasMoreGroups] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);

  // State for upcoming and past orders
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  const ORDERS_PER_GROUP = 100;

  const fetchSellerOrderGroup = async (groupIndexToFetch) => {
    if (!user?.uid ) {
        setLoadingList(false);
        return;
    }
    if (groupIndexToFetch > 0 && !hasMoreGroups) {
        setLoadingList(false);
        return;
    }

    setLoadingList(true);
    if (pageMessage.text && pageMessage.type === 'error') setPageMessage({text: '', type: ''});

    try {
      const groupDocRef = doc(db, "users", user.uid, "userSellerOrders", String(groupIndexToFetch));
      const groupDocSnap = await getDoc(groupDocRef);

      if (groupDocSnap.exists()) {
        const groupData = groupDocSnap.data();
        const ordersInGroup = Object.values(groupData).filter(order => order && !order.deletedAt && typeof order === 'object');
        ordersInGroup.sort((a, b) => {
            const timeA = a.createdAt?.seconds || (a.createdAt?._seconds) || (typeof a.createdAt === 'number' ? a.createdAt : 0);
            const timeB = b.createdAt?.seconds || (b.createdAt?._seconds) || (typeof b.createdAt === 'number' ? b.createdAt : 0);
            return timeB - timeA;
        });

        if (groupIndexToFetch === 0) {
             setAllFetchedOrders([...ordersInGroup]);
        } else {
             setAllFetchedOrders(prevOrders => {
                const existingOrderIds = new Set(prevOrders.map(o => o.id));
                const newUniqueOrders = ordersInGroup.filter(o => !existingOrderIds.has(o.id));
                return [...prevOrders, ...newUniqueOrders];
            });
        }
        setCurrentGroupIndex(groupIndexToFetch);

        const maxPossibleGroups = Math.ceil(totalOrders / ORDERS_PER_GROUP);
        if ((groupIndexToFetch + 1) >= maxPossibleGroups || totalOrders === 0 || ordersInGroup.length < ORDERS_PER_GROUP) {
          setHasMoreGroups(false);
        } else {
          setHasMoreGroups(true);
        }
      } else {
        if (groupIndexToFetch === 0) setAllFetchedOrders([]);
        setHasMoreGroups(false);
      }
    } catch (err) {
      console.error(`Error fetching seller order group ${groupIndexToFetch}:`, err);
      setPageMessage({ text: `Error fetching page ${groupIndexToFetch + 1}. Details: ${err.message}`, type: 'error' });
    } finally {
      setLoadingList(false);
    }
  };

  const loadInitialSellerOrders = async () => {
    if (!user?.uid) return;
    setLoadingList(true);
    if (pageMessage.text) setPageMessage({text: '', type: ''});

    try {
      const metadataRef = doc(db, "users", user.uid, "userSellerOrdersMetadata", "summary");
      const metadataSnap = await getDoc(metadataRef);
      let currentTotalOrders = 0;
      if (metadataSnap.exists()) {
        currentTotalOrders = metadataSnap.data().totalOrdersCount || 0;
        setTotalOrders(currentTotalOrders);
      } else {
        setTotalOrders(0);
      }
      setAllFetchedOrders([]);
      setCurrentGroupIndex(0);
      if (currentTotalOrders > 0) {
        setHasMoreGroups(true);
        await fetchSellerOrderGroup(0);
      } else {
        setHasMoreGroups(false);
      }
    } catch (error) {
      console.error("Error fetching initial seller order data:", error);
      setPageMessage({ text: `Failed to load initial order data. Details: ${error.message}`, type: 'error' });
      setHasMoreGroups(false);
      setTotalOrders(0);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (user?.uid) { // Ensure user.uid exists before loading
        loadInitialSellerOrders();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]); // Rerun if user.uid changes


  // Effect to split allFetchedOrders into upcoming and past orders
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day

    const currentUpcoming = [];
    const currentPast = [];

    allFetchedOrders.forEach(order => {
      let serviceDateObj;
      if (order.serviceDate && typeof order.serviceDate === 'string') {
        serviceDateObj = new Date(order.serviceDate);
      } else if (order.serviceDate && order.serviceDate.seconds) { // Firestore Timestamp
        serviceDateObj = new Date(order.serviceDate.seconds * 1000);
      } else {
        currentPast.push(order); // Treat as past if date is uncertain
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

  // refreshOrderData, handleApprove, handleReject, renderOrderStatus, renderOrderActions
  // are removed as these responsibilities are delegated to OrdersDisplay.

  return (
    <div className="min-h-[80vh] my-6 sm:my-10 px-4 sm:px-6 md:px-8">
      {/* Page-specific messages (e.g., for fetch errors not covered by OrdersDisplay) */}
      {pageMessage.text && (
        <div className={`p-4 mt-4 mb-4 text-sm rounded-lg ${pageMessage.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800' : 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800'}`} role="alert">
          {pageMessage.text}
        </div>
      )}

      {/* OrdersDisplay will show its own messages related to approve/reject actions. */}
      <OrdersDisplay
        pageTitle="Your Received Orders" // Changed title
        userRole="seller"
        emptyOrdersMessage="You have no orders from buyers yet."
        upcomingOrders={upcomingOrders} // Pass upcoming orders
        pastOrders={pastOrders} // Pass past orders
        // Consider passing a refresh callback if actions in OrdersDisplay should trigger a full re-fetch here
        // e.g., onOrderActionCompleted={loadInitialSellerOrders}
      />

      {/* Pagination UI controlled by this page */}
      {loadingList && !pageMessage.text && ( // Don't show loading if there's an error message
        <div className="text-center my-4 dark:text-white">Loading orders...</div>
      )}
      {!loadingList && hasMoreGroups && totalOrders > 0 && !pageMessage.text && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => fetchSellerOrderGroup(currentGroupIndex + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loadingList}
          >
            Load More Orders
          </button>
        </div>
      )}
      {!loadingList && !hasMoreGroups && allFetchedOrders.length > 0 && !pageMessage.text && (
         <div className="text-center my-4 text-gray-500 dark:text-gray-400">No more orders to load.</div>
      )}
      {/* Rely on OrdersDisplay's empty message, unless there's a page-level error message */}
      {allFetchedOrders.length === 0 && !loadingList && !pageMessage.text && (
        null
      )}
    </div>
  );
}

export default SellerOrdersPage; // Renamed export
