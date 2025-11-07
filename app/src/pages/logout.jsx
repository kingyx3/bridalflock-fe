import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Logout() {
  const [{}, dispatch] = useStateProvider();

  const router = useRouter();
  useEffect(() => {
    dispatch({ type: reducerCases.SET_USER, userInfo: undefined });
    window.location.href = window.location.origin;
  }, [dispatch, router]);
  return (
    <div className="h-screen flex items-center justify-center text-center p-6 sm:p-10 md:p-20 flex-col bg-gray-50 dark:bg-gray-900"> {/* Changed h-[80vh] to h-screen, added justify-center, text-center, responsive padding and background */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-200"> {/* Responsive text size and color */}
        Logout successful. You are being redirected to the main page.
      </h1>
    </div>
  );
}

export default Logout;
