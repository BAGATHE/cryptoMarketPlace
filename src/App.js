
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from '@screens/landing/landingScreen';
import SignIn from '@screens/authentification/signInScreen';
import SignUp from '@screens/authentification/signUpScreen';
import HomeScreen from '@screens/home/homeScreen';
import ProfilScreen from '@screens/profil/profilScreen';
import DepotScreen from '@screens/fond/depotScreen';
import RetraitScreen from '@screens/fond/retraitScreen';
import ConfirmationPage from '@screens/fond/confirmationPage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Depot" component={DepotScreen} />
      <Stack.Screen name="Retrait" component={RetraitScreen} />
      <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
  );
}
