"use strict";
exports.id = 611;
exports.ids = [611];
exports.modules = {

/***/ 9611:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FF": () => (/* binding */ searchServices),
/* harmony export */   "Fb": () => (/* binding */ getAllUserSellerServiceSummaries),
/* harmony export */   "LV": () => (/* binding */ createOrder),
/* harmony export */   "M3": () => (/* binding */ addService),
/* harmony export */   "N_": () => (/* binding */ addReview),
/* harmony export */   "UD": () => (/* binding */ hasUserOrderedServiceDirectly),
/* harmony export */   "Vp": () => (/* binding */ editService),
/* harmony export */   "av": () => (/* binding */ setUser),
/* harmony export */   "eC": () => (/* binding */ uploadServiceImages),
/* harmony export */   "et": () => (/* binding */ getUserProfile),
/* harmony export */   "ko": () => (/* binding */ getService),
/* harmony export */   "pS": () => (/* binding */ createStripeAccountLink),
/* harmony export */   "pg": () => (/* binding */ isReviewEligible)
/* harmony export */ });
/* unused harmony exports callFirebaseFunction, confirmOrder, rejectOrder, getSellerOrders, getBuyerOrders, getSellerData */
/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8937);
/* harmony import */ var _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7211);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3392);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
/* harmony import */ var _publicHolidays__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6907);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_functions__WEBPACK_IMPORTED_MODULE_0__, _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _publicHolidays__WEBPACK_IMPORTED_MODULE_4__]);
([firebase_functions__WEBPACK_IMPORTED_MODULE_0__, _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__, firebase_storage__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _publicHolidays__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

 // Removed database

// Removed RTDB imports as they are no longer used here

 // Added
// Helper to get day of the week as a lowercase string (e.g., "monday")
const getDayOfWeek = (dateString)=>{
    const date = new Date(dateString);
    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];
    return days[date.getDay()]; // getDay() returns 0 for Sunday, 1 for Monday, etc.
};
const searchServices = async ({ category ="" , searchTerm ="" , serviceDate =""  })=>{
    // Category is optional for broader searches if searchTerm or serviceDate is provided
    // However, current UI implies category is usually present from navigation or previous search.
    // If category is truly optional, the query logic might need to change (e.g. not include category filter).
    // For now, assume if category is empty, it might be a broader search.
    let initialServices = [];
    try {
        const servicesCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "services");
        let servicesQuery;
        if (category) {
            servicesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(servicesCollection, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)("category", "==", category));
        } else {
            // If no category, fetch all services (could be inefficient, consider adding default limits or other filters)
            // For now, let's assume if no category, we might not query anything initially, or apply other primary filters.
            // This part might need refinement based on desired behavior for no-category searches.
            // If only date or searchTerm is provided without category, this initial fetch might be too broad.
            // Let's proceed assuming category is the primary filter for now, or all services are fetched if not.
            // For safety with potentially large datasets, if no category and no other strong filter,
            // it might be better to return empty or enforce some criteria.
            // However, the original function threw an error if no category. Let's adapt.
            // If no category, we will rely on client-side filtering entirely if other params exist.
            // This means we fetch ALL services if no category. This is DANGEROUS for large datasets.
            // A better approach would be a backend search function if category is optional.
            // Given the constraints, if no category, we'll fetch all and filter client-side.
            // This matches the "no backend changes for search logic" implication.
            if (!searchTerm && !serviceDate) {
                // If the intent is to allow search by date/term across all categories, this error is wrong.
                // Let's remove this error and allow fetching all if category is empty.
                // throw new Error("Category is required if no other search parameters are provided.");
                servicesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(servicesCollection); // Fetch all
            } else {
                servicesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(servicesCollection); // Fetch all, will be filtered client-side
            }
        }
        const snapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDocs)(servicesQuery);
        initialServices = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));
    } catch (error) {
        console.error("Error fetching initial services:", error);
        throw error; // Re-throw to be handled by the caller
    }
    let filteredServices = initialServices;
    // 1. Filter by searchTerm (q)
    if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredServices = filteredServices.filter((service)=>{
            const titleMatch = service.title && service.title.toLowerCase().includes(lowerSearchTerm);
            const descriptionMatch = service.description && service.description.toLowerCase().includes(lowerSearchTerm);
            // Add other fields to search if necessary, e.g., service.tags, service.sellerName
            return titleMatch || descriptionMatch;
        });
    }
    // 2. Filter by serviceDate
    if (serviceDate) {
        try {
            const year = serviceDate.substring(0, 4);
            // Public holidays will be fetched once and passed to isDatePublicHoliday if needed by its internal logic
            // No need to pass publicHolidays array directly to isDatePublicHoliday as it fetches them itself.
            const dayOfWeek = getDayOfWeek(serviceDate);
            const dateFilteredServices = [];
            for (const service of filteredServices){
                // Check 1: Available on that day of the week?
                // Use denormalized boolean fields like isAvailableOnMonday
                const dayOfWeekCapitalized = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
                const availabilityFlag = `isAvailableOn${dayOfWeekCapitalized}`; // e.g., isAvailableOnMonday
                if (!service[availabilityFlag]) {
                    continue;
                }
                // Check 2: Is it a public holiday?
                const isHoliday = await (0,_publicHolidays__WEBPACK_IMPORTED_MODULE_4__/* .isDatePublicHoliday */ .ib)(serviceDate); // No need to pass publicHolidays array
                if (isHoliday) {
                    // If it's a PH, is the service available on PH?
                    // Ensure comparison is with boolean true if availableOnPublicHolidays is stored as boolean
                    if (service.availableOnPublicHolidays === true || service.availableOnPublicHolidays === "yes") {
                        dateFilteredServices.push(service);
                    }
                } else {
                    // If not a public holiday, and available on that day of the week, it's a match
                    dateFilteredServices.push(service);
                }
            }
            filteredServices = dateFilteredServices;
        } catch (e) {
            console.error("Error during date filtering:", e);
        // Decide how to handle: return partially filtered, or empty, or re-throw
        // For now, let's return the services filtered up to this point before the error
        }
    }
    return filteredServices;
};
// Renamed and updated to fetch all active service summaries for the authenticated user
// from the userSellerServices collection, based on metadata.
const getAllUserSellerServiceSummaries = async ()=>{
    const user = _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .auth.currentUser */ .I8.currentUser;
    if (!user) {
        // It's often better to return empty or null for non-critical data fetching
        // and let the UI decide how to handle "not logged in" rather than throwing.
        // However, if this function is always expected to run for an auth'd user, throwing is fine.
        console.warn("getAllUserSellerServiceSummaries: User not authenticated.");
        return []; // Return empty array if no user
    }
    const allServiceSummaries = [];
    const metadataRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "users", user.uid, "userSellerServicesMetadata", "summary");
    let metadataSnap;
    try {
        metadataSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDoc)(metadataRef);
    } catch (error) {
        console.error("Error fetching service metadata:", error);
        return []; // Return empty on error fetching metadata
    }
    if (!metadataSnap.exists()) {
        console.log("User service metadata not found for user:", user.uid);
        return [];
    }
    const metadata = metadataSnap.data();
    const totalServices = metadata.totalServicesCount || 0;
    const lastGroupIndex = metadata.lastGroupIndex;
    if (totalServices === 0 || lastGroupIndex === undefined || lastGroupIndex < 0) {
        // lastGroupIndex can be 0, so check for undefined or negative.
        return [];
    }
    for(let i = 0; i <= lastGroupIndex; i++){
        const groupDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "users", user.uid, "userSellerServices", String(i));
        let groupDocSnap;
        try {
            groupDocSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDoc)(groupDocRef);
        } catch (error) {
            console.error(`Error fetching service group ${i} for user ${user.uid}:`, error);
            continue; // Skip this group on error
        }
        if (groupDocSnap.exists()) {
            const groupData = groupDocSnap.data();
            for(const key in groupData){
                if (Object.prototype.hasOwnProperty.call(groupData, key) && typeof groupData[key] === "object" && groupData[key] !== null && groupData[key].id) {
                    // Check if the service is NOT disabled.
                    // The 'disabled' field in the summary indicates if it's active.
                    // totalServicesCount in metadata should reflect non-disabled services.
                    if (!groupData[key].disabled) {
                        allServiceSummaries.push(groupData[key]);
                    }
                }
            }
        }
    }
    // Optional: Sort by createdAt timestamp (descending)
    allServiceSummaries.sort((a, b)=>{
        const timeA = a.createdAt?.seconds || (a.createdAt?._seconds) || (typeof a.createdAt === "number" ? a.createdAt : 0);
        const timeB = b.createdAt?.seconds || (b.createdAt?._seconds) || (typeof b.createdAt === "number" ? b.createdAt : 0);
        return timeB - timeA;
    });
    return allServiceSummaries;
};
const getService = async (serviceId)=>{
    if (!serviceId) throw new Error("Service ID is required");
    // Get the main service document
    const serviceRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "services", serviceId);
    const serviceSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDoc)(serviceRef);
    if (!serviceSnap.exists()) {
        throw new Error("Service not found");
    }
    const serviceDataFromSnap = serviceSnap.data();
    // Initialize images and features
    const images = Array.isArray(serviceDataFromSnap.images) ? serviceDataFromSnap.images : [];
    const features = Array.isArray(serviceDataFromSnap.features) ? serviceDataFromSnap.features : [];
    // Fetch reviews for THIS serviceId
    const currentServiceReviewsQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "reviews"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)("serviceId", "==", serviceId));
    const currentServiceReviewsSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDocs)(currentServiceReviewsQuery);
    const currentServiceReviews = currentServiceReviewsSnap.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }));
    // --- Existing logic for seller's total reviews and average rating ---
    let totalReviews = 0;
    let totalRating = 0;
    // Check if userId exists before querying other services by the same user
    if (serviceDataFromSnap.userId) {
        const userServicesQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "services"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)("userId", "==", serviceDataFromSnap.userId));
        const userServicesSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDocs)(userServicesQuery);
        for (const serviceDoc of userServicesSnap.docs){
            const relatedServiceId = serviceDoc.id;
            // Query reviews for each service of the user
            const reviewsQuery = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "reviews"), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)("serviceId", "==", relatedServiceId));
            const reviewsSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDocs)(reviewsQuery);
            totalReviews += reviewsSnap.size;
            reviewsSnap.forEach((reviewDoc)=>{
                totalRating += reviewDoc.data().rating;
            });
        }
    }
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0";
    // --- End of existing logic ---
    let serviceTotalRating = 0;
    currentServiceReviews.forEach((review)=>{
        serviceTotalRating += review.rating;
    });
    const serviceAverageRating = currentServiceReviews.length > 0 ? (serviceTotalRating / currentServiceReviews.length).toFixed(1) : "0";
    return {
        ...serviceDataFromSnap,
        images,
        features,
        reviews: currentServiceReviews,
        totalReviews,
        averageRating,
        serviceAverageRating
    };
};
const uploadServiceImages = async (files, userId)=>{
    const urls = [];
    console.log("userId", userId);
    for (const file of files){
        const serviceImageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.ref)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .storage */ .tO, `services/${userId}/${Date.now()}_${file.name}`);
        const snapshot = await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.uploadBytes)(serviceImageRef, file);
        const downloadURL = await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.getDownloadURL)(snapshot.ref);
        urls.push(downloadURL);
    }
    return urls;
};
// Generic Firebase function caller
const callFirebaseFunction = async (functionName, data)=>{
    try {
        const callable = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_0__.httpsCallable)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__/* .functions */ .wk, functionName);
        const result = await callable(data);
        return result.data;
    } catch (error) {
        console.error("Error calling Firebase function:", error);
        throw error;
    }
};
// Example Firebase function calls (replace with your actual functions)
// Services
const addService = async (serviceData)=>{
    return callFirebaseFunction("addService", serviceData);
};
const editService = async (serviceData)=>{
    return callFirebaseFunction("editService", serviceData);
};
// Reviews
const addReview = async (reviewData)=>{
    // Assuming reviewData contains serviceId instead of serviceId from the calling component
    return callFirebaseFunction("addReview", reviewData);
};
const isReviewEligible = async (userId, serviceId)=>{
    try {
        if (!userId || !serviceId) {
            // Alternatively, throw new Error("UserId and ServiceId are required.");
            return {
                eligible: false,
                reason: "MISSING_PARAMETERS"
            };
        }
        const ordersRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "orders");
        const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(ordersRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)("buyerId", "==", userId), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)("serviceId", "==", serviceId), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)("isCompleted", "==", true), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.limit)(1));
        const ordersSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDocs)(q);
        if (ordersSnapshot.empty) {
            return {
                eligible: false,
                reason: "NOT_ORDERED_OR_COMPLETED"
            };
        }
        const orderData = ordersSnapshot.docs[0].data();
        if (!orderData.completedAt) {
            return {
                eligible: false,
                reason: "MISSING_COMPLETION_DATE"
            };
        }
        // Firestore Timestamps can be directly converted to JS Date objects
        const completedAtTimestamp = orderData.completedAt.toDate();
        const currentTime = new Date();
        const timeDifferenceInMilliseconds = currentTime.getTime() - completedAtTimestamp.getTime();
        const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);
        if (timeDifferenceInHours > 48) {
            return {
                eligible: false,
                reason: "WINDOW_EXPIRED"
            };
        }
        return {
            eligible: true,
            reason: "ELIGIBLE"
        };
    } catch (error) {
        console.error("Error in isReviewEligible:", error);
        // Depending on how you want to handle errors, you might re-throw or return a specific object
        return {
            eligible: false,
            reason: "INTERNAL_ERROR",
            error: error.message
        };
    }
};
// Orders
const createOrder = async (orderData)=>{
    // Assuming orderData contains serviceId instead of serviceId from the calling component
    return callFirebaseFunction("createOrder", orderData);
};
const confirmOrder = async (orderId)=>{
    return callFirebaseFunction("approveOrder", {
        orderId
    });
};
const rejectOrder = async (orderId, rejectionReason)=>{
    return callFirebaseFunction("rejectOrder", {
        orderId,
        rejectionReason
    });
};
const hasUserOrderedServiceDirectly = async (serviceId, buyerId)=>{
    if (!serviceId || !buyerId) {
        console.error("serviceId and buyerId are required for hasUserOrderedServiceDirectly");
        return false;
    }
    try {
        const ordersRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "orders");
        const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.query)(ordersRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)("serviceId", "==", serviceId), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.where)("buyerId", "==", buyerId), (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.limit)(1));
        const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDocs)(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error in hasUserOrderedServiceDirectly:", error);
        return false;
    }
};
const getSellerOrders = async ()=>{
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error("User not authenticated.");
        }
        const userId = currentUser.uid;
        // Step 1: Fetch seller's services
        const servicesRef = collection(db, "services");
        const servicesQueryFS = firestoreQuery(servicesRef, where("userId", "==", userId));
        const servicesSnapshot = await getDocs(servicesQueryFS);
        const serviceIds = servicesSnapshot.docs.map((doc)=>doc.id);
        if (serviceIds.length === 0) {
            return {
                orders: []
            }; // No services = no orders
        }
        // Firestore 'in' queries support max 10 items — split if needed
        const chunkedServiceIds = serviceIds.length <= 10 ? [
            serviceIds
        ] : [
            ...Array(Math.ceil(serviceIds.length / 10))
        ].map((_, i)=>serviceIds.slice(i * 10, i * 10 + 10));
        const orders = [];
        // Step 2: Fetch orders for those services
        for (const chunk of chunkedServiceIds){
            const ordersRef = collection(db, "orders");
            const ordersQuery = firestoreQuery(ordersRef, where("serviceId", "in", chunk));
            const ordersSnapshot = await getDocs(ordersQuery);
            for (const docSnap of ordersSnapshot.docs){
                const orderData = docSnap.data();
                const buyerRef = doc(db, "users", orderData.buyerId.toString());
                const buyerSnap = await getDoc(buyerRef);
                // Assuming orderData.serviceId exists instead of orderData.serviceId
                const serviceRef = doc(db, "services", orderData.serviceId);
                const serviceSnap = await getDoc(serviceRef);
                orders.push({
                    id: docSnap.id,
                    ...orderData,
                    createdAt: orderData.createdAt.toDate().toISOString(),
                    buyer: buyerSnap.exists() ? buyerSnap.data() : null,
                    service: serviceSnap.exists() ? serviceSnap.data() : null
                });
            }
        }
        return {
            orders
        };
    } catch (error) {
        console.error("Error fetching seller orders:", error);
        throw error;
    }
};
const getBuyerOrders = async ()=>{
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error("User not authenticated.");
        }
        const userId = currentUser.uid;
        const ordersRef = collection(db, "orders");
        const ordersQuery = firestoreQuery(ordersRef, where("buyerId", "==", userId));
        const ordersSnapshot = await getDocs(ordersQuery);
        const orders = [];
        for (const docSnap of ordersSnapshot.docs){
            const orderData = docSnap.data();
            // Assuming orderData.serviceId exists instead of orderData.serviceId
            const serviceRef = doc(db, "services", orderData.serviceId);
            const serviceSnap = await getDoc(serviceRef);
            if (!serviceSnap.exists()) {
                console.warn(`Service not found for serviceId: ${orderData.serviceId}`);
                continue;
            }
            orders.push({
                id: docSnap.id,
                ...orderData,
                createdAt: orderData.createdAt.toDate().toISOString(),
                service: serviceSnap.data()
            });
        }
        return {
            orders
        };
    } catch (error) {
        console.error("Error fetching buyer orders:", error);
        throw error;
    }
};
// Chat functions have been moved to chatApi.js
const setUser = async (userData)=>{
    return callFirebaseFunction("setUser", userData);
};
// Stripe
const createStripeAccountLink = async ()=>{
    return callFirebaseFunction("createStripeAccount", {});
};
// Sellers
const getSellerData = async ()=>{
    const user = auth.currentUser;
    const userId = user.uid;
    if (!user || !user.uid) {
        throw new Error("User must be authenticated.");
    }
    try {
        // Count Services
        const servicesQueryFS = firestoreQuery(collection(db, "services"), where("userId", "==", userId));
        const servicesSnapshot = await getDocs(servicesQueryFS);
        const services = servicesSnapshot.size;
        // Count Completed Orders
        const completedOrdersQuery = firestoreQuery(collection(db, "orders"), where("isCompleted", "==", true), // Assuming 'service.userId' was intended to be a direct field on the order or requires a join/lookup.
        // For Firestore, if 'service' is an object with a 'userId' field, this query needs adjustment.
        // If 'service.userId' is not directly queryable, this logic would need rethinking (e.g., denormalization).
        // For now, assuming 'service' contains 'userId' directly or this was a placeholder.
        // Let's assume a 'sellerId' field on the order for this example, if 'service.userId' is problematic.
        // where("sellerId", "==", userId) // Example if 'sellerId' exists on order
        where("service.userId", "==", userId));
        const completedOrdersSnapshot = await getDocs(completedOrdersQuery);
        const orders = completedOrdersSnapshot.size;
        // Count Unread Messages - This was Firestore based, will be handled by RTDB listeners now or a separate function.
        // For the dashboard, this might need a new function or to aggregate counts from active listeners.
        // For now, let's comment this out as it's replaced by RTDB logic for individual chats.
        // A global unread message count for the dashboard would likely require a dedicated Cloud Function
        // that aggregates counts from RTDB or a denormalized count in Firestore/RTDB.
        // const unreadMessagesQuery = firestoreQuery(
        //   collection(db, "messages"), // This was likely a mistake, messages are now in RTDB
        //   where("recipientId", "==", userId),
        //   where("isRead", "==", false)
        // );
        // const unreadMessagesSnapshot = await getDocs(unreadMessagesQuery);
        // const unreadMessages = unreadMessagesSnapshot.size;
        const unreadMessages = 0; // Placeholder for now, as global count is complex with client-side RTDB.
        // Revenue Calculation
        const today = new Date();
        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const thisYear = new Date(today.getFullYear(), 0, 1);
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const getRevenue = async (startDate)=>{
            const revenueQuery = firestoreQuery(collection(db, "orders"), where("isCompleted", "==", true), // where("sellerId", "==", userId), // Assuming 'sellerId' on order as example
            where("service.userId", "==", userId), where("createdAt", ">=", Timestamp.fromDate(startDate)));
            const revenueSnapshot = await getDocs(revenueQuery);
            let totalRevenue = 0;
            revenueSnapshot.forEach((doc)=>{
                totalRevenue += doc.data().price || 0;
            });
            return totalRevenue;
        };
        const revenue = await getRevenue(thisYear);
        const dailyRevenue = await getRevenue(startOfDay);
        const monthlyRevenue = await getRevenue(thisMonth);
        return {
            dashboardData: {
                orders,
                services,
                unreadMessages,
                dailyRevenue,
                monthlyRevenue,
                revenue
            }
        };
    } catch (error) {
        console.error("Error fetching seller data:", error);
        throw new Error("Failed to fetch seller data.");
    }
};
// ------------------------------------------
// READS
const getUserProfile = async (userId)=>{
    if (!userId) throw new Error("User ID is required.");
    try {
        const userDocRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "users", userId);
        const userSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.getDoc)(userDocRef);
        if (!userSnap.exists()) {
            throw new Error("User not found.");
        }
        return userSnap.data();
    } catch (err) {
        console.error("Failed to fetch user profile:", err);
        throw err;
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;