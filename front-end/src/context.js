import axios from 'axios';
import React, { useContext, useState, useEffect, useCallback } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const saveUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/users/showMe');
      const userData = response.data.user;
      saveUser(userData);
    } catch (error) {
      setUser(null);
    }
  }, [saveUser]);


  const logoutUser = async () => {
    try {
      await axios.delete('/api/v1/auth/logout');
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AppContext.Provider
      value={{
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
