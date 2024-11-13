// src/components/ThemeContext.js (or a separate file)
import React, { createContext, useState, useContext, useEffect } from 'react';
import {firebase} from '../firebaseConfig'; // Import Firebase Auth

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user); // Sets the user if logged in, otherwise null
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
