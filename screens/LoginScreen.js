import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const { login } = useContext(UserContext);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      alert(`${t("enter_email_password")}`);
      return;
    }

    if (!emailRegex.test(email)) {
      alert(`${t("invalid_email")}`);
      return;
    }

    login({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("login")}</Text>

      <TextInput
        label={t("email")}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
        style={styles.input}
      />

      <TextInput
        label={t("password")}
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon icon="lock" />}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin}>
        {t("login")}
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>{t("no_account")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  registerLink: {
    marginTop: 16,
    textAlign: "center",
    color: "#4a90e2",
  },
});
