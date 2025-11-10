import { createContext, useContext, useReducer, useMemo } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Memoize the context value to prevent unnecessary rerenders
  const value = useMemo(() => [state, dispatch], [state]);
  
  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () => useContext(StateContext);
