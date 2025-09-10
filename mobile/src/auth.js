import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    (async () => {
      const t = await SecureStore.getItemAsync('token');
      if (t) setToken(t);
    })();
  }, []);
  const value = {
    token,
    setToken: async (t) => {
      setToken(t);
      if (t) await SecureStore.setItemAsync('token', t);
      else await SecureStore.deleteItemAsync('token');
    }
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


