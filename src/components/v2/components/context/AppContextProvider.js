import React, { useState } from 'react';
import AppContext from './AppContext';

export const AppContextProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState({
    darkTheme: false,
    english: true
  });

  return (
    <AppContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </AppContext.Provider>
  );
};
