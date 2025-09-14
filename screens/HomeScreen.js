import React, { useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Button, Provider as PaperProvider } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { user, logout } = useContext(UserContext);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const buttons = [
    {
      label: `${t("flight_status")}`,
      screen: "FlightStatus",
      icon: "airplane",
    },
    { label: `${t("book_ticket")}`, screen: "BookTicket", icon: "ticket" },
    { label: `${t("book_parking")}`, screen: "BookParking", icon: "car" },
    {
      label: `${t("my_requests")}`,
      screen: "MyRequests",
      icon: "clipboard-list",
    },
    { label: `${t("settings")}`, screen: "Settings", icon: "cog" },
  ];

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {t("welcome")}, {user?.email}
        </Text>

        {buttons.map((btn, index) => (
          <Button
            key={index}
            mode="contained"
            icon={btn.icon}
            style={styles.button}
            onPress={() => navigation.navigate(btn.screen)}
          >
            {btn.label}
          </Button>
        ))}

        <Button
          mode="contained"
          icon="logout"
          style={[styles.button, styles.logout]}
          onPress={logout}
        >
          {t("logout")}
        </Button>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 32,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    marginVertical: 8,
    width: "100%",
    maxWidth: 300,
  },
  logout: {
    backgroundColor: "#d9534f",
  },
});
