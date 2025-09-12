import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import FlightStatusScreen from './screens/FlightStatusScreen';
import BookTicketScreen from './screens/BookTicketScreen';
import BookParkingScreen from './screens/BookParkingScreen';
import MyRequestsScreen from './screens/MyRequestsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FlightStatus" component={FlightStatusScreen} />
        <Stack.Screen name="BookTicket" component={BookTicketScreen} />
        <Stack.Screen name="BookParking" component={BookParkingScreen} />
        <Stack.Screen name="MyRequests" component={MyRequestsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
