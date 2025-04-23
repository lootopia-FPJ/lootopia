import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  email: string;
  role: string;
  type: string;
};

type UserContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const userStr = await AsyncStorage.getItem('user');
      setIsAuthenticated(!!token);
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
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
