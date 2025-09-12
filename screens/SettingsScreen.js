import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function SettingsScreen() {
  const { logout } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* to do add other settings  language, theme... */}

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
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
