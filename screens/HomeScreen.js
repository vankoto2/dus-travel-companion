import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Provider as PaperProvider } from 'react-native-paper';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user, logout } = useContext(UserContext);
  const navigation = useNavigation();

  const buttons = [
    { label: 'Flight Status', screen: 'FlightStatus', icon: 'airplane' },
    { label: 'Book Ticket', screen: 'BookTicket', icon: 'ticket' },
    { label: 'Book Parking', screen: 'BookParking', icon: 'car' },
    { label: 'My Requests', screen: 'MyRequests', icon: 'clipboard-list' },
    { label: 'Settings', screen: 'Settings', icon: 'cog' },
  ];

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome, {user?.email}</Text>

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
          Log Out
        </Button>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginBottom: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginVertical: 8,
    width: '100%',
    maxWidth: 300,
  },
  logout: {
    backgroundColor: '#d9534f',
  },
});
