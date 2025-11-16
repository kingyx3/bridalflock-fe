import { useStateProvider } from "../../context/StateContext";
import { getSellerData, getAllUserSellerServiceSummaries } from "../../utils/api"; // Import getAllUserSellerServiceSummaries
import { useNavigation } from "../../hooks/useNavigation";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { reducerCases } from "../../context/constants";
import AvatarImage from "../../components/AvatarImage";

function Index() {
  const dashboardData = null;
  const [{ user }, dispatch] = useStateProvider();
  const { navigate, router } = useNavigation();
  const [activeServicesCount, setActiveServicesCount] = useState(0);
  const [showStripeSuccessMessage, setShowStripeSuccessMessage] = useState(false);

  useEffect(() => {
    if (router.query.stripe_connect_success === 'true') {
      setShowStripeSuccessMessage(true);
      // Optional: Clean the URL
      const { pathname, query } = router;
      delete query.stripe_connect_success;
      delete query.user_id; // Also remove user_id if present
      router.replace({ pathname, query }, undefined, { shallow: true });

      // Optional: Hide message after a few seconds
      // setTimeout(() => setShowStripeSuccessMessage(false), 5000);
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      getAllUserSellerServiceSummaries()
        .then((data) => {
          setActiveServicesCount(data.length);
        })
        .catch((error) => {
          console.error("Error fetching active services count:", error);
        });
    }
  }, [user]); // Add user to dependency array

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {user ? (
        <div className="space-y-6">
          {showStripeSuccessMessage && (
            <div
              style={{
                backgroundColor: 'lightgreen',
                color: 'darkgreen',
                padding: '15px',
                borderRadius: '5px',
                textAlign: 'center',
                marginBottom: '20px',
                border: '1px solid darkgreen',
              }}
              onClick={() => setShowStripeSuccessMessage(false)} // Allow dismissing
            >
              Stripe account connected successfully! You are now ready to receive payments.
            </div>
          )}
          {/* Profile and Stats Section */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Side - Profile Card */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 w-full lg:w-80 h-fit"> {/* Slightly narrower profile card */}
              <div className="flex flex-col sm:flex-row items-center gap-4"> {/* Reduced gap */}
                <div className="relative">
                  <AvatarImage src={user.avatar} email={user.email} size={80} editable={false} /> {/* Slightly smaller avatar */}
                </div>
                <div className="text-center sm:text-left">
                <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {user.fullName || "Your Name"}
                  </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">@{user.userName || "username"}</p>
                  <button
                    onClick={() => navigate("/profile")}
                    className="mt-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

            <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4">
              <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">About</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {user.description || "Add a description about yourself and your services"}
                </p>
              </div>
            </div>

            {/* Right Side - Stats Grid */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <DashboardCard
                  title="Total Services"
                value={activeServicesCount}
                  color="bg-blue-50 text-blue-600"
                  icon="📋"
                  onClick={() => navigate("/seller/services")}
                />
                <DashboardCard
                  title="Orders"
                  value={user.orders || 0}
                  color="bg-green-50 text-green-600"
                  icon="📦"
                  onClick={() => navigate("/seller/orders")}
                />
                <DashboardCard
                  title="Earnings Today"
                  value={`$${dashboardData?.dailyRevenue || 0}`}
                  color="bg-purple-50 text-purple-600"
                  icon="💰"
                />
                <DashboardCard
                  title="Earnings Monthly"
                  value={`$${dashboardData?.monthlyRevenue || 0}`}
                  color="bg-indigo-50 text-indigo-600"
                  icon="📅"
                />
                <DashboardCard
                  title="Earnings Yearly"
                  value={`$${dashboardData?.revenue || 0}`}
                  color="bg-teal-50 text-teal-600"
                  icon="📊"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4"> {/* Reduced padding */}
                <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Quick Actions</h2> {/* Smaller heading */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2"> {/* Tighter gap */}
                  <ActionButton
                    label="Create Service"
                    icon="➕"
                    onClick={() => navigate("/seller/services/create")}
                  />
                  <ActionButton
                    label="Messages"
                    icon="💬"
                    onClick={() => navigate("/seller/messages")}
                  />
                  <ActionButton
                    label="Account"
                    icon="⚙️"
                    onClick={() => navigate("/profile")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[40vh]"> {/* Reduced min-height */}
          <p className="text-gray-600 dark:text-gray-300">Please login to view your dashboard</p>
        </div>
      )}
    </div>
  );
}

// Reusable Dashboard Card - More compact version
const DashboardCard = ({ title, value, color, icon, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`} // Smaller card
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p> {/* Smaller text */}
        <h3 className="text-xl font-bold mt-1 dark:text-white">{value}</h3> {/* Smaller heading */}
      </div>
      <span className="text-xl">{icon}</span> {/* Smaller icon, emojis are fine */}
    </div>
    {onClick && (
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center"> {/* Smaller text */}
        View all <span className="ml-1">→</span>
      </p>
    )}
  </div>
);

// Reusable Quick Action - More compact version
const ActionButton = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors" // Smaller button
  >
    <span className="text-lg mb-1">{icon}</span> {/* Smaller icon, emojis are fine */}
    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{label}</span> {/* Smaller text, added dark text color */}
  </button>
);

export default Index;