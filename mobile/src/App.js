import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './auth';
import Introduction from './screens/Introduction';
import SocialProof from './screens/SocialProof';
import Referral from './screens/Referral';
import Ready from './screens/Ready';
import CameraFlow from './screens/CameraFlow';
import Analysis from './screens/Analysis';
import Preview from './screens/Preview';
import UnlockedLook from './screens/UnlockedLook';
import Home from './screens/Home';
import Plan from './screens/Plan';
import FaceAnalysis from './screens/FaceAnalysis';
import Settings from './screens/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

function RootNav() {
  const { token } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <>
          <Stack.Screen name="Introduction" component={Introduction} />
          <Stack.Screen name="SocialProof" component={SocialProof} />
          <Stack.Screen name="Referral" component={Referral} />
          <Stack.Screen name="Ready" component={Ready} />
          <Stack.Screen name="CameraFlow" component={CameraFlow} />
          <Stack.Screen name="Analysis" component={Analysis} />
          <Stack.Screen name="Preview" component={Preview} />
          <Stack.Screen name="UnlockedLook" component={UnlockedLook} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Plan" component={Plan} />
          <Stack.Screen name="FaceAnalysis" component={FaceAnalysis} />
          <Stack.Screen name="UnlockedLook" component={UnlockedLook} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNav />
        <StatusBar style="light" />
      </NavigationContainer>
    </AuthProvider>
  );
}


