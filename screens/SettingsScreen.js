import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const { logout } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {t("settings")}
      </Text>

      <Button
        mode="contained"
        onPress={() => i18n.changeLanguage("de")}
        style={styles.button}
      >
        Deutsch
      </Button>

      <Button
        mode="contained"
        onPress={() => i18n.changeLanguage("en")}
        style={styles.button}
      >
        English
      </Button>

      <Button
        mode="contained"
        icon="logout"
        onPress={logout}
        style={[styles.button, styles.logout]}
      >
        {t("logout")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    marginVertical: 8,
    width: "80%",
  },
  logout: {
    backgroundColor: "#d9534f",
  },
});
