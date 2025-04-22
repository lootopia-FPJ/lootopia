import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {TokenPayload} from '../utils/decodeJwt';

type UserContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  user: TokenPayload | null;
  setUser: (user: TokenPayload) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<TokenPayload | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated: setIsAuthenticated,
        user,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
