import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DarkModeToggle from './DarkModeToggle';
import { useStateProvider } from '../context/StateContext';
import { reducerCases } from '../context/constants';

// Mock useStateProvider
jest.mock('../context/StateContext', () => ({
  useStateProvider: jest.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: () => {
      store = {};
    },
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false, // Default to light mode
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('DarkModeToggle Component', () => {
  let mockDispatch;

  beforeEach(() => {
    // Reset mocks before each test
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    window.matchMedia.mockImplementation(query => ({
      matches: false, // Default to light for most tests unless overridden
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    mockDispatch = jest.fn();
  });

  const setup = (initialDarkModeState) => {
    useStateProvider.mockReturnValue([{ isDarkMode: initialDarkModeState }, mockDispatch]);
    const utils = render(<DarkModeToggle />);
    return { button: screen.getByRole('button'), ...utils };
  };

  test('initial render: localStorage has "true" (dark mode)', () => {
    localStorageMock.setItem('darkMode', 'true');
    // The component's useEffect will run and dispatch SET_DARK_MODE only if state differs
    // Since we're setting up with isDarkMode: true, it should NOT dispatch
    const { button } = setup(true);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(button).toHaveTextContent('🌞');
    // With our optimization, dispatch should NOT be called if state already matches
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('initial render: localStorage has "false" (light mode)', () => {
    localStorageMock.setItem('darkMode', 'false');
    const { button } = setup(false);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(button).toHaveTextContent('🌙');
    // With our optimization, dispatch should NOT be called if state already matches
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('initial render: no localStorage, prefers-color-scheme: dark', () => {
    window.matchMedia.mockImplementation(query => ({ matches: true, media: query, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
    const { button } = setup(true); // useEffect will find prefers-color-scheme: dark

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(button).toHaveTextContent('🌞');
    // With our optimization, dispatch should NOT be called if state already matches
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('initial render: no localStorage, prefers-color-scheme: light', () => {
    window.matchMedia.mockImplementation(query => ({ matches: false, media: query, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
    const { button } = setup(false); // useEffect will find prefers-color-scheme: light

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(button).toHaveTextContent('🌙');
    // With our optimization, dispatch should NOT be called if state already matches
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('toggle functionality: light to dark', () => {
    const { button, rerender } = setup(false); // Start in light mode

    // Initial state (light)
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(button).toHaveTextContent('🌙');

    // Click to toggle
    fireEvent.click(button);

    // Check dispatch for TOGGLE_DARK_MODE
    expect(mockDispatch).toHaveBeenCalledWith({ type: reducerCases.TOGGLE_DARK_MODE });
    
    // Simulate state update after dispatch
    useStateProvider.mockReturnValue([{ isDarkMode: true }, mockDispatch]);
    // Re-render with the updated state
    rerender(<DarkModeToggle />);
    const updatedButton = screen.getByRole('button');


    // Check new state (dark)
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true');
    expect(updatedButton).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(updatedButton).toHaveTextContent('🌞');
  });

  test('toggle functionality: dark to light', () => {
    localStorageMock.setItem('darkMode', 'true');
    const { button, rerender } = setup(true); // Start in dark mode

    // Initial state (dark)
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(button).toHaveTextContent('🌞');

    // Click to toggle
    fireEvent.click(button);
    
    // Check dispatch for TOGGLE_DARK_MODE
    expect(mockDispatch).toHaveBeenCalledWith({ type: reducerCases.TOGGLE_DARK_MODE });

    // Simulate state update after dispatch
    useStateProvider.mockReturnValue([{ isDarkMode: false }, mockDispatch]);
    // Re-render with new state
    rerender(<DarkModeToggle />);
    const updatedButton = screen.getByRole('button');

    // Check new state (light)
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'false');
    expect(updatedButton).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(updatedButton).toHaveTextContent('🌙');
  });
  
  test('useEffect runs only once on mount (optimization test)', () => {
    localStorageMock.setItem('darkMode', 'false');

    // First render with initial dispatch
    useStateProvider.mockReturnValue([{ isDarkMode: false }, mockDispatch]);
    const { rerender } = render(<DarkModeToggle />);

    // Effect should run but NOT dispatch since state matches
    expect(mockDispatch).not.toHaveBeenCalled();

    // Re-render with same state - effect should not run again due to empty deps
    rerender(<DarkModeToggle />);

    // Dispatch should still not have been called
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
