import React, { useEffect, useState, useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import Button from "./common/Button"; // Import the Button component
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { toast } from "react-toastify";
import { auth } from "../utils/firebaseConfig";
import {
  sendSignInLinkToEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { envVars } from "../utils/envConfig";

function AuthWrapper() {
  const [{ user }, dispatch] = useStateProvider(); // Make sure you also get user if needed
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const closeModal = useCallback(() => {
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: false,
    });
  }, [dispatch]);

  // Handle body overflow
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  // Validate email on change
  useEffect(() => {
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [email]);

  const handleGoogleAuth = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      if (firebaseUser) {
        const appUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          // etc.
        };
        dispatch({ type: reducerCases.SET_USER, user: appUser }); // Dispatch user to context
        toast.success("Login Successful!");
        closeModal();
        const redirectUrl = sessionStorage.getItem("redirectUrl");
        if (redirectUrl) {
          router.push(redirectUrl);
          sessionStorage.removeItem("redirectUrl");
        } else {
          router.push("/");
        }
      } else {
        throw new Error("No user data received from Google sign-in");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error(err.message || "Google Sign-in failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailLinkAuth = async () => {
    if (isSubmitting || !isEmailValid) return;
    setIsSubmitting(true);
    try {
      const actionCodeSettings = {
        url: window.location.origin, // Better to use origin than href
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      toast.success("Magic link sent! Check your inbox.");
      setEmail(""); // Clear email after successful send
    } catch (err) {
      console.error("Email-link login failed:", err);
      toast.error(err.message || "Failed to send magic link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100]" onClick={closeModal}>
      <div className="absolute inset-0 backdrop-blur-md bg-neutral-dark/30" />
      <div
        className="relative z-[101] flex h-full w-full items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-md rounded-lg bg-neutral-light dark:bg-neutral-dark p-6 shadow-lg">
          <h3 className="mb-6 text-center text-2xl font-semibold text-neutral-dark dark:text-neutral-light">
            Sign in to {envVars.REACT_APP_NAME}
          </h3>

          <button
            onClick={handleGoogleAuth}
            disabled={isSubmitting}
            className={`mb-4 flex w-full items-center justify-center gap-2 rounded-md border py-3 transition text-neutral-dark dark:text-neutral-light ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed border-neutral-medium/30 dark:border-neutral-medium"
                : "border-neutral-medium dark:border-neutral-medium hover:bg-secondary dark:hover:bg-neutral-medium"
            }`}
          >
            <FcGoogle className="text-2xl" />
            {isSubmitting ? "Processing..." : "Continue with Google"}
          </button>

          <div className="relative my-4 text-center text-sm text-neutral-medium dark:text-neutral-light">
            <span className="bg-neutral-light dark:bg-neutral-dark px-2 relative z-[1]">OR</span>
            <div className="absolute inset-0 top-[50%] h-[1px] bg-neutral-medium dark:bg-neutral-medium" />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              autoFocus
              className={`w-full rounded-md border p-3 focus:outline-none bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light placeholder-neutral-medium dark:placeholder-neutral-medium ${
                email && !isEmailValid
                  ? "border-error focus:ring-error"
                  : "border-neutral-medium dark:border-neutral-medium focus:ring-success"
              } focus:ring-2`}
            />
            {email && !isEmailValid && (
              <p className="mt-1 text-sm text-error">Please enter a valid email</p>
            )}
          </div>

          <Button
            variant="filled"
            size="lg" // Using lg for p-3, text size will be larger but consistent
            onClick={handleEmailLinkAuth}
            disabled={isSubmitting || !isEmailValid}
            className={`w-full transition text-white dark:text-white ${ // font-semibold is part of Button's baseStyles
              !(isSubmitting || !isEmailValid) && "bg-primary hover:bg-violet-700" // Apply bg colors only if not disabled
            } ${
              (isSubmitting || !isEmailValid) && "bg-primary/50" // Custom disabled background
            }`}
            // Note: Button's default filled is blue. We are overriding with primary/violet colors.
            // Button's default rounded is 'rounded', original was 'rounded-md'. Add 'rounded-md' to className if needed.
            // Button handles default disabled styling (opacity-50), but original had bg-primary/50. We replicate this.
            // The 'p-3' from original is achieved by size="lg" (py-3 px-6). If exact p-3 is needed, add to className.
          >
            {isSubmitting ? "Sending..." : "Send Magic Link"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthWrapper;