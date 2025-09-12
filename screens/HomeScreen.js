import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user, logout } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, {user?.email}</Text>

      <Button title="✈️ Flight Status" onPress={() => navigation.navigate('FlightStatus')} />
      <Button title="🎫 Book Ticket" onPress={() => navigation.navigate('BookTicket')} />
      <Button title="🅿️ Book Parking" onPress={() => navigation.navigate('BookParking')} />
      <Button title="📋 My Requests" onPress={() => navigation.navigate('MyRequests')} />
      <Button title="⚙️ Settings" onPress={() => navigation.navigate('Settings')} />

      <View style={{ marginTop: 24 }}>
        <Button title="Log Out" color="red" onPress={logout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
