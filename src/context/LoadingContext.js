import React, { createContext, useState } from "react";

export const LoadingContext = createContext();
const { Provider } = LoadingContext;

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </Provider>
  );
};

export default LoadingContextProvider;
