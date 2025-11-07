import { useEffect } from 'react';
import { useStateProvider } from '../context/StateContext';
import { reducerCases } from '../context/constants';

export default function DarkModeToggle({ buttonId }) { // Added buttonId prop
  const [{ isDarkMode }, dispatch] = useStateProvider();

  useEffect(() => {
    const localPreference = localStorage.getItem('darkMode');
    let isInitiallyDark;
    if (localPreference) {
      isInitiallyDark = localPreference === 'true';
    } else {
      isInitiallyDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Dispatch SET_DARK_MODE to sync context with initial finding
    dispatch({ type: reducerCases.SET_DARK_MODE, payload: isInitiallyDark });
    
    document.documentElement.classList.toggle('dark', isInitiallyDark);
  }, [dispatch]); // Add dispatch to dependency array

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