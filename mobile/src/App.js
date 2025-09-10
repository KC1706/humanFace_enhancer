import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './providers/auth';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="light" />
    </AuthProvider>
  );
}


