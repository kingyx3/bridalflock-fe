import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useEffect, useState } from "react";

// Components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BaseLayout from "../components/BaseLayout";

// Context
import { StateProvider, useStateProvider } from "../context/StateContext";
import reducer, { initialState } from "../context/StateReducers";
import { reducerCases } from "../context/constants";

// Hooks
import { useNavigation } from "../hooks/useNavigation";

// Firebase
import { auth } from "../utils/firebaseConfig";
import {
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { getUserProfile } from "../utils/api";

// Styles
import "../globals.css";
import AuthWrapper from "../components/AuthWrapper"; // Added import
import { envVars } from "../utils/envConfig";

export default function App({ Component, pageProps }) {
  // This App component itself cannot call useStateProvider directly
  // because StateProvider is rendered *by* this component.
  // We need a new component that is a child of StateProvider to access the state.
  // Let's create a small wrapper component for the main content that can access the state.
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppContent Component={Component} pageProps={pageProps} />
    </StateProvider>
  );
}

// New wrapper component
function AppContent({ Component, pageProps }) {
  const [{ showLoginModal }] = useStateProvider(); // Get showLoginModal here

  return (
    <>
      <AuthSync>
        {(userId, isLoading, initialAuthChecked) => (
          <Layout userId={userId} isLoading={isLoading} initialAuthChecked={initialAuthChecked}>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthSync>
      {showLoginModal && <AuthWrapper />} {/* Conditionally render AuthWrapper */}
    </>
  );
}

function AuthSync({ children }) {
  const { router, navigateToRedirect, navigateWithRedirect } = useNavigation();
  const [, dispatch] = useStateProvider();
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);

  // Set persistence
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .catch((err) => {
        console.error("Could not set persistence:", err);
        toast.error("Failed to initialize authentication");
      });
  }, []);

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUserId(user.uid); // Keep this
          try {
            // Fetch additional user profile data from Firestore
            const profileData = await getUserProfile(user.uid);

            // Merge Firebase Auth user object with Firestore profile data
            // Firestore data takes precedence for custom fields
            const mergedUserObject = {
              ...user, // Basic auth user properties (uid, email, etc.)
              ...profileData, // Custom profile properties (userName, fullName, description, avatar)
            };

            dispatch({ type: reducerCases.SET_USER, user: mergedUserObject });

            // Username check is now handled by the Layout component (line 197)
            // to avoid race conditions and ensure proper context updates

          } catch (error) {
            console.error("Failed to fetch user profile data:", error);
            // If fetching profile data fails, dispatch the basic auth user object
            // This allows the app to function with at least the auth details.
            dispatch({ type: reducerCases.SET_USER, user });
            // Optionally, you could dispatch a specific error state or show a non-blocking toast
            // toast.error("Could not load full profile information.");
          }

          // Only redirect if there's a stored redirect URL (user was trying to access a protected page)
          // Don't redirect on every auth state change as it causes navigation loops
          if (typeof window !== 'undefined' && sessionStorage.getItem('redirectUrl')) {
            navigateToRedirect();
          }
        } else {
          // This part remains the same
          dispatch({ type: reducerCases.CLEAR_USER });
          setUserId(null);
        }
      } catch (error) {
        console.error("Auth state error:", error);
        toast.error("Authentication error");
      } finally {
        setIsLoading(false);
        setInitialAuthChecked(true);
      }
    });
    return () => unsubscribe();
  }, [dispatch, router, navigateToRedirect]);

  // Handle email link sign-in - now safe for SSR
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const handleEmailSignIn = async () => {
      try {
        if (isSignInWithEmailLink(auth, window.location.href)) {
          setIsLoading(true);
          const storedEmail = window.localStorage.getItem("emailForSignIn");
          if (!storedEmail) {
            toast.error("Missing email. Please try again.");
            return;
          }
          await signInWithEmailLink(auth, storedEmail, window.location.href);
          window.localStorage.removeItem("emailForSignIn");
          toast.success("Login Successful!");
          dispatch({ type: reducerCases.TOGGLE_LOGIN_MODAL, showLoginModal: false });
          navigateToRedirect("/");
        }
      } catch (err) {
        console.error("Email sign-in error:", err);
        toast.error("Sign-in failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    handleEmailSignIn();
  }, [dispatch, navigateToRedirect]); // Updated dependencies

  return children(userId, isLoading, initialAuthChecked);
}

// Define public paths outside component to avoid recreating on each render
const PUBLIC_PATHS = ["/terms-of-service", "/privacy-policy", "/search"];

// Helper function to check if a path should be public
const isPublicPath = (pathname) => {
  // Check exact matches
  if (PUBLIC_PATHS.includes(pathname) || pathname === "/") {
    return true;
  }
  // Check dynamic routes - service detail pages should be public
  if (pathname.startsWith("/service/")) {
    return true;
  }
  return false;
};

function Layout({ children, userId, isLoading, initialAuthChecked }) {
  const { navigate, navigateWithRedirect, router } = useNavigation();
  const [{ user }, dispatch] = useStateProvider();

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure client-side only

    const pathIsProtected = !isPublicPath(router.pathname);

    // if user has no username, and is not on the profile page, redirect to the profile page
    if (initialAuthChecked && !isLoading && user && !user.userName && router.pathname !== "/profile") {
      navigate("/profile?new=true");
      return;
    }

    // Redirect unauthenticated users to the root page if they are on a protected path
    if (initialAuthChecked && !isLoading && !userId && pathIsProtected) {
      navigateWithRedirect("/");
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: true,
      });
    }
  }, [initialAuthChecked, isLoading, userId, user, dispatch, navigate, navigateWithRedirect, router.pathname]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{envVars.REACT_APP_NAME}</title>
      </Head>

      <div className="relative flex flex-col min-h-screen">
        <Navbar userId={userId} isLoading={isLoading} initialAuthChecked={initialAuthChecked} />
        <main className="flex-1">
          <BaseLayout>{children}</BaseLayout>
        </main>
        <Footer />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        toastClassName="text-sm"
      />
    </>
  );
}
