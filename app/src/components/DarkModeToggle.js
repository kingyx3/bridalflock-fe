import { useEffect, useRef } from 'react';
import { useStateProvider } from '../context/StateContext';
import { reducerCases } from '../context/constants';

export default function DarkModeToggle({ buttonId }) { // Added buttonId prop
  const [{ isDarkMode }, dispatch] = useStateProvider();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Only run on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      const localPreference = localStorage.getItem('darkMode');
      let isInitiallyDark;
      if (localPreference) {
        isInitiallyDark = localPreference === 'true';
      } else {
        isInitiallyDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      // Only dispatch if the value is different from current state
      if (isInitiallyDark !== isDarkMode) {
        dispatch({ type: reducerCases.SET_DARK_MODE, payload: isInitiallyDark });
      }
      
      document.documentElement.classList.toggle('dark', isInitiallyDark);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount to avoid unnecessary rerenders

  const toggleDarkMode = () => {
    const newMode = !isDarkMode; // Read from context's isDarkMode

    // Dispatch TOGGLE_DARK_MODE to update context
    // The reducer will flip the boolean state.
    dispatch({ type: reducerCases.TOGGLE_DARK_MODE }); 
    
    localStorage.setItem('darkMode', newMode.toString()); // newMode is already correct
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button
      id={buttonId} // Apply the buttonId prop
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {isDarkMode ? '🌞' : '🌙'}
    </button>
  );
}