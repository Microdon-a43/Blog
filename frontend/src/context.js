import { createContext, useState } from 'react';

export const Context = createContext();

export const DataProvider = ({children}) => {
  const [user, setUser] = useState('');

  const data = {
    user: [user, setUser],
  };

  return <Context.Provider value={data}>{children}</Context.Provider>
};


