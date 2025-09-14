import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserContext } from "./context/UserContext";
import { ActivityIndicator, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import FlightStatusScreen from "./screens/FlightStatusScreen";
import BookTicketScreen from "./screens/BookTicketScreen";
import BookParkingScreen from "./screens/BookParkingScreen";
import MyRequestsScreen from "./screens/MyRequestsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(UserContext);
  const { t } = useTranslation();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{ title: t("home") }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="FlightStatus"
            options={{ title: t("flight_status") }}
            component={FlightStatusScreen}
          />
          <Stack.Screen
            name="BookTicket"
            options={{ title: t("book_ticket") }}
            component={BookTicketScreen}
          />
          <Stack.Screen
            name="BookParking"
            options={{ title: t("book_parking") }}
            component={BookParkingScreen}
          />
          <Stack.Screen
            name="MyRequests"
            options={{ title: t("my_requests") }}
            component={MyRequestsScreen}
          />
          <Stack.Screen
            name="Settings"
            options={{ title: t("settings") }}
            component={SettingsScreen}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ title: t("login") }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            options={{ title: t("register") }}
            component={RegisterScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
