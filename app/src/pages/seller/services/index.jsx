import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useStateProvider } from "../../../context/StateContext";
import { db } from "../../../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; // Removed unused imports: collection, getDocs, query, orderBy, limit

function Index() {
  const [{ user }] = useStateProvider();

  const [currentGroupIndex, setCurrentGroupIndex] = useState(-1); // Start at -1 to indicate no group fetched yet
  const [allFetchedServices, setAllFetchedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreGroups, setHasMoreGroups] = useState(true);
  const [totalServices, setTotalServices] = useState(0);

  const SERVICES_PER_GROUP = 100; // Make sure this matches backend

  const fetchServiceGroup = async (groupIndexToFetch) => {
    // Use user.uid instead of user.id
    if (!user?.uid) {
      console.log("User UID not available for fetching services.");
      setLoading(false); // Ensure loading state is reset
      return;
    }

    setLoading(true);
    try {
      // Use user.uid
      const groupDocRef = doc(db, "users", user.uid, "userSellerServices", String(groupIndexToFetch));
      const groupDocSnap = await getDoc(groupDocRef);

      if (groupDocSnap.exists()) {
        const groupData = groupDocSnap.data();
        // Filter out metadata fields like _groupCreatedAt, _groupUpdatedAt, _groupIndex
        // And ensure the items are actual service objects (with an id)
        const servicesInGroup = Object.keys(groupData)
          .filter(
            key =>
              !key.startsWith("_") && // Exclude metadata fields
              groupData[key] &&
              typeof groupData[key] === "object" &&
              groupData[key].id
          )
          .map(key => ({ ...groupData[key], groupIndex: groupIndexToFetch }));

        // Sort by createdAt timestamp (service.createdAt should be a Firestore Timestamp)
        servicesInGroup.sort((a, b) => {
            const timeA = a.createdAt?.seconds || (a.createdAt?._seconds) || (typeof a.createdAt === 'number' ? a.createdAt : 0);
            const timeB = b.createdAt?.seconds || (b.createdAt?._seconds) || (typeof b.createdAt === 'number' ? b.createdAt : 0);
            return timeB - timeA; // Descending
        });

        setAllFetchedServices(prevServices => {
             const existingIds = new Set(prevServices.map(s => s.id));
             const newUniqueServices = servicesInGroup.filter(s => !existingIds.has(s.id));

             // If fetching group 0, replace existing group 0 services to ensure fresh data for that group.
             // Otherwise, append. This logic assumes groups are fetched sequentially.
             if (groupIndexToFetch === 0) {
                const nonGroup0Services = prevServices.filter(s => s.groupIndex !== 0);
                return [...nonGroup0Services, ...newUniqueServices].sort((a,b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)); // Re-sort all after potential replacement
             }
             return [...prevServices, ...newUniqueServices].sort((a,b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)); // Re-sort all
        });

        setCurrentGroupIndex(groupIndexToFetch);

        const maxPossibleGroups = Math.ceil(totalServices / SERVICES_PER_GROUP);
        if ((groupIndexToFetch + 1) >= maxPossibleGroups || totalServices === 0) {
          setHasMoreGroups(false);
        } else {
          setHasMoreGroups(true);
        }

      } else {
        // Group document doesn't exist
        setHasMoreGroups(false);
        if (groupIndexToFetch === 0 && totalServices > 0) {
            console.warn(`Group 0 not found for user ${user.uid} but totalServices is ${totalServices}. This might indicate an issue.`);
        }
      }
    } catch (err) {
      console.error(`Error fetching service group ${groupIndexToFetch} for user ${user?.uid}:`, err);
      setHasMoreGroups(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialServices = async () => {
      // Use user.uid
      if (!user?.uid) {
        // Clear out data if user logs out or uid becomes unavailable
        setAllFetchedServices([]);
        setTotalServices(0);
        setCurrentGroupIndex(-1);
        setHasMoreGroups(false);
        return;
      }

      setLoading(true);
      setAllFetchedServices([]);
      setCurrentGroupIndex(-1);

      try {
        // Use user.uid
        const metadataRef = doc(db, "users", user.uid, "userSellerServicesMetadata", "summary");
        const metadataSnap = await getDoc(metadataRef);
        let currentTotalServices = 0;
        if (metadataSnap.exists()) {
          currentTotalServices = metadataSnap.data().totalServicesCount || 0;
          setTotalServices(currentTotalServices);
        } else {
          setTotalServices(0);
        }

        if (currentTotalServices > 0) {
          setHasMoreGroups(true);
          // Fetch the first group (index 0)
          // The fetchServiceGroup will update currentGroupIndex to 0 after fetching
          await fetchServiceGroup(0);
        } else {
          setHasMoreGroups(false);
        }

      } catch (error) {
        console.error(`Error fetching initial service data for user ${user.uid}:`, error);
        setHasMoreGroups(false);
        setTotalServices(0);
      } finally {
        setLoading(false);
      }
    };

    loadInitialServices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]); // Trigger effect if user.uid changes


  return (
    <div className="min-h-[80vh] my-10 mt-0 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-6">
      <h3 className="mb-4 sm:mb-6 text-2xl font-semibold dark:text-white">All your Services</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                Service
              </th>
              <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                Category
              </th>
              <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                Price
              </th>
              <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                Duration
              </th>
              <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allFetchedServices.map((service) => {
              // Fields from serviceSummary: id, title, price, category, mainImage, createdAt, groupIndex, durationHours
              const { title, category, price, durationHours, id, mainImage } = service;
              return (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={id}
                >
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 flex-shrink-0">
                        {mainImage && (
                          <Image
                            className="h-full w-full rounded-full object-cover"
                            src={mainImage}
                            width={40}
                            height={40}
                            alt="Service Image"
                          />
                        )}
                      </div>
                      <div className="dark:text-gray-100 font-medium">{title}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">{category}</td>
                  {/* price is directly available from summary */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">${price}</td>
                  {/* durationHours is available in summary */}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">{durationHours || 'N/A'} Hours</td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 text-right">
                    <Link
                      href={`/seller/services/${id}?groupIndex=${service.groupIndex}`} // Pass groupIndex
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="text-center my-4 dark:text-white">Loading services...</div>
      )}
      {!loading && hasMoreGroups && totalServices > 0 && allFetchedServices.length < totalServices && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => fetchServiceGroup(currentGroupIndex + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            Load More Services
          </button>
        </div>
      )}
      {!loading && !hasMoreGroups && allFetchedServices.length > 0 && totalServices > 0 && allFetchedServices.length === totalServices && (
         <div className="text-center my-4 text-gray-500 dark:text-gray-400">No more services to load.</div>
      )}
      {/* Message for no services */}
      {!loading && totalServices === 0 && (
        <div className="text-center my-10 text-xl text-gray-500 dark:text-gray-300">You have no services yet. <Link href="/seller/services/create" className="text-blue-500 hover:underline">Create one!</Link></div>
      )}
      {/* Message if loading failed to fetch any services but metadata indicates there should be some */}
       {!loading && allFetchedServices.length === 0 && totalServices > 0 && (
        <div className="text-center my-10 text-xl text-gray-500 dark:text-gray-300">Could not load services. Please try again later or check your connection.</div>
      )}
    </div>
  );
}

export default Index;
