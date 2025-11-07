import { useStateProvider } from "../context/StateContext";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { db, functions } from "../utils/firebaseConfig"; // Assuming functions might be needed for seller actions
import { collection, doc, getDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { httpsCallable } from 'firebase/functions'; // For seller actions
import { isDatePublicHoliday, prefetchPublicHolidays } from "../utils/publicHolidays";

// Define outside if they are static, or pass as props if they vary more than role/type
const approveOrderFn = httpsCallable(functions, 'approveOrder');
const rejectOrderFn = httpsCallable(functions, 'rejectOrder');

const ORDERS_PER_GROUP = 100;

// Removed orderType, orders: externalOrders. Added upcomingOrders and pastOrders.
function OrdersDisplay({ pageTitle, userRole, emptyOrdersMessage, upcomingOrders = [], pastOrders = [] }) {
  const [{ userInfo }] = useStateProvider();

  // Seller-specific state for actions (approve/reject)
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [holidayStatusByDate, setHolidayStatusByDate] = useState({}); // Stores { "YYYY-MM-DD": true/false }

  // Internal state for optimistic updates.
  // We'll need to manage updates to upcoming and past orders separately if actions affect them.
  // This might become complex if an action moves an order from upcoming to past.
  // For now, let's assume actions primarily change status and might require parent to re-filter.
  // Or, we can pass callback to notify parent about changes.
  const [currentUpcomingOrders, setCurrentUpcomingOrders] = useState(upcomingOrders);
  const [currentPastOrders, setCurrentPastOrders] = useState(pastOrders);

  const allOrders = useMemo(() => [...upcomingOrders, ...pastOrders], [upcomingOrders, pastOrders]);

  useEffect(() => {
    setCurrentUpcomingOrders(upcomingOrders);
  }, [upcomingOrders]);

  useEffect(() => {
    setCurrentPastOrders(pastOrders);
  }, [pastOrders]);

  useEffect(() => {
    const serviceDates = allOrders
      .map(order => order.serviceDate)
      .filter(date => date); // Remove null/undefined dates

    if (serviceDates.length === 0) {
      setHolidayStatusByDate({}); // Reset if no dates
      return;
    }

    const uniqueYears = [...new Set(serviceDates.map(dateStr => new Date(dateStr).getFullYear()))];
    if (uniqueYears.length > 0) {
      prefetchPublicHolidays(uniqueYears); // Prefetch for all relevant years, no need to await here
    }

    const checkAllDates = async () => {
      const newHolidayStatus = {};
      for (const dateStr of serviceDates) {
        if (dateStr && !newHolidayStatus.hasOwnProperty(dateStr)) { // Check only if not already processed
          try {
            // Format date string to YYYY-MM-DD if not already
            const formattedDateStr = new Date(dateStr).toISOString().split('T')[0];
            newHolidayStatus[formattedDateStr] = await isDatePublicHoliday(formattedDateStr);
          } catch (e) {
            console.error("Error processing date for holiday check:", dateStr, e);
            newHolidayStatus[dateStr] = false; // Default to false on error
          }
        }
      }
      setHolidayStatusByDate(prevStatus => ({ ...prevStatus, ...newHolidayStatus }));
    };

    checkAllDates();
  }, [allOrders]); // Re-run when orders change


  // Removed internal data fetching logic (fetchOrderGroup, loadInitialOrders, associated state)
  // as the component now expects pre-fetched and pre-filtered orders.

  // Removed filterOrder function as filtering is now done by the parent component.

  const renderOrderStatus = (order) => {
    // Determine the status to display, prioritizing order.status
    let statusToDisplay = "Processing"; // Default
    if (order.status) {
      statusToDisplay = order.status;
    } else if (userRole === 'buyer' && order.isCompleted) {
      statusToDisplay = 'Completed';
    } else if (userRole === 'seller' && order.isCompleted) { // Though 'completed' should ideally come from order.status
      statusToDisplay = 'Completed';
    }

    const lowerCaseStatus = statusToDisplay.toLowerCase();

    // Unified status rendering based on canonical list
    // Differentiate text slightly based on userRole if necessary for context
    switch (lowerCaseStatus) {
      case 'pending_seller_approval':
        return userRole === 'seller'
          ? <span className="text-yellow-500">Pending Your Approval</span>
          : <span className="text-yellow-600 dark:text-yellow-400">Pending Seller Approval</span>;

      case 'seller_approved_pending_capture': // Primarily seller-facing
        return userRole === 'seller'
          ? <span className="text-blue-500">Processing Payment</span>
          : <span className="text-blue-600 dark:text-blue-400">Order Approved, Processing Payment</span>; // Buyer might see a more generic "approved"

      case 'approved_by_seller': // Buyer-facing confirmation
         return userRole === 'buyer'
          ? <span className="text-blue-600 dark:text-blue-400">Order Approved by Seller</span>
          : <span className="text-green-500">Order Active (Payment Confirmed)</span>; // Seller sees it as active

      case 'payment_successful': // System status, map to user-friendly text
        return userRole === 'seller'
          ? <span className="text-green-500 font-semibold">Order Active (Payment Confirmed)</span>
          : <span className="text-green-500 dark:text-green-400">Order Confirmed, Awaiting Fulfillment</span>;

      case 'payment_failed':
        let failMsg = "Payment Failed";
        if (order.stripeError?.code) { failMsg += ` (Code: ${order.stripeError.code})`; }
        else if (order.stripeError?.message) { failMsg += ` (Message: ${order.stripeError.message.substring(0,30)}...)`;}
        return <span className="text-red-700 dark:text-red-500" title={order.stripeError?.message || 'Payment processing failed.'}>{failMsg}</span>;

      case 'rejected_by_seller':
        const rejectionText = userRole === 'seller' ? "Order Rejected" : "Order Rejected by Seller";
        return (
          <span className="text-red-600 dark:text-red-400">
            {rejectionText}
            {order.sellerNotes && <div className="text-xs italic">Reason: {order.sellerNotes}</div>}
          </span>
        );

      case 'completed':
        return <span className="text-green-600 dark:text-green-400">Order Completed</span>;

      case 'canceled_by_system':
        return <span className="text-gray-600 dark:text-gray-400">Order Canceled</span>;

      case 'processing': // Fallback
        return <span className="text-gray-500 dark:text-gray-400">Processing...</span>;

      default:
        // Handle any other unexpected status string gracefully
        return <span className="text-gray-500 dark:text-gray-400">{statusToDisplay || (userRole === 'seller' ? 'Status Unknown' : 'Processing...')}</span>;
    }
  };

  const handleApprove = async (orderId) => {
    if (userRole !== 'seller') return;
    setUpdatingOrder(orderId);
    setMessage({ text: '', type: '' });
    try {
      // Optimistically update UI for both lists
      setCurrentUpcomingOrders(prevOrders =>
        prevOrders.map(o =>
          o.id === orderId ? { ...o, status: 'seller_approved_pending_capture' } : o
        )
      );
      setCurrentPastOrders(prevOrders => // Also update past orders in case it moved
        prevOrders.map(o =>
          o.id === orderId ? { ...o, status: 'seller_approved_pending_capture' } : o
        )
      );
      await approveOrderFn({ orderId });
      // Assuming approveOrderFn will trigger a backend update which then should reflect here,
      // or we rely on a refresh/re-fetch. For now, the optimistic update is 'seller_approved_pending_capture'.
      // A full refresh or specific item refresh might be needed if backend changes status to e.g. 'payment_successful'.
      setMessage({ text: 'Order approval initiated. Payment processing.', type: 'success' });
    } catch (error) {
      console.error("Error approving order:", error);
      setMessage({ text: `Failed to approve order: ${error.message}`, type: 'error' });
    } finally {
      setUpdatingOrder(null);
    }
  };

  const handleReject = async (orderId) => {
    if (userRole !== 'seller') return;
    const reason = window.prompt("Please provide a reason for rejection (optional):");
    // If user cancels prompt, reason will be null. Proceed only if not null (i.e., user clicked OK or left it empty).
    if (reason !== null) {
        setUpdatingOrder(orderId);
        setMessage({ text: '', type: '' });
        try {
          await rejectOrderFn({ orderId, rejectionReason: reason || "" });
          // Optimistically update UI for both lists
          setCurrentUpcomingOrders(prevOrders =>
            prevOrders.map(o =>
              o.id === orderId ? { ...o, status: 'rejected_by_seller', sellerNotes: reason || "" } : o
            )
          );
          setCurrentPastOrders(prevOrders => // Also update past orders
            prevOrders.map(o =>
              o.id === orderId ? { ...o, status: 'rejected_by_seller', sellerNotes: reason || "" } : o
            )
          );
          setMessage({ text: 'Order rejected successfully.', type: 'success' });
        } catch (error) {
          console.error("Error rejecting order:", error);
        setMessage({ text: `Failed to reject order: ${error.message}`, type: 'error' });
        } finally {
        setUpdatingOrder(null);
        }
    }
  };

  const renderOrderActions = (order) => {
    if (userRole === 'seller' && order.status && order.status.toLowerCase() === 'pending_seller') {
      return (
        <>
          <button
            onClick={() => handleApprove(order.id)}
            disabled={updatingOrder === order.id}
            className="font-medium text-green-600 hover:text-green-800 disabled:opacity-50 mr-2"
          >
            {updatingOrder === order.id ? 'Approving...' : 'Approve'}
          </button>
          <button
            onClick={() => handleReject(order.id)}
            disabled={updatingOrder === order.id}
            className="font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            {updatingOrder === order.id ? 'Rejecting...' : 'Reject'}
          </button>
        </>
      );
    }
    return null;
  };

  // Helper function to render a single table of orders
  const renderOrdersTable = (orders, tableTitle) => {
    if (orders.length === 0) {
      return (
        <div className="my-6">
          <h4 className="text-lg font-semibold dark:text-white mb-3">{tableTitle}</h4>
          <p className="text-gray-500 dark:text-gray-400">No orders in this category.</p>
        </div>
      );
    }

    return (
      <div className="my-8">
        <h4 className="text-lg sm:text-xl font-semibold dark:text-white mb-4">{tableTitle}</h4>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Order Id</th>
                <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                  {userRole === 'seller' ? 'Service Title' : 'Name'}
                </th>
                <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Category</th>
                <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Price</th>
                <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Duration</th>
                <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Service Date</th> {/* New Column */}
                {userRole === 'seller' && (
                  <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Ordered By (ID)</th>
                )}
                <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Order Date</th>
                <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Status</th>
                {userRole === 'seller' && (
                  <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Actions</th>
                )}
                <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">Send Message</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  key={order.id}
                >
                  <th scope="row" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap dark:text-white">
                    {order.id}
                  </th>
                  <th scope="row" className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 font-medium whitespace-nowrap dark:text-white">
                    {order.serviceTitle || 'N/A'}
                  </th>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">{order.category || 'N/A'}</td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">${order.price}</td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">{order.durationHours || 'N/A'} Hours</td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                    {order.serviceDate ?
                      (() => {
                        const dateStr = new Date(order.serviceDate).toISOString().split('T')[0];
                        const displayDate = new Date(order.serviceDate).toLocaleDateString();
                        const isHoliday = holidayStatusByDate[dateStr];
                        return (
                          <>
                            {displayDate}
                            {isHoliday && <span className="text-xs text-red-500 ml-1">(Holiday)</span>}
                          </>
                        );
                      })()
                      : 'N/A'
                    }
                  </td> {/* Display Service Date with Holiday Indicator */}
                  {userRole === 'seller' && (
                    <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                      {order.buyerDisplayName || order.buyerId || 'N/A'}
                    </td>
                  )}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                    {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : (order.createdAt?._seconds ? new Date(order.createdAt._seconds * 1000).toLocaleDateString() : (typeof order.createdAt === 'number' ? new Date(order.createdAt).toLocaleDateString() : 'N/A'))}
                  </td>
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">{renderOrderStatus(order)}</td>
                  {userRole === 'seller' && (
                    <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 whitespace-nowrap">
                      {renderOrderActions(order)}
                    </td>
                  )}
                  <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                    {(order.status && order.status.toLowerCase() === 'approved_by_seller' || order.status.toLowerCase() === 'payment_successful') ? ( // Adjusted condition for sending message
                      <Link
                        href={`/${userRole === 'buyer' ? 'buyer' : 'seller'}/messages/${order.id}`} // Corrected link path
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Send
                      </Link>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-[80vh] my-6 sm:my-10 px-4 sm:px-6 md:px-8">
      <h3 className="text-xl sm:text-2xl font-semibold dark:text-white mb-4 sm:mb-6">{pageTitle}</h3>

      {userRole === 'seller' && message.text && (
        <div className={`p-4 mt-4 mb-4 text-sm rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800' : 'bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800'}`} role="alert">
          {message.text}
        </div>
      )}

      {/* Render Upcoming Orders Table */}
      {renderOrdersTable(currentUpcomingOrders, "Upcoming Orders")}

      {/* Render Past Orders Table */}
      {renderOrdersTable(currentPastOrders, "Past Orders")}

      {/* Display overall empty message if both lists are empty */}
      {currentUpcomingOrders.length === 0 && currentPastOrders.length === 0 && (
        <div className="text-center my-10 text-xl text-gray-500 dark:text-gray-300">
          {emptyOrdersMessage || "You have no orders yet."}
        </div>
      )}

      {/* Removed pagination and loading indicators as data is passed directly */}
    </div>
  );
}

export default OrdersDisplay;
