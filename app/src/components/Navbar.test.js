import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

// Mock dependencies
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn(),
  }),
}));

// Default mock for StateContext, can be overridden in tests
const mockDispatch = jest.fn();
const mockStateProvider = jest.fn().mockReturnValue([
  { user: null, isSeller: false, isDarkMode: false },
  mockDispatch,
]);
jest.mock('../context/StateContext', () => ({
  useStateProvider: () => mockStateProvider(),
}));

jest.mock('../utils/firebaseConfig', () => ({
  auth: {}, // Minimal mock for auth object
  signOut: jest.fn(),
}));

// Mock child components
jest.mock('./Logo', () => {
  const MockLogo = () => <div data-testid="logo">Logo</div>;
  MockLogo.displayName = 'MockLogo';
  return MockLogo;
});

jest.mock('./AvatarImage', () => {
  const MockAvatarImage = ({ src, email, size, borderColor }) => (
    <div data-testid="avatar-image" data-src={src} data-email={email}>AvatarImage</div>
  );
  MockAvatarImage.displayName = 'MockAvatarImage';
  return MockAvatarImage;
});

jest.mock('./DarkModeToggle', () => {
  const MockDarkModeToggle = () => <div data-testid="dark-mode-toggle">DarkModeToggle</div>;
  MockDarkModeToggle.displayName = 'MockDarkModeToggle';
  return MockDarkModeToggle;
});

