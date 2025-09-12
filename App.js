import React from 'react';
import AppNavigator from './navigation';
import { UserProvider } from './context/UserContext';
import { SettingsProvider } from './context/SettingsContext';

export default function App() {
  return (
    <SettingsProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </SettingsProvider>
  );
}
