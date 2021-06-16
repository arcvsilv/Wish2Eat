import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [storeLogada, setStoreLogada] = React.useState(null);
  console.log("teste logada : " + storeLogada);

  return (
    <GlobalContext.Provider value={{ storeLogada, setStoreLogada }}>
      {children}
    </GlobalContext.Provider>
  );
};