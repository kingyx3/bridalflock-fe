import React, { useEffect, useState, useCallback, useMemo } from "react";
import BridalFlockLogo from "./Logo";
import Link from "next/link";
import { useNavigation } from "../hooks/useNavigation";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import AvatarImage from "./AvatarImage";
import { FiMenu, FiX } from "react-icons/fi";
import DarkModeToggle from './DarkModeToggle';

function Navbar({ userId, isLoading, initialAuthChecked }) {
  const { navigate, router } = useNavigation();
  const [navFixed, setNavFixed] = useState(false);
  const [{ user, isSeller, isDarkMode }, dispatch] = useStateProvider();
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileAccountOptions, setShowMobileAccountOptions] = useState(false);

  // Memoize dashboard path to avoid unnecessary recalculations
  const dashboardPath = useMemo(() => {
    return user ? (isSeller ? "/seller" : "/buyer") : "/buyer";
  }, [user, isSeller]);

  const handleLogin = useCallback(() => {
    dispatch({ type: reducerCases.TOGGLE_LOGIN_MODAL, showLoginModal: true });
  }, [dispatch]);

  const handleOrdersNavigate = useCallback(() => {
    navigate(isSeller ? "/seller/orders" : "/buyer/orders");
    setMobileMenuOpen(false);
  }, [isSeller, navigate]);

  const handleModeSwitch = useCallback(() => {
    dispatch({ type: reducerCases.SWITCH_MODE });
    navigate(!isSeller ? "/seller" : "/buyer");
    setMobileMenuOpen(false);
  }, [dispatch, isSeller, navigate]);

  const handleLogout = useCallback(() => {
    signOut(auth); // Firebase sign out
    dispatch({ type: reducerCases.SET_USER, user: undefined }); // Dispatch action to update global state
    setIsContextMenuVisible(false);
    setMobileMenuOpen(false);
    setShowMobileAccountOptions(false);
    navigate("/");
  }, [dispatch, navigate]);

  const handleProfile = useCallback(() => {
    setIsContextMenuVisible(false);
    setMobileMenuOpen(false);
    setShowMobileAccountOptions(false);
    navigate("/profile");
  }, [navigate]);

  const toggleContextMenu = useCallback(() => {
    setIsContextMenuVisible(prev => !prev);
  }, []);

  const toggleMobileAccountOptions = useCallback(() => {
    setShowMobileAccountOptions(prev => !prev);
  }, []);

  useEffect(() => {
    if (router.pathname === "/") {
      const handleScroll = () => setNavFixed(window.pageYOffset > 0);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setNavFixed(true);
    }
  }, [router.pathname]);

  // Updated color palette classes
  const primaryBtnClass = "text-primary-darker hover:text-primary dark:text-primary dark:hover:text-primary-darker font-medium";
  const accentBtnClass = "text-accent hover:text-pink-500 dark:text-accent dark:hover:text-pink-300 font-medium"; // Assuming pink-500 and pink-300 are desired hover shades for accent
  const ctaBtnClass = "bg-primary hover:bg-primary-darker text-white dark:text-white px-4 py-2 rounded-lg dark:bg-primary-darker dark:hover:bg-primary";

  const navbarClasses = `w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4 top-0 z-30 transition-all duration-300 ${navFixed || user
    ? "fixed bg-neutral-light border-b border-neutral-medium/30 shadow-sm dark:bg-neutral-dark dark:border-neutral-medium" // Updated navbar background and border
    : "absolute bg-neutral-light/90 backdrop-blur-sm border-transparent dark:bg-neutral-dark/90 dark:border-transparent" // Updated navbar background for transparent state
    }`;

  let logoClassName;
  if (isDarkMode) {
    logoClassName = "text-neutral-light";
  } else {
    if (navFixed || user) {
      logoClassName = "text-primary-darker";
    } else {
      logoClassName = "text-accent";
    }
  }

  return (
    <nav className={navbarClasses}>
      <div className="max-w-screen-xl mx-auto flex justify-between items-center w-full">
        <div className="shrink-0">
          <Link href="/" aria-label="Home">
            <BridalFlockLogo className={logoClassName} />
          </Link>
        </div>

        <button
          className={`lg:hidden ${primaryBtnClass}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {isLoading ? (
            <span className={`text-sm ${primaryBtnClass}`}>Authenticating...</span>
          ) : initialAuthChecked && !isLoading && !user ? (
            <button onClick={handleLogin} className={ctaBtnClass}>Sign in</button>
          ) : (
            <ul className="flex gap-8 items-center">
              {isSeller && (
                <li>
                  <button
                    onClick={() => navigate("/seller/services/create")}
                    className={primaryBtnClass}
                  >
                    Create Service
                  </button>
                </li>
              )}
              {user && (
                <li>
                  <button
                    onClick={() => navigate(dashboardPath)}
                    className={primaryBtnClass}
                  >
                    Dashboard
                  </button>
                </li>
              )}
              <li>
                <button onClick={handleOrdersNavigate} className={primaryBtnClass}>
                  Orders
                </button>
              </li>
              {user && ( // Add this condition
                <li>
                  <button
                    onClick={() => navigate(isSeller ? "/seller/messages" : "/buyer/messages")}
                    className={primaryBtnClass}
                  >
                    Messages
                  </button>
                </li>
              )}
              <li className="flex items-center">
                <DarkModeToggle />
              </li>
              <li className="relative">
                <button onClick={toggleContextMenu}>
                  <AvatarImage
                    src={user ? user.avatar : ""}
                    email={user ? user.email : ""}
                    size={40}
                    borderColor="border-accent/50 dark:border-accent" // Updated avatar border
                  />
                </button>
                {isContextMenuVisible && (
                  <ul className="absolute right-0 mt-2 bg-neutral-light border border-neutral-medium/30 rounded shadow text-sm w-40 z-50 dark:bg-neutral-dark dark:border-neutral-medium">
                    <li>
                      <button onClick={handleProfile} className="w-full px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium text-left">
                        Profile
                      </button>
                    </li>
                    <li>
                      <button onClick={handleModeSwitch} className="w-full px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium text-left">
                        {isSeller ? "Switch To Buyer" : "Switch To Seller"}
                      </button>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="w-full px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium text-left">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-neutral-light shadow border-t border-neutral-medium/30 z-40 dark:bg-neutral-dark dark:border-neutral-medium">
          <div className="px-4 py-4 space-y-3">
            {isLoading ? (
              <span className={`block text-center text-sm ${primaryBtnClass} py-2`}>Authenticating...</span>
            ) : initialAuthChecked && !isLoading && !user ? (
              <button onClick={handleLogin} className={`w-full ${ctaBtnClass}`}>Sign in</button>
            ) : (
              <>
                {isSeller && (
                  <button
                    onClick={() => {
                      navigate("/seller/services/create");
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-2 ${primaryBtnClass}`}
                  >
                    Create Service
                  </button>
                )}
                {user && (
                  <button
                    onClick={() => {
                      navigate(dashboardPath);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-2 ${primaryBtnClass}`}
                  >
                    Dashboard
                  </button>
                )}
                <button onClick={handleOrdersNavigate} className={`w-full text-left py-2 ${primaryBtnClass}`}>
                  Orders
                </button>
                {user && ( // Add this condition
                  <button
                    onClick={() => {
                      navigate(isSeller ? "/seller/messages" : "/buyer/messages");
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left py-2 ${primaryBtnClass}`}
                  >
                    Messages
                  </button>
                )}
                <div className="flex justify-between items-center w-full py-2 border-t border-neutral-medium/30 dark:border-neutral-medium">
                  <span className={`${primaryBtnClass} text-sm`}>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                  <DarkModeToggle />
                </div>
                <div className="border-t border-neutral-medium/30 pt-4 dark:border-neutral-medium">
                  <button
                    onClick={toggleMobileAccountOptions}
                    className="w-full flex items-center gap-3 text-left"
                  >
                    <AvatarImage
                      src={user ? user.avatar : ""}
                      email={user ? user.email : ""}
                      size={40}
                      borderColor="border-accent/50 dark:border-accent" // Updated avatar border
                    />
                    <span className="font-medium text-neutral-dark dark:text-neutral-light">My Account</span>
                  </button>
                  {showMobileAccountOptions && (
                    <div className="mt-3 space-y-2 pl-12 text-sm">
                      <button onClick={handleProfile} className="block w-full text-left py-2 hover:text-primary dark:hover:text-primary">Profile</button>
                      <button onClick={handleModeSwitch} className="block w-full text-left py-2 hover:text-primary dark:hover:text-primary">
                        {isSeller ? "Switch To Buyer" : "Switch To Seller"}
                      </button>
                      <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-primary dark:hover:text-primary">Logout</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default React.memo(Navbar);
