import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { useStateProvider } from '../context/StateContext';
import { createStripeAccountLink } from '../utils/api';
import StripeOnboardingPage from '../pages/seller/stripe-onboarding.jsx';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock utils/api
jest.mock('../utils/api', () => ({
  createStripeAccountLink: jest.fn(),
}));

// Mock context/StateContext
jest.mock('../context/StateContext', () => ({
  useStateProvider: jest.fn(),
}));

// Mock window.location.href
const originalLocation = window.location;
let mockHrefSetter;
let mockAssignFn;
let mockReplaceFn;

beforeAll(() => {
  delete window.location; // Delete the existing property first

  // Define a new window.location object with mockable properties
  window.location = Object.defineProperties({}, {
    ...Object.getOwnPropertyDescriptors(originalLocation), // copy existing properties like pathname, search etc.
    assign: {
      configurable: true,
      writable: true,
      value: (mockAssignFn = jest.fn()), // Assign a Jest mock function
    },
    replace: {
      configurable: true,
      writable: true,
      value: (mockReplaceFn = jest.fn()), // Assign a Jest mock function
    },
    href: {
      configurable: true,
      get: () => originalLocation.href, // Or a fixed string like 'http://localhost/'
      set: (mockHrefSetter = jest.fn()), // This is the mock setter we'll use for href assignments
    },
  });
});

afterAll(() => {
  window.location = originalLocation; // Restore original window.location
});

describe('StripeOnboardingPage', () => {
  let mockRouter;
  let mockPush;
  let mockDispatch;

  beforeEach(() => {
    // Clear specific mocks related to window.location that were dynamically created
    mockHrefSetter.mockClear();
    mockAssignFn.mockClear();
    mockReplaceFn.mockClear();

    // Clear other standard Jest mocks
    mockPush = jest.fn(); // Re-initialize to ensure it's clean for each test
    if (createStripeAccountLink.mockClear) createStripeAccountLink.mockClear();
    if (useStateProvider.mockClear) useStateProvider.mockClear();
    if (useRouter.mockClear) useRouter.mockClear();


    // Re-establish default implementations for mocks that need it after clearing
    mockRouter = { // Define mockRouter here or ensure it's defined before this beforeEach
      query: {},
      push: mockPush,
      pathname: '/',
      asPath: '/',
      prefetch: jest.fn().mockResolvedValue(undefined),
    };
    useRouter.mockReturnValue(mockRouter);

    mockDispatch = jest.fn(); // Re-initialize dispatch mock
    useStateProvider.mockReturnValue([{ user: { uid: 'testUserId', email: 'user@example.com' } }, mockDispatch]); // Default user, ensure uid

    // Default mock for createStripeAccountLink for success cases
    createStripeAccountLink.mockResolvedValue({ stripeOAuthUrl: 'https://stripe.com/mock_oauth_url' });
  });

  test('renders initial state correctly', () => {
    render(<StripeOnboardingPage />);
    expect(screen.getByRole('heading', { name: /Connect your Stripe Account/i })).toBeInTheDocument();
    expect(screen.getByText(/To start selling services and receive payments/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Connect with Stripe/i })).toBeEnabled();
  });

  test('button is disabled if user is not available', () => {
    useStateProvider.mockReturnValue([{ user: null }, mockDispatch]);
    render(<StripeOnboardingPage />);
    expect(screen.getByRole('button', { name: /Connect with Stripe/i })).toBeDisabled();
  });

  test('shows loading user information if user is undefined', () => {
    useStateProvider.mockReturnValue([{ user: undefined }, mockDispatch]);
    render(<StripeOnboardingPage />);
    expect(screen.getByText(/Loading user information.../i)).toBeInTheDocument();
  });


  test('calls createStripeAccountLink and redirects on button click', async () => {
    render(<StripeOnboardingPage />);
    const connectButton = screen.getByRole('button', { name: /Connect with Stripe/i });
    fireEvent.click(connectButton);

    expect(connectButton).toHaveTextContent('Redirecting to Stripe...');
    expect(connectButton).toBeDisabled();
    expect(createStripeAccountLink).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      // The component uses: window.location.href = result.stripeOAuthUrl;
      expect(mockHrefSetter).toHaveBeenCalledWith('https://stripe.com/mock_oauth_url');
    });
  });

  test('displays error message if createStripeAccountLink fails', async () => {
    const errorMessage = 'Failed to retrieve link.';
    createStripeAccountLink.mockRejectedValueOnce(new Error(errorMessage));
    render(<StripeOnboardingPage />);
    fireEvent.click(screen.getByRole('button', { name: /Connect with Stripe/i }));

    await waitFor(() => {
      expect(screen.getByText(new RegExp(errorMessage, "i"))).toBeInTheDocument();
    });
    expect(mockHrefSetter).not.toHaveBeenCalled();
    expect(mockAssignFn).not.toHaveBeenCalled(); // Use the direct mock function
    expect(screen.getByRole('button', { name: /Connect with Stripe/i })).toBeEnabled();
  });

  test('displays error message if createStripeAccountLink returns already-exists code', async () => {
    const errorMessage = 'A Stripe account is already connected';
    createStripeAccountLink.mockResolvedValueOnce({ message: errorMessage, code: 'already-exists' });
    render(<StripeOnboardingPage />);
    fireEvent.click(screen.getByRole('button', { name: /Connect with Stripe/i }));

    await waitFor(() => {
      expect(screen.getByText(new RegExp(errorMessage, "i"))).toBeInTheDocument();
    });
    expect(mockHrefSetter).not.toHaveBeenCalled();
    expect(mockAssignFn).not.toHaveBeenCalled(); // Use the direct mock function
  });


  test('displays error message from stripe_connect_error query parameter', () => {
    mockRouter.query = { stripe_connect_error: 'true', error_description: 'User denied access' };
    useRouter.mockReturnValue(mockRouter);
    render(<StripeOnboardingPage />);
    expect(screen.getByText(/There was a problem connecting your Stripe account. Please try again. Details: User denied access/i)).toBeInTheDocument();
  });

  test('displays generic error message if stripe_connect_error is true without description', () => {
    mockRouter.query = { stripe_connect_error: 'true' };
    useRouter.mockReturnValue(mockRouter);
    render(<StripeOnboardingPage />);
    expect(screen.getByText(/There was a problem connecting your Stripe account. Please try again./i)).toBeInTheDocument();
    // Ensure it doesn't say "Details: "
    expect(screen.queryByText(/Details: $/i)).not.toBeInTheDocument();
  });


  test('displays info message from refresh query parameter', () => {
    mockRouter.query = { refresh: 'true' };
    useRouter.mockReturnValue(mockRouter);
    render(<StripeOnboardingPage />);
    expect(screen.getByText(/Your previous Stripe connection session may have expired/i)).toBeInTheDocument();
  });

  test('does not redirect when user becomes null (handled by _app.jsx)', () => {
    // Initial render with user
    const { rerender } = render(<StripeOnboardingPage />);

    // Simulate user logging out (becoming null)
    useStateProvider.mockReturnValue([{ user: null, }, mockDispatch]);
    rerender(<StripeOnboardingPage />); // Rerender with new context value

    // The page should not redirect since _app.jsx handles authentication
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

});
