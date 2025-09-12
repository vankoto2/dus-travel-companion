import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('loggedInUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const register = async ({ email, password }) => {
    try {
      const usersRaw = await AsyncStorage.getItem('users');
      const users = usersRaw ? JSON.parse(usersRaw) : {};

      if (users[email]) {
        alert('User already exists');
        return;
      }

      users[email] = { email, password };
      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('loggedInUser', JSON.stringify({ email }));
      setUser({ email });
    } catch (error) {
      alert('Registration failed');
    }
  };

  const login = async ({ email, password }) => {
    try {
      const usersRaw = await AsyncStorage.getItem('users');
      const users = usersRaw ? JSON.parse(usersRaw) : {};

      if (users[email] && users[email].password === password) {
        await AsyncStorage.setItem('loggedInUser', JSON.stringify({ email }));
        setUser({ email });
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedInUser');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </UserContext.Provider>
  );
};
