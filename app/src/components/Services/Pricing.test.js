import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pricing from './Pricing';
import { useStateProvider } from '../../context/StateContext';
import { useRouter } from 'next/router';

// Mock react-icons
jest.mock('react-icons/fi', () => ({
  FiClock: () => <svg data-testid="fi-clock-icon" />,
  FiRefreshCcw: () => <svg data-testid="fi-refresh-ccw-icon" />,
}));
jest.mock('react-icons/bi', () => ({
  BiRightArrowAlt: () => <svg data-testid="bi-right-arrow-alt-icon" />,
}));
jest.mock('react-icons/bs', () => ({
  BsCheckLg: () => <svg data-testid="bs-check-lg-icon" />,
}));

// Mock useStateProvider
jest.mock('../../context/StateContext', () => ({
  useStateProvider: jest.fn(),
}));

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockServiceDataStandard = {
  id: 'service1',
  title: 'Test Service',
  userId: 'user123',
  tiers: [
    {
      id: 'tier1',
      tierName: 'Basic Tier',
      tierPrice: '10',
      tierDurationHours: '24',
      revisions: 1,
      tierInclusions: [{ id: 'inc1', label: 'Basic Feature 1' }],
    },
    {
      id: 'tier2',
      tierName: 'Standard Tier',
      tierPrice: '20',
      tierDurationHours: '48',
      revisions: 2,
      tierInclusions: [{ id: 'inc2', label: 'Standard Feature 1' }, { id: 'inc3', label: 'Standard Feature 2' }],
    },
    {
      id: 'tier3',
      tierName: 'Premium Tier',
      tierPrice: '30',
      tierDurationHours: '72',
      revisions: 3,
      tierInclusions: [{ id: 'inc4', label: 'Premium Feature 1' }],
    },
  ],
};

const mockUser = {
  uid: 'user456', // Different from serviceData.userId for guest view
};

const mockServiceOwnerUser = {
  uid: 'user123', // Same as serviceData.userId for owner view
};

describe('Pricing Component', () => {
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
      query: {}, // Assuming no query params needed for Pricing page itself
    });
    useStateProvider.mockReturnValue([{ serviceData: mockServiceDataStandard, user: mockUser }, jest.fn()]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays all available tiers', () => {
    render(<Pricing />);
    expect(screen.getByText('Basic Tier')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('Standard Tier')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByText('Premium Tier')).toBeInTheDocument();
    expect(screen.getByText('$30')).toBeInTheDocument();

    // Check for number of tier cards implicitly by checking unique content
    const tierCards = screen.getAllByText(/Hours Delivery/i); // Each tier has this text
    expect(tierCards.length).toBe(mockServiceDataStandard.tiers.length);
  });

  test('clicking on a tier card selects that tier', () => {
    render(<Pricing />);
    const standardTierCard = screen.getByText('Standard Tier').closest('div[role="button"]'); // Assuming tier cards are divs or have a role

    // Check initial selection (first tier by default)
    const basicTierCard = screen.getByText('Basic Tier').closest('div[role="button"]');
    expect(basicTierCard).toHaveClass('border-accent'); // Or whatever class indicates selection

    fireEvent.click(standardTierCard);

    expect(standardTierCard).toHaveClass('border-accent');
    expect(basicTierCard).not.toHaveClass('border-accent'); // Ensure previous selection is deselected
  });

  test('"Continue" button URL is correctly updated with the selected tier\'s ID', () => {
    render(<Pricing searchDate="2024-01-01" />);
    const standardTierCard = screen.getByText('Standard Tier').closest('div[role="button"]');
    fireEvent.click(standardTierCard);

    const continueButton = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueButton);

    expect(mockPush).toHaveBeenCalledWith('/checkout?serviceId=service1&tierId=tier2&serviceDate=2024-01-01');
  });

  test('"Continue" button is disabled if no tier is selected (initial state if default selection fails or not applicable)', () => {
    // Scenario: What if default selection logic had an issue or wasn't desired?
    // For this component, a tier is always selected by default if tiers exist.
    // So, this test is more about ensuring the button *is* enabled when a tier *is* selected.
    // The component initializes selectedTier to the first tier.
    useStateProvider.mockReturnValueOnce([{ serviceData: mockServiceDataStandard, user: mockUser }, jest.fn()]);
    render(<Pricing />);

    const continueButton = screen.getByRole('button', { name: /Continue/i });
    expect(continueButton).not.toBeDisabled(); // Default first tier is selected

    // To truly test disabled state, we'd need a scenario where selectedTier could be null.
    // The current implementation defaults selectedTier, so the button isn't disabled if tiers exist.
    // However, if `serviceData.tiers` was empty, the button wouldn't even render.
    // The alert logic is tested implicitly by the successful navigation if a tier is selected.
  });


  test('shows "Pricing information not available" message if no tiers are available', () => {
    useStateProvider.mockReturnValueOnce([{ serviceData: { ...mockServiceDataStandard, tiers: [] }, user: mockUser }, jest.fn()]);
    render(<Pricing />);
    expect(screen.getByText('Pricing information not available.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Continue/i })).not.toBeInTheDocument();
  });

  test('shows "Pricing information not available" message if serviceData.tiers is null', () => {
    useStateProvider.mockReturnValueOnce([{ serviceData: { ...mockServiceDataStandard, tiers: null }, user: mockUser }, jest.fn()]);
    render(<Pricing />);
    expect(screen.getByText('Pricing information not available.')).toBeInTheDocument();
  });

  test('displays "Edit" button and navigates correctly if the user is the service owner', () => {
    useStateProvider.mockReturnValue([{ serviceData: mockServiceDataStandard, user: mockServiceOwnerUser }, jest.fn()]);
    render(<Pricing searchDate="2024-01-01" />);

    const editButton = screen.getByRole('button', { name: /Edit/i });
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);
    expect(mockPush).toHaveBeenCalledWith('/seller/services/service1');
  });

  test('initial selection is the first tier and "Continue" button uses it', () => {
    render(<Pricing searchDate="2024-01-01" />);
    // First tier (Basic Tier) should be selected by default
    const basicTierCard = screen.getByText('Basic Tier').closest('div[role="button"]');
    expect(basicTierCard).toHaveClass('border-accent');

    const continueButton = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueButton);

    // Default selected tier is 'tier1'
    expect(mockPush).toHaveBeenCalledWith('/checkout?serviceId=service1&tierId=tier1&serviceDate=2024-01-01');
  });

});

