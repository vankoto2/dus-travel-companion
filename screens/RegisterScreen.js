import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

export default function RegisterScreen() {
  const { register } = useContext(UserContext);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert(`${t("invalid_email")}`);
      return;
    }

    if (password.length < 2) {
      alert(`${t("password_too_short")}`);
      return;
    }

    if (!email || !password) {
      Alert.alert(`${t("error_fill_fields")}`);
      return;
    }

    try {
      const userData = { email };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      register(userData);
    } catch (error) {
      Alert.alert(`${t("error_save_user")}`);
    }
    register({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("register")}</Text>

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

      <Button mode="contained" style={styles.button} onPress={handleRegister}>
        {t("register")}
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>{t("already_have_account")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
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
  loginLink: {
    marginTop: 16,
    textAlign: "center",
    color: "#4a90e2",
  },
});
