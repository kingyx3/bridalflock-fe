import { useRouter } from 'next/router';
import { useCallback } from 'react';

/**
 * Custom hook for consistent navigation patterns across the app
 * Centralizes navigation logic and provides utility methods
 */
export const useNavigation = () => {
  const router = useRouter();

  /**
   * Navigate to a new page with router.push
   * @param {string} path - The path to navigate to
   * @param {object} options - Optional Next.js router options
   */
  const navigate = useCallback((path, options = {}) => {
    router.push(path, undefined, options);
  }, [router]);

  /**
   * Replace current page in history with router.replace
   * @param {string} path - The path to navigate to
   * @param {object} options - Optional Next.js router options
   */
  const replace = useCallback((path, options = {}) => {
    router.replace(path, undefined, options);
  }, [router]);

  /**
   * Navigate back to previous page
   */
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  /**
   * Store current path as redirect URL and navigate to destination
   * @param {string} destination - Where to redirect the user
   */
  const navigateWithRedirect = useCallback((destination = '/') => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('redirectUrl', router.asPath);
      router.replace(destination);
    }
  }, [router]);

  /**
   * Navigate to stored redirect URL or fallback
   * @param {string} fallback - Fallback path if no redirect URL stored
   */
  const navigateToRedirect = useCallback((fallback = '/') => {
    if (typeof window !== 'undefined') {
      const redirectUrl = sessionStorage.getItem('redirectUrl');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectUrl');
        // Only navigate if the redirect URL is different from current path
        if (redirectUrl !== router.asPath) {
          router.push(redirectUrl);
        }
      } else if (fallback && fallback !== router.asPath) {
        router.push(fallback);
      }
    }
  }, [router]);

  return {
    navigate,
    replace,
    goBack,
    navigateWithRedirect,
    navigateToRedirect,
    router, // Expose router for edge cases
  };
};
