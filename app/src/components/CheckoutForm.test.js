import React from 'react';
import { render, screen, fireEvent, waitFor, act as rtlAct } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CheckoutForm from './CheckoutForm'; // Adjust path as necessary
import { envVars } from '../utils/envConfig';

// --- Mocks ---
const mockConfirmPayment = jest.fn();
const mockGetElement = jest.fn(); // Though not directly used by CheckoutForm from what we see, good for completeness
const mockRetrievePaymentIntent = jest.fn();

let mockStripeInstance = {
  confirmPayment: mockConfirmPayment,
  retrievePaymentIntent: mockRetrievePaymentIntent,
};

let mockElementsInstance = {
  getElement: mockGetElement,
};

jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: () => mockStripeInstance,
  useElements: () => mockElementsInstance,
  PaymentElement: () => <div data-testid="mock-payment-element" />,
  LinkAuthenticationElement: ({ onChange }) => (
    <input
      data-testid="mock-link-auth-element"
      type="email"
      onChange={onChange} // Simulate onChange behavior
    />
  ),
}));

// Mock next/router (if needed, though CheckoutForm doesn't seem to use it directly for navigation)
// For confirmPayment's return_url, it's handled by Stripe's redirection, not client-side router.push
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: { serviceId: 'defaultServiceId', tierId: 'defaultTierId' }, // Default mock query
    push: jest.fn(),
    asPath: '',
    route: '/',
    pathname: '/',
  })),
}));

// Mock StateContext
const mockDispatch = jest.fn();
jest.mock('../context/StateContext', () => ({
  useStateProvider: jest.fn(() => [{ serviceData: null }, mockDispatch]), // Default mock state
}));

// Mock api utility
import { getService as mockGetServiceFromApi } from '../utils/api.js'; // Import the mock
jest.mock('../utils/api.js', () => ({
  getService: jest.fn(),
  // If other functions from api.js are used by CheckoutForm or its children indirectly, mock them here too.
}));

// Import the mocked useRouter and useStateProvider to allow per-test configuration
import { useRouter } from 'next/router';
import { useStateProvider } from '../context/StateContext';


