"use strict";
exports.id = 342;
exports.ids = [342];
exports.modules = {

/***/ 2648:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _interopRequireDefault;
    }
}));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}


/***/ }),

/***/ 7273:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _objectWithoutPropertiesLoose;
    }
}));
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}


/***/ }),

/***/ 7772:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_StateContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1701);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7211);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1492);
/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8937);
/* harmony import */ var _utils_publicHolidays__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6907);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_4__, firebase_firestore__WEBPACK_IMPORTED_MODULE_5__, firebase_functions__WEBPACK_IMPORTED_MODULE_6__, _utils_publicHolidays__WEBPACK_IMPORTED_MODULE_7__]);
([_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_4__, firebase_firestore__WEBPACK_IMPORTED_MODULE_5__, firebase_functions__WEBPACK_IMPORTED_MODULE_6__, _utils_publicHolidays__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




 // Assuming functions might be needed for seller actions

 // For seller actions

// Define outside if they are static, or pass as props if they vary more than role/type
const approveOrderFn = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_6__.httpsCallable)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_4__/* .functions */ .wk, "approveOrder");
const rejectOrderFn = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_6__.httpsCallable)(_utils_firebaseConfig__WEBPACK_IMPORTED_MODULE_4__/* .functions */ .wk, "rejectOrder");
const ORDERS_PER_GROUP = 100;
// Removed orderType, orders: externalOrders. Added upcomingOrders and pastOrders.
function OrdersDisplay({ pageTitle , userRole , emptyOrdersMessage , upcomingOrders =[] , pastOrders =[]  }) {
    const [{ userInfo  }] = (0,_context_StateContext__WEBPACK_IMPORTED_MODULE_1__/* .useStateProvider */ .C4)();
    // Seller-specific state for actions (approve/reject)
    const [updatingOrder, setUpdatingOrder] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
        text: "",
        type: ""
    });
    const [holidayStatusByDate, setHolidayStatusByDate] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({}); // Stores { "YYYY-MM-DD": true/false }
    // Internal state for optimistic updates.
    // We'll need to manage updates to upcoming and past orders separately if actions affect them.
    // This might become complex if an action moves an order from upcoming to past.
    // For now, let's assume actions primarily change status and might require parent to re-filter.
    // Or, we can pass callback to notify parent about changes.
    const [currentUpcomingOrders, setCurrentUpcomingOrders] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(upcomingOrders);
    const [currentPastOrders, setCurrentPastOrders] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(pastOrders);
    const allOrders = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>[
            ...upcomingOrders,
            ...pastOrders
        ], [
        upcomingOrders,
        pastOrders
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        setCurrentUpcomingOrders(upcomingOrders);
    }, [
        upcomingOrders
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        setCurrentPastOrders(pastOrders);
    }, [
        pastOrders
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const serviceDates = allOrders.map((order)=>order.serviceDate).filter((date)=>date); // Remove null/undefined dates
        if (serviceDates.length === 0) {
            setHolidayStatusByDate({}); // Reset if no dates
            return;
        }
        const uniqueYears = [
            ...new Set(serviceDates.map((dateStr)=>new Date(dateStr).getFullYear()))
        ];
        if (uniqueYears.length > 0) {
            (0,_utils_publicHolidays__WEBPACK_IMPORTED_MODULE_7__/* .prefetchPublicHolidays */ .vA)(uniqueYears); // Prefetch for all relevant years, no need to await here
        }
        const checkAllDates = async ()=>{
            const newHolidayStatus = {};
            for (const dateStr of serviceDates){
                if (dateStr && !newHolidayStatus.hasOwnProperty(dateStr)) {
                    try {
                        // Format date string to YYYY-MM-DD if not already
                        const formattedDateStr = new Date(dateStr).toISOString().split("T")[0];
                        newHolidayStatus[formattedDateStr] = await (0,_utils_publicHolidays__WEBPACK_IMPORTED_MODULE_7__/* .isDatePublicHoliday */ .ib)(formattedDateStr);
                    } catch (e) {
                        console.error("Error processing date for holiday check:", dateStr, e);
                        newHolidayStatus[dateStr] = false; // Default to false on error
                    }
                }
            }
            setHolidayStatusByDate((prevStatus)=>({
                    ...prevStatus,
                    ...newHolidayStatus
                }));
        };
        checkAllDates();
    }, [
        allOrders
    ]); // Re-run when orders change
    // Removed internal data fetching logic (fetchOrderGroup, loadInitialOrders, associated state)
    // as the component now expects pre-fetched and pre-filtered orders.
    // Removed filterOrder function as filtering is now done by the parent component.
    const renderOrderStatus = (order)=>{
        // Determine the status to display, prioritizing order.status
        let statusToDisplay = "Processing"; // Default
        if (order.status) {
            statusToDisplay = order.status;
        } else if (userRole === "buyer" && order.isCompleted) {
            statusToDisplay = "Completed";
        } else if (userRole === "seller" && order.isCompleted) {
            statusToDisplay = "Completed";
        }
        const lowerCaseStatus = statusToDisplay.toLowerCase();
        // Unified status rendering based on canonical list
        // Differentiate text slightly based on userRole if necessary for context
        switch(lowerCaseStatus){
            case "pending_seller_approval":
                return userRole === "seller" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-yellow-500",
                    children: "Pending Your Approval"
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-yellow-600 dark:text-yellow-400",
                    children: "Pending Seller Approval"
                });
            case "seller_approved_pending_capture":
                return userRole === "seller" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-blue-500",
                    children: "Processing Payment"
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-blue-600 dark:text-blue-400",
                    children: "Order Approved, Processing Payment"
                }); // Buyer might see a more generic "approved"
            case "approved_by_seller":
                return userRole === "buyer" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-blue-600 dark:text-blue-400",
                    children: "Order Approved by Seller"
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-green-500",
                    children: "Order Active (Payment Confirmed)"
                }); // Seller sees it as active
            case "payment_successful":
                return userRole === "seller" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-green-500 font-semibold",
                    children: "Order Active (Payment Confirmed)"
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-green-500 dark:text-green-400",
                    children: "Order Confirmed, Awaiting Fulfillment"
                });
            case "payment_failed":
                let failMsg = "Payment Failed";
                if (order.stripeError?.code) {
                    failMsg += ` (Code: ${order.stripeError.code})`;
                } else if (order.stripeError?.message) {
                    failMsg += ` (Message: ${order.stripeError.message.substring(0, 30)}...)`;
                }
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-red-700 dark:text-red-500",
                    title: order.stripeError?.message || "Payment processing failed.",
                    children: failMsg
                });
            case "rejected_by_seller":
                const rejectionText = userRole === "seller" ? "Order Rejected" : "Order Rejected by Seller";
                return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                    className: "text-red-600 dark:text-red-400",
                    children: [
                        rejectionText,
                        order.sellerNotes && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "text-xs italic",
                            children: [
                                "Reason: ",
                                order.sellerNotes
                            ]
                        })
                    ]
                });
            case "completed":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-green-600 dark:text-green-400",
                    children: "Order Completed"
                });
            case "canceled_by_system":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "Order Canceled"
                });
            case "processing":
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-gray-500 dark:text-gray-400",
                    children: "Processing..."
                });
            default:
                // Handle any other unexpected status string gracefully
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "text-gray-500 dark:text-gray-400",
                    children: statusToDisplay || (userRole === "seller" ? "Status Unknown" : "Processing...")
                });
        }
    };
    const handleApprove = async (orderId)=>{
        if (userRole !== "seller") return;
        setUpdatingOrder(orderId);
        setMessage({
            text: "",
            type: ""
        });
        try {
            // Optimistically update UI for both lists
            setCurrentUpcomingOrders((prevOrders)=>prevOrders.map((o)=>o.id === orderId ? {
                        ...o,
                        status: "seller_approved_pending_capture"
                    } : o));
            setCurrentPastOrders((prevOrders)=>prevOrders.map((o)=>o.id === orderId ? {
                        ...o,
                        status: "seller_approved_pending_capture"
                    } : o));
            await approveOrderFn({
                orderId
            });
            // Assuming approveOrderFn will trigger a backend update which then should reflect here,
            // or we rely on a refresh/re-fetch. For now, the optimistic update is 'seller_approved_pending_capture'.
            // A full refresh or specific item refresh might be needed if backend changes status to e.g. 'payment_successful'.
            setMessage({
                text: "Order approval initiated. Payment processing.",
                type: "success"
            });
        } catch (error) {
            console.error("Error approving order:", error);
            setMessage({
                text: `Failed to approve order: ${error.message}`,
                type: "error"
            });
        } finally{
            setUpdatingOrder(null);
        }
    };
    const handleReject = async (orderId)=>{
        if (userRole !== "seller") return;
        const reason = window.prompt("Please provide a reason for rejection (optional):");
        // If user cancels prompt, reason will be null. Proceed only if not null (i.e., user clicked OK or left it empty).
        if (reason !== null) {
            setUpdatingOrder(orderId);
            setMessage({
                text: "",
                type: ""
            });
            try {
                await rejectOrderFn({
                    orderId,
                    rejectionReason: reason || ""
                });
                // Optimistically update UI for both lists
                setCurrentUpcomingOrders((prevOrders)=>prevOrders.map((o)=>o.id === orderId ? {
                            ...o,
                            status: "rejected_by_seller",
                            sellerNotes: reason || ""
                        } : o));
                setCurrentPastOrders((prevOrders)=>prevOrders.map((o)=>o.id === orderId ? {
                            ...o,
                            status: "rejected_by_seller",
                            sellerNotes: reason || ""
                        } : o));
                setMessage({
                    text: "Order rejected successfully.",
                    type: "success"
                });
            } catch (error) {
                console.error("Error rejecting order:", error);
                setMessage({
                    text: `Failed to reject order: ${error.message}`,
                    type: "error"
                });
            } finally{
                setUpdatingOrder(null);
            }
        }
    };
    const renderOrderActions = (order)=>{
        if (userRole === "seller" && order.status && order.status.toLowerCase() === "pending_seller") {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: ()=>handleApprove(order.id),
                        disabled: updatingOrder === order.id,
                        className: "font-medium text-green-600 hover:text-green-800 disabled:opacity-50 mr-2",
                        children: updatingOrder === order.id ? "Approving..." : "Approve"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: ()=>handleReject(order.id),
                        disabled: updatingOrder === order.id,
                        className: "font-medium text-red-600 hover:text-red-800 disabled:opacity-50",
                        children: updatingOrder === order.id ? "Rejecting..." : "Reject"
                    })
                ]
            });
        }
        return null;
    };
    // Helper function to render a single table of orders
    const renderOrdersTable = (orders, tableTitle)=>{
        if (orders.length === 0) {
            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "my-6",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                        className: "text-lg font-semibold dark:text-white mb-3",
                        children: tableTitle
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-gray-500 dark:text-gray-400",
                        children: "No orders in this category."
                    })
                ]
            });
        }
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "my-8",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                    className: "text-lg sm:text-xl font-semibold dark:text-white mb-4",
                    children: tableTitle
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "relative overflow-x-auto shadow-md sm:rounded-lg",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                        className: "w-full text-sm text-left text-gray-500 dark:text-gray-400",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                                className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Order Id"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: userRole === "seller" ? "Service Title" : "Name"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Category"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Price"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Duration"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Service Date"
                                        }),
                                        " ",
                                        userRole === "seller" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Ordered By (ID)"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Order Date"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Status"
                                        }),
                                        userRole === "seller" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Actions"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                            scope: "col",
                                            className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                            children: "Send Message"
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                                children: orders.map((order)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                        className: "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                scope: "row",
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap dark:text-white",
                                                children: order.id
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                scope: "row",
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 font-medium whitespace-nowrap dark:text-white",
                                                children: order.serviceTitle || "N/A"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                                children: order.category || "N/A"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                                children: [
                                                    "$",
                                                    order.price
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                                children: [
                                                    order.durationHours || "N/A",
                                                    " Hours"
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                                children: order.serviceDate ? (()=>{
                                                    const dateStr = new Date(order.serviceDate).toISOString().split("T")[0];
                                                    const displayDate = new Date(order.serviceDate).toLocaleDateString();
                                                    const isHoliday = holidayStatusByDate[dateStr];
                                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: [
                                                            displayDate,
                                                            isHoliday && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "text-xs text-red-500 ml-1",
                                                                children: "(Holiday)"
                                                            })
                                                        ]
                                                    });
                                                })() : "N/A"
                                            }),
                                            " ",
                                            userRole === "seller" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                                children: order.buyerDisplayName || order.buyerId || "N/A"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                                children: order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : order.createdAt?._seconds ? new Date(order.createdAt._seconds * 1000).toLocaleDateString() : typeof order.createdAt === "number" ? new Date(order.createdAt).toLocaleDateString() : "N/A"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                                children: renderOrderStatus(order)
                                            }),
                                            userRole === "seller" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap",
                                                children: renderOrderActions(order)
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                className: "px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4",
                                                children: order.status && order.status.toLowerCase() === "approved_by_seller" || order.status.toLowerCase() === "payment_successful" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    href: `/${userRole === "buyer" ? "buyer" : "seller"}/messages/${order.id}`,
                                                    className: "font-medium text-blue-600 dark:text-blue-400 hover:underline",
                                                    children: "Send"
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    className: "text-gray-400 dark:text-gray-500",
                                                    children: "-"
                                                })
                                            })
                                        ]
                                    }, order.id))
                            })
                        ]
                    })
                })
            ]
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-[80vh] my-6 sm:my-10 px-4 sm:px-6 md:px-8",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: "text-xl sm:text-2xl font-semibold dark:text-white mb-4 sm:mb-6",
                children: pageTitle
            }),
            userRole === "seller" && message.text && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `p-4 mt-4 mb-4 text-sm rounded-lg ${message.type === "error" ? "bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800" : "bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800"}`,
                role: "alert",
                children: message.text
            }),
            renderOrdersTable(currentUpcomingOrders, "Upcoming Orders"),
            renderOrdersTable(currentPastOrders, "Past Orders"),
            currentUpcomingOrders.length === 0 && currentPastOrders.length === 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "text-center my-10 text-xl text-gray-500 dark:text-gray-300",
                children: emptyOrdersMessage || "You have no orders yet."
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrdersDisplay);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C4": () => (/* binding */ useStateProvider),
/* harmony export */   "X9": () => (/* binding */ StateProvider)
/* harmony export */ });
/* unused harmony export StateContext */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const StateContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const StateProvider = ({ initialState , reducer , children  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StateContext.Provider, {
        value: (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(reducer, initialState),
        children: children
    });
const useStateProvider = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(StateContext);


/***/ })

};
;