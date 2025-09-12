import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function HomeScreen() {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.email}</Text>

      <Button title="Log Out" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
});
