import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from './context/UserContext';
import { ActivityIndicator, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import FlightStatusScreen from './screens/FlightStatusScreen';
import BookTicketScreen from './screens/BookTicketScreen';
import BookParkingScreen from './screens/BookParkingScreen';
import MyRequestsScreen from './screens/MyRequestsScreen';
import SettingsScreen from './screens/SettingsScreen';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="FlightStatus" component={FlightStatusScreen} />
    <Stack.Screen name="BookTicket" component={BookTicketScreen} />
    <Stack.Screen name="BookParking" component={BookParkingScreen} />
    <Stack.Screen name="MyRequests" component={MyRequestsScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
