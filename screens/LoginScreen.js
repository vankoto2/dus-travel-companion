import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, Text } from "react-native-paper";

export default function LoginScreen() {
  const { login } = useContext(UserContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    login({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon icon="lock" />}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin}>
        Log In
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
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
    color: '#4a90e2',
  },
});
