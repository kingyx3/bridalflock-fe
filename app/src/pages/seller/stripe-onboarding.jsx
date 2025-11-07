import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// The function name in api.js is createStripeAccountLink, but it calls the 'createStripeAccount' Firebase Function.
// We'll keep using createStripeAccountLink as it's defined in api.js
import { createStripeAccountLink } from '../../utils/api';
import { useStateProvider } from '../../context/StateContext';

const StripeOnboardingPage = () => {
  const router = useRouter();
  const [{ user }, dispatch] = useStateProvider();
  const currentUser = user;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState(''); // For non-error messages like refresh

  useEffect(() => {
    if (router.query.refresh === 'true') {
      setInfoMessage('Your previous Stripe connection session may have expired or encountered an issue. Please click the button below to try again.');
      setError(''); // Clear any other errors
    }
    if (router.query.stripe_connect_error === 'true') {
      // You could fetch more specific error details from your backend if needed, or use a generic message
      const decodedError = router.query.error_description ? decodeURIComponent(router.query.error_description) : '';
      const generalMessage = 'There was a problem connecting your Stripe account. Please try again.';
      setError(decodedError ? `${generalMessage} Details: ${decodedError}` : generalMessage);
      setInfoMessage(''); // Clear info messages
    }
  }, [router.query]);

  useEffect(() => {
    if (currentUser === null && user !== undefined) {
      // _app.jsx handles authentication redirects
      return;
    }
  }, [currentUser, user, router]);

  const handleConnectStripe = async () => {
    setLoading(true);
    setError('');
    setInfoMessage('');
    try {
      // createStripeAccountLink now calls the modified 'createStripeAccount' Firebase function
      // which returns { stripeOAuthUrl: '...' }
      const result = await createStripeAccountLink();
      if (result && result.stripeOAuthUrl) {
        // Redirect to Stripe's OAuth page
        window.location.href = result.stripeOAuthUrl;
      } else if (result && result.message && result.code === 'already-exists') {
        // Handle case where Stripe account is already connected, as per backend logic
        setError('A Stripe account is already connected for this user. If you need to manage your Stripe account, please visit your seller dashboard or Stripe directly.');
        // Optionally, redirect to dashboard or show a link
        // router.push('/seller/dashboard?stripe_already_connected=true');
      }
      else {
        setError('Could not retrieve the Stripe connection link. Please try again.');
      }
    } catch (err) {
      console.error('Error initiating Stripe connection:', err);
      // Check if the error is from Firebase Functions and has a specific message
      if (err.details && err.details.message) {
        setError(err.details.message);
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    }
    setLoading(false);
  };

  if (user === undefined) {
    return <div>Loading user information...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>Connect your Stripe Account</h1>
      <p>To start selling services and receive payments, you need to connect your Stripe account.</p>
      <p>Stripe helps process payments securely and handle payouts directly to you. You&rsquo;ll be redirected to Stripe to authorize the connection or set up your account.</p>

      {infoMessage && (
        <p style={{ color: 'blue', border: '1px solid blue', padding: '10px', margin: '10px 0' }}>
          {infoMessage}
        </p>
      )}

      {error && (
        <p style={{ color: 'red', border: '1px solid red', padding: '10px', margin: '10px 0' }}>
          <strong>Error:</strong> {error}
        </p>
      )}

      <button
        onClick={handleConnectStripe}
        disabled={loading || !currentUser}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: 'white',
          backgroundColor: (loading || !currentUser) ? '#ccc' : '#0070f3',
          border: 'none',
          borderRadius: '5px',
          cursor: (loading || !currentUser) ? 'default' : 'pointer'
        }}
      >
        {loading ? 'Redirecting to Stripe...' : 'Connect with Stripe'}
      </button>

      <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#555' }}>
        You will be securely redirected to Stripe to complete the connection process.
      </p>
    </div>
  );
};

export default StripeOnboardingPage;