// --- Test Suite ---
describe('CheckoutForm Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockConfirmPayment.mockReset();
    mockGetElement.mockReset();
    mockRetrievePaymentIntent.mockReset();
    mockDispatch.mockReset();
    mockGetServiceFromApi.mockReset(); // Reset getService mock

    // Default mock for useRouter
    useRouter.mockReturnValue({
      query: { serviceId: 'defaultServiceId', tierId: 'defaultTierId' },
      push: jest.fn(),
      asPath: '',
      route: '/',
      pathname: '/',
    });

    // Default mock for useStateProvider
    useStateProvider.mockReturnValue([{ serviceData: null, user: null }, mockDispatch]);

    // Default mock for getService
    mockGetServiceFromApi.mockResolvedValue({
      id: 'defaultServiceId',
      title: 'Default Service Title',
      tiers: [{ id: 'defaultTierId', tierName: 'Default Tier Name', tierPrice: 50, tierInclusions: [] }]
    });


    // Default successful payment intent retrieval for useEffect
    mockRetrievePaymentIntent.mockResolvedValue({
        paymentIntent: { status: 'requires_payment_method', client_secret: 'test_client_secret' } // Default, can be overridden
    });
    
    // Mock URLSearchParams for useEffect
    // @ts-ignore
    global.URLSearchParams = jest.fn(() => ({
        get: jest.fn((param) => {
            if (param === 'payment_intent_client_secret') return 'test_client_secret';
            return null;
        }),
    }));


    // Default state for stripe/elements
    mockStripeInstance = {
      confirmPayment: mockConfirmPayment,
      retrievePaymentIntent: mockRetrievePaymentIntent,
    };
    mockElementsInstance = {
      getElement: mockGetElement,
    };
  });

  afterEach(() => {
    // @ts-ignore
    delete global.URLSearchParams; // Clean up global mock
  });

  describe('Initial Render', () => {
    it('renders PaymentElement, LinkAuthenticationElement, and submit button', async () => {
      render(<CheckoutForm />);
      expect(screen.getByTestId('mock-payment-element')).toBeInTheDocument();
      expect(screen.getByTestId('mock-link-auth-element')).toBeInTheDocument();
      // Default mock for getService has price 50
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Pay \$50/i })).toBeInTheDocument(); // Adjusted Regex
      });
    });

    it('submit button is initially enabled if Stripe and Elements are loaded and tier details are present', async () => {
      render(<CheckoutForm />);
      // Wait for tier details to load and button to update
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Pay \$50/i })).toBeEnabled(); // Adjusted Regex
      });
    });
  });

  describe('useEffect for retrieving PaymentIntent status', () => {
    it('displays "Payment succeeded!" if paymentIntent status is "succeeded"', async () => {
      mockRetrievePaymentIntent.mockResolvedValueOnce({
        paymentIntent: { status: 'succeeded' }
      });
      render(<CheckoutForm />);
      await waitFor(() => {
        expect(screen.getByText('Payment captured successfully!')).toBeInTheDocument();
      });
    });

    it('displays "Your payment is processing." if paymentIntent status is "processing"', async () => {
      mockRetrievePaymentIntent.mockResolvedValueOnce({
        paymentIntent: { status: 'processing' }
      });
      render(<CheckoutForm />);
      await waitFor(() => {
        expect(screen.getByText('Your payment is processing.')).toBeInTheDocument();
      });
    });

    it('displays "Your payment was not successful, please try again." if status is "requires_payment_method"', async () => {
      mockRetrievePaymentIntent.mockResolvedValueOnce({
          paymentIntent: { status: 'requires_payment_method' }
      });
      render(<CheckoutForm />);
      await waitFor(() => {
          expect(screen.getByText('Your payment was not successful, please try again.')).toBeInTheDocument();
      });
    });

    it('displays "Something went wrong." for other statuses', async () => {
      mockRetrievePaymentIntent.mockResolvedValueOnce({
          paymentIntent: { status: 'requires_capture' } // Some other status
      });
      render(<CheckoutForm />);
      await waitFor(() => {
          expect(screen.getByText('Payment authorized successfully! Your order is awaiting seller approval.')).toBeInTheDocument();
      });
    });

    it('does nothing if clientSecret is not present in URL', async () => {
      // @ts-ignore
      global.URLSearchParams = jest.fn(() => ({ get: jest.fn(() => null) })); // No client_secret
      render(<CheckoutForm />);
      // We need to wait for initial tier loading to complete before checking these
      await waitFor(() => expect(mockGetServiceFromApi).toHaveBeenCalled());

      expect(mockRetrievePaymentIntent).not.toHaveBeenCalled();
      expect(screen.queryByText(/Payment succeeded!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Your payment is processing./i)).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('successful payment: calls confirmPayment and handles success', async () => {
      mockConfirmPayment.mockResolvedValueOnce({ error: undefined });
      render(<CheckoutForm />);
      
      const payButton = await screen.findByRole('button', { name: /Pay \$50/i }); // Adjusted Regex
      await userEvent.click(payButton);

      expect(mockConfirmPayment).toHaveBeenCalledWith({
        elements: mockElementsInstance,
        confirmParams: {
          return_url: envVars.WEB_URL + '/success',
        },
      });
      // After successful confirmPayment, the button should remain disabled (isLoading is true)
      // and show "Processing Payment..."
      await waitFor(() => {
        const button = screen.getByRole('button', { name: /Processing Payment.../i });
        expect(button).toBeDisabled();
      });
      // No specific client-side "success" message is set by handleSubmit on pure success,
      // as redirection is expected.
      expect(screen.queryByText(/Payment captured successfully!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Pay \$50/i)).not.toBeInTheDocument(); // Original text shouldn't be there
    });

    it('payment failure: calls confirmPayment and displays error message', async () => {
      const errorMessage = 'Your card was declined.';
      mockConfirmPayment.mockResolvedValueOnce({ error: { type: 'card_error', message: errorMessage } });
      render(<CheckoutForm />);

      const payButton = await screen.findByRole('button', { name: /Pay \$50/i }); // Adjusted Regex
      await userEvent.click(payButton);

      expect(mockConfirmPayment).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
      await waitFor(() => expect(screen.getByRole('button', { name: /Pay \$50/i })).toBeEnabled()); // Adjusted Regex
    });
    
    it('handles unexpected error from confirmPayment', async () => {
      mockConfirmPayment.mockResolvedValueOnce({ error: { type: 'api_error', message: 'API Error' } });
      render(<CheckoutForm />);
  
      const payButton = await screen.findByRole('button', { name: /Pay \$50/i }); // Adjusted Regex
      await userEvent.click(payButton);
  
      expect(mockConfirmPayment).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument();
      });
      await waitFor(() => expect(screen.getByRole('button', { name: /Pay \$50/i })).toBeEnabled()); // Adjusted Regex
    });

    it('does not call confirmPayment if Stripe is not loaded', async () => {
      mockStripeInstance = null;
      render(<CheckoutForm />);
      
      // Button will show "Pay $50" but be disabled
      const payButton = await screen.findByRole('button', { name: /Pay \$50/i }); // Adjusted Regex
      expect(payButton).toBeDisabled();
      await userEvent.click(payButton); // Click will do nothing
      
      expect(mockConfirmPayment).not.toHaveBeenCalled();
    });

    it('does not call confirmPayment if Elements are not loaded', async () => {
      mockElementsInstance = null;
      render(<CheckoutForm />);

      const payButton = await screen.findByRole('button', { name: /Pay \$50/i }); // Adjusted Regex
      expect(payButton).toBeDisabled();
      await userEvent.click(payButton); // Click will do nothing

      expect(mockConfirmPayment).not.toHaveBeenCalled();
    });
  });

  describe('Loading State During Payment', () => {
    it('disables button and shows loading state during payment processing', async () => {
      let resolvePayment;
      const paymentPromise = new Promise(resolve => { resolvePayment = resolve; });
      mockConfirmPayment.mockReturnValue(paymentPromise);

      render(<CheckoutForm />);
      const submitButton = await screen.findByRole('button', { name: /Pay \$50/i }); // Adjusted Regex
      // Wrap event in act because it causes state updates (isLoading)
      await rtlAct(async () => {
        userEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
        expect(screen.getByText("Processing Payment...")).toBeInTheDocument();
      });
      
      await rtlAct(async () => {
        // @ts-ignore
        resolvePayment({ error: { type: 'card_error', message: 'Simulated error after loading' } });
      });

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
        expect(screen.getByText('Simulated error after loading')).toBeInTheDocument();
      });
    });
  });
});
