import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, Text } from "react-native-paper";

export default function RegisterScreen() {
  const { register } = useContext(UserContext);
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (password.length < 2) {
      alert("Password must be at least 2 characters");
      return;
    }

    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const userData = { email };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      register(userData);
    } catch (error) {
      Alert.alert("Error", "Failed to save user data");
    }
    register({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

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

      <TextInput
        label="Confirm Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon icon="lock" />}
        style={styles.input}
      />

      <Button mode="contained" style={styles.button} onPress={handleRegister}>
        Register
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>Already have an account? Log In</Text>
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
