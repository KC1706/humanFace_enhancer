import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import IntroductionScreen from '../screens/Onboarding/IntroductionScreen';
import SocialProofScreen from '../screens/Onboarding/SocialProofScreen';
import ReferralScreen from '../screens/Onboarding/ReferralScreen';
import ReadyScreen from '../screens/Onboarding/ReadyScreen';
import CameraFlowScreen from '../screens/Scan/CameraFlowScreen';
import AnalysisScreen from '../screens/Onboarding/AnalysisScreen';
import PreviewScreen from '../screens/Onboarding/PreviewScreen';
import UnlockedLookScreen from '../screens/Paywall/UnlockedLookScreen';
import PlanScreen from '../screens/Results/PlanScreen';
import FaceAnalysisScreen from '../screens/Results/FaceAnalysisScreen';
import { useAuth } from '../providers/auth';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { token } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Introduction" component={IntroductionScreen} />
            <Stack.Screen name="SocialProof" component={SocialProofScreen} />
            <Stack.Screen name="Referral" component={ReferralScreen} />
            <Stack.Screen name="Ready" component={ReadyScreen} />
            <Stack.Screen name="CameraFlow" component={CameraFlowScreen} />
            <Stack.Screen name="Analysis" component={AnalysisScreen} />
            <Stack.Screen name="Preview" component={PreviewScreen} />
            <Stack.Screen name="UnlockedLook" component={UnlockedLookScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Plan" component={PlanScreen} />
            <Stack.Screen name="FaceAnalysis" component={FaceAnalysisScreen} />
            <Stack.Screen name="UnlockedLook" component={UnlockedLookScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