describe('Navbar', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockDispatch.mockClear();
    mockStateProvider.mockImplementation(() => [
      { user: null, isSeller: false, isDarkMode: false, isContextMenuVisible: false },
      mockDispatch,
    ]);
    require('next/router').useRouter().push.mockClear();
    if (require('../utils/firebaseConfig').signOut.mockClear) {
        require('../utils/firebaseConfig').signOut.mockClear();
    }
  });

  const renderNavbar = (props) => {
    return render(
      <Navbar
        userId={props?.userId || null}
        isLoading={props?.isLoading || false}
        initialAuthChecked={props?.initialAuthChecked === undefined ? true : props.initialAuthChecked}
        {...props}
      />
    );
  };

  test('renders correctly and shows AvatarImage when user is provided', () => {
    const mockUser = { avatar: 'avatar.png', email: 'test@example.com' };
    mockStateProvider.mockImplementation(() => [
      { user: mockUser, isSeller: false, isDarkMode: false, isContextMenuVisible: false },
      mockDispatch,
    ]);

    renderNavbar({ userId: "test-user" });

    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-image')).toHaveAttribute('data-src', mockUser.avatar);
    expect(screen.getByTestId('avatar-image')).toHaveAttribute('data-email', mockUser.email);
    expect(screen.getByText('Orders')).toBeInTheDocument(); // Generic item
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  test('renders correctly with null or empty string props for AvatarImage when user is null', () => {
    mockStateProvider.mockImplementation(() => [
      { user: null, isSeller: false, isDarkMode: false, isContextMenuVisible: false }, // isContextMenuVisible: false added
      mockDispatch,
    ]);

    renderNavbar({ initialAuthChecked: true });

    // When user is null, AvatarImage is still rendered in the desktop view (conditionally hidden by CSS)
    // but it's also part of the mobile menu structure if a user were to open it.
    // The critical part is that it should receive empty/null props.
    // Depending on how the component handles it, it might not render anything visible, or render a placeholder.
    // We check that it's "in the document" in a broader sense, and that props are safe.

    // Desktop avatar placeholder (conditionally shown based on user)
    // The previous test checked for `queryByTestId('avatar-image').not.toBeInTheDocument()` for the "Sign in" button case.
    // However, the AvatarImage *is* in the DOM for desktop view context menu, even if user is null.
    // It's the button that wraps it that might not be there, or the list.
    // Let's refine this by checking the props passed to it.

    renderNavbar({ initialAuthChecked: true });

    const avatarImages = screen.getAllByTestId('avatar-image');
    expect(avatarImages.length).toBeGreaterThanOrEqual(1); // Desktop menu trigger, mobile menu trigger
    avatarImages.forEach(avatar => {
        expect(avatar).toHaveAttribute('data-src', '');
        expect(avatar).toHaveAttribute('data-email', '');
    });
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  test('renders correctly with null or empty string props for AvatarImage when user is undefined', () => {
    mockStateProvider.mockImplementation(() => [
      { user: undefined, isSeller: false, isDarkMode: false, isContextMenuVisible: false },
      mockDispatch,
    ]);
    renderNavbar({ initialAuthChecked: true });

    const avatarImages = screen.getAllByTestId('avatar-image');
    expect(avatarImages.length).toBeGreaterThanOrEqual(1);
    avatarImages.forEach(avatar => {
        expect(avatar).toHaveAttribute('data-src', '');
        expect(avatar).toHaveAttribute('data-email', '');
    });
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });


  test('displays "Sign in" button when user is not available and initialAuthChecked is true', () => {
    mockStateProvider.mockImplementation(() => [
      { user: null, isSeller: false, isDarkMode: false, isContextMenuVisible: false },
      mockDispatch,
    ]);
    renderNavbar({ initialAuthChecked: true });
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    const avatarImages = screen.getAllByTestId('avatar-image');
    avatarImages.forEach(avatar => {
        expect(avatar).toHaveAttribute('data-src', '');
        expect(avatar).toHaveAttribute('data-email', '');
    });
  });

  test('displays AvatarImage with correct props when user is available', () => {
    const mockUser = { avatar: 'user-avatar.jpg', email: 'user@domain.com' };
    mockStateProvider.mockImplementation(() => [
      { user: mockUser, isSeller: false, isDarkMode: false, isContextMenuVisible: false },
      mockDispatch,
    ]);
    renderNavbar({ userId: "user123", initialAuthChecked: true });

    const avatarImage = screen.getByTestId('avatar-image'); // Changed from getAllByTestId
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('data-src', mockUser.avatar);
    expect(avatarImage).toHaveAttribute('data-email', mockUser.email);

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  test('calls router.push when "Orders" is clicked (desktop)', () => {
    const mockUser = { avatar: 'avatar.png', email: 'test@example.com' };
    mockStateProvider.mockImplementation(() => [
      { user: mockUser, isSeller: false, isDarkMode: false, isContextMenuVisible: false },
      mockDispatch,
    ]);
    renderNavbar({ userId: "test-user" });
    fireEvent.click(screen.getByText('Orders'));
    expect(mockPush).toHaveBeenCalledWith('/buyer/orders');
  });

  test('calls router.push when "Create Service" is clicked by seller (desktop)', () => {
    const mockUser = { avatar: 'avatar.png', email: 'test@example.com' };
    mockStateProvider.mockImplementation(() => [
      { user: mockUser, isSeller: true, isDarkMode: false, isContextMenuVisible: false },
      mockDispatch,
    ]);
    renderNavbar({ userId: "test-user" });
    fireEvent.click(screen.getByText('Create Service'));
    expect(mockPush).toHaveBeenCalledWith('/seller/services/create');
  });

  test('switches mode when "Switch To Seller/Buyer" is clicked', () => {
    const mockUser = { avatar: 'avatar.png', email: 'test@example.com' };
    mockStateProvider.mockImplementation(() => [
      { user: mockUser, isSeller: false, isDarkMode: false, isContextMenuVisible: false }, // Starts as buyer
      mockDispatch,
    ]);
    renderNavbar({ userId: "test-user" });
    fireEvent.click(screen.getByText('Switch To Seller'));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SWITCH_MODE' });
    expect(mockPush).toHaveBeenCalledWith('/seller');
  });

  test('handles logout correctly', () => {
    const mockUser = { avatar: 'avatar.png', email: 'test@example.com' };
    mockStateProvider.mockImplementation(() => [
      { user: mockUser, isSeller: false, isDarkMode: false, isContextMenuVisible: true }, // Context menu initially visible
      mockDispatch,
    ]);

    renderNavbar({ userId: "test-user" });

    // For desktop: context menu needs to be open to click logout
    // The AvatarImage itself is the button to open the context menu.
    // Let's assume the context menu is open for this test by setting isContextMenuVisible to true.
    // If isContextMenuVisible was false, we'd first have to click the AvatarImage button.

    // Context menu is set to be visible in the mockStateProvider setup for this test.
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(require('../utils/firebaseConfig').signOut).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_USER', user: undefined });
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  // Basic test for mobile menu toggle
  test('toggles mobile menu', () => {
    renderNavbar({ userId: "test-user", initialAuthChecked: true }); // User logged in
    const menuButton = screen.getByRole('button', { name: /Home/i }).parentElement.nextElementSibling; // A bit fragile selector, assumes menu button is after logo div

    // Check initial state (no mobile-specific items visible unless menu is open)
    // For example, the mobile version of "Orders" might be different or not present until menu opens.
    // Let's look for a mobile-specific button, if any, or the container.
    // The test below will check for items *inside* the mobile menu once open.

    fireEvent.click(menuButton); // Open mobile menu
    // Check for an item that's typically in the mobile menu
    expect(screen.getByText('Orders')).toBeInTheDocument(); // "Orders" should be visible in mobile menu too

    fireEvent.click(menuButton); // Close mobile menu
    // Assert that mobile menu specific items are gone or the container is not visible
    // This depends on how items are hidden. If they are removed from DOM:
    // expect(screen.queryByText('Mobile Orders Button Text')).not.toBeInTheDocument();
    // If they are hidden by CSS, this check is harder with RTL.
    // For now, just checking toggle doesn't crash.
  });

});
