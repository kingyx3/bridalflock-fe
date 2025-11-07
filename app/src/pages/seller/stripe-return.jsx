import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile } from '../../utils/api'; // To fetch updated user info
import { useStateProvider } from '../../context/StateContext'; // Adjusted path
import { reducerCases } from '../../context/constants'; // Adjusted path

const StripeReturnPage = () => {
  const router = useRouter();
  const [{ user: currentUser, isAuthLoading }, dispatch] = useStateProvider();

  const [loading, setLoading] = useState(true); // Local loading for checkStripeStatus
  const [statusMessage, setStatusMessage] = useState("We're checking your Stripe account status...");
  const [onboardingComplete, setOnboardingComplete] = useState(false); // Local UI feedback

  useEffect(() => {
    if (isAuthLoading) {
      setStatusMessage("Loading user session...");
      setLoading(true); // Keep local loading true while auth is loading
      return;
    }

    // If user is not logged in, _app.jsx handles the redirect
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const checkStripeStatus = async () => {
      setLoading(true); // Start local loading for this async operation
      setStatusMessage("Verifying your Stripe account details...");
      try {
        const profileData = await getUserProfile(currentUser.uid);

        if (profileData) {
          // Update global context first
          dispatch({ type: reducerCases.SET_USER, user: profileData });

          // Then use profileData for local logic on this page
          if (profileData.stripeOnboardingComplete) {
            setOnboardingComplete(true);
            setStatusMessage('Stripe onboarding complete! Redirecting to your dashboard...');
            setTimeout(() => {
              router.push('/seller?stripe_connect_success=true');
            }, 2500);
          } else if (profileData.stripeChargesEnabled && profileData.stripeDetailsSubmitted) {
            // Fallback condition if main onboarding flag isn't set but these are
            setOnboardingComplete(true);
            setStatusMessage('Stripe account seems configured! Redirecting to your dashboard...');
            setTimeout(() => {
              router.push('/seller?stripe_connect_success=true');
            }, 2500);
          } else {
            setOnboardingComplete(false);
            setStatusMessage('Stripe onboarding is not yet complete. Please ensure all required information is submitted on Stripe, or wait a few moments for updates to process.');
          }
        } else {
          setOnboardingComplete(false);
          setStatusMessage('Could not retrieve your updated account details at this time. Please try refreshing the page.');
        }
      } catch (err) {
        console.error('Error checking Stripe status:', err);
        setOnboardingComplete(false);
        setStatusMessage(`An error occurred while checking your Stripe status: ${err.message}. Please try refreshing or contact support if the issue persists.`);
      }
      setLoading(false); // End local loading for this async operation
    };

    if (currentUser && currentUser.uid) {
      checkStripeStatus();
    }
    // dispatch and router are stable references and included in dependencies for completeness.
    // isAuthLoading and currentUser are the key dependencies that trigger re-runs.
  }, [currentUser, isAuthLoading, router, dispatch]); // Added router to dependencies

  // Initial loading state (covers auth loading and initial page setup)
  if (isAuthLoading || (!currentUser && !loading)) { // Show loading if auth is happening, or if not loading locally but no user yet (implies redirect is imminent)
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Stripe Onboarding Status</h1>
        <p>{statusMessage}</p>
        <p>Loading user data...</p>
        {/* Consider adding a spinner component here */}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>Stripe Onboarding Status</h1>
      <p>{statusMessage}</p>

      {loading && <p>Verifying details with Stripe...</p>}

      {!loading && !onboardingComplete && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
          <p>If you&rsquo;ve completed all steps on Stripe, your information might still be processing. This can take a few moments.</p>
          <button
            onClick={() => router.reload()}
            style={{ marginRight: '10px', padding: '10px 15px', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}
          >
            Refresh Status
          </button>
          <button
            onClick={() => router.push('/seller/stripe-onboarding')}
            style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Try Connecting Again
          </button>
        </div>
      )}
       {!loading && onboardingComplete && (
        <p>You should be redirected shortly. If not, <a href="/seller/dashboard" style={{color: '#0070f3', fontWeight: 'bold'}}>click here to go to your dashboard</a>.</p>
      )}
    </div>
  );
};

export default StripeReturnPage;