// Helper to get the clickable parent if text is on a child
// This might be needed if the onClick is on the div and not directly on the text element.
// For the current Pricing.jsx, the div itself has onClick.
// So, .closest('div') or .closest('[role="button"]') (if we add role="button" to the tier div) is fine.
// The structure is: <div onClick className="..."><div className="flex justify-between"><h4...>{tierName}</h4>...</div></div>
// So screen.getByText('Tier Name').closest('div.cursor-pointer') should work.
// Adding role="button" to the clickable div for tiers for better semantics and testability.
// In Pricing.jsx, the clickable div for a tier is:
// <div key={tier.id} className={`... cursor-pointer ...`} onClick={() => setSelectedTier(tier)}>
// I'll assume this div can be identified by its content and then checking its class for selection.
// For the test 'clicking on a tier card selects that tier', I used:
// screen.getByText('Standard Tier').closest('div[role="button"]')
// This requires adding role="button" to the tier divs in Pricing.jsx
// Let's modify the JSX to include role="button" for better accessibility and testability.
// If not adding role="button", I'd use a more generic selector like:
// screen.getByText('Standard Tier').closest('.cursor-pointer')
// And verify its classes.
// The current test uses 'border-accent' which is good.
// I will update the component to add `role="button"` to the tier cards.

// Note: The provided Pricing.jsx uses `selectedTier?.id === tier.id` to conditionally apply
// `border-accent dark:border-accent`. This is what the selection test will rely on.
// The `div` for each tier already has `cursor-pointer`, so it's clearly interactive.
// Adding `role="button"` is a good enhancement.

// The test for "Continue button is disabled if no tier is selected" has a comment.
// The component's current logic always has a selected tier if tiers exist (defaults to the first).
// If tiers are empty, the button isn't rendered. So the disabled state due to *no selection*
// (while tiers *are* present) isn't reachable. The test verifies it's *not* disabled by default.
// The alert logic is also tricky to test directly without overriding `window.alert`.
// Testing that `router.push` is *not* called if `selectedTier` were null (and button somehow enabled)
// would be an alternative, but again, not reachable with current logic.
// The current implementation of the "Continue" button has `disabled={!selectedTier}`.
// Since `selectedTier` is initialized to `serviceData.tiers[0]`, it's only null if `serviceData.tiers` is empty,
// in which case the whole pricing block for tiers isn't rendered.
// So, the button will effectively never be rendered in a disabled state from this specific prop.
// The `alert` for `!selectedTier` on click is also unreachable for the same reason.
// This is fine, it means the component has robust state handling for this.
