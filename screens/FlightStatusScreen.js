import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function FlightStatusScreen() {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = ''; // to do move to safe the api key

  const searchFlight = async () => {
    if (!flightNumber) {
      alert('Please enter a flight number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`
      );

      const data = response.data.data;
      if (data && data.length > 0) {
        setFlightData(data[0]);
      } else {
        alert('Flight not found');
        setFlightData(null);
      }
    } catch (error) {
      alert('Error fetching flight data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flight Status</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter flight number (e.g. LH123)"
        value={flightNumber}
        onChangeText={setFlightNumber}
        autoCapitalize="characters"
      />

      <Button title="Search" onPress={searchFlight} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {flightData && (
        <View style={styles.result}>
          <Text>✈️ Airline: {flightData.airline.name}</Text>
          <Text>📍 Departure: {flightData.departure.airport} at {flightData.departure.scheduled}</Text>
          <Text>📍 Arrival: {flightData.arrival.airport} at {flightData.arrival.scheduled}</Text>
          <Text>📊 Status: {flightData.flight_status}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  result: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});
