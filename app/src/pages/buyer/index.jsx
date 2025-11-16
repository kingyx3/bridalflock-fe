import { useStateProvider } from "../../context/StateContext";
import { useNavigation } from "../../hooks/useNavigation";
import React from "react";
import AvatarImage from "../../components/AvatarImage";

function BuyerDashboard() {
  const [{ user }] = useStateProvider();
  const { navigate } = useNavigation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {user ? (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left - Profile Card */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 w-full lg:w-80 h-fit">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  <AvatarImage src={user.avatar} email={user.email} size={80} editable={false} />
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
                  {user.description || "Tell us more about what services you're looking for!"}
                </p>
              </div>
            </div>

            {/* Right - Content */}
            <div className="flex-1 space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <DashboardCard
                  title="Orders"
                  value={user.upcomingOrders || 0}
                  icon="📦"
                  onClick={() => navigate("/buyer/orders")}
                />
                <DashboardCard
                  title="Unread Messages"
                  value={user.unreadMessages || 0}
                  icon="✉️"
                  onClick={() => navigate("/buyer/messages")}
                />
                <DashboardCard
                  title="Total Spend"
                  value={`$${user.totalSpend || 0}`}
                  icon="💸"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <ActionButton
                    label="Browse Services"
                    icon="🔍"
                    onClick={() => navigate("/")}
                  />
                  <ActionButton
                    label="Messages"
                    icon="💬"
                    onClick={() => navigate("/buyer/messages")}
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
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-gray-600 dark:text-gray-300">Please login to view your dashboard</p>
        </div>
      )}
    </div>
  );
}

// Simplified Dashboard Card component
const DashboardCard = ({ title, value, icon, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 flex flex-col ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-xl font-bold mt-1 dark:text-white">{value}</h3>
      </div>
      <span className="text-xl">{icon}</span> {/* Icons (emojis) are generally fine */}
    </div>
    {onClick && (
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center">
        View all <span className="ml-1">→</span>
      </p>
    )}
  </div>
);

// Consistent Action Button component
const ActionButton = ({ label, icon, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
  >
    <span className="text-lg mb-1">{icon}</span> {/* Icons (emojis) are generally fine */}
    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{label}</span>
  </button>
);

export default BuyerDashboard;