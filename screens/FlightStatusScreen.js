import React, { useState } from "react";
import { View, StyleSheet, Keyboard, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Card,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function FlightStatusScreen() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const API_KEY = "052e4c32e1467728b05e4124f8d3ad15"; // TODO: move to secure config

  const searchFlight = async () => {
    if (!flightNumber.trim()) {
      alert("Please enter a flight number");
      return;
    }

    Keyboard.dismiss();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`
      );

      const data = response.data.data;
      if (data && data.length > 0) {
        setFlightData(data[0]);
      } else {
        alert("Flight not found");
        setFlightData(null);
      }
    } catch (error) {
      alert("Error fetching flight data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "N/A";
    const date = new Date(iso);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {t("flight_status")}
      </Text>

      <TextInput
        label="Flight Number"
        placeholder="e.g. LH123"
        value={flightNumber}
        onChangeText={setFlightNumber}
        mode="outlined"
        autoCapitalize="characters"
        left={<TextInput.Icon icon="airplane" />}
        style={styles.input}
      />

      <Button mode="contained" onPress={searchFlight} style={styles.button}>
        {t("search")}
      </Button>

      {loading && (
        <ActivityIndicator animating size="large" style={{ marginTop: 20 }} />
      )}

      {flightData && (
        <Card style={styles.card}>
          <Card.Title
            title={`Flight ${flightData.flight.iata}`}
            subtitle={flightData.airline.name}
          />
          <Card.Content>
            <Text>
              {t("departure")}: {flightData.departure.airport}
            </Text>
            <Text>
              {t("Scheduled")}: {formatDate(flightData.departure.scheduled)}
            </Text>
            <Text>
              {t("arrival")}: {flightData.arrival.airport}
            </Text>
            <Text>
              {t("Scheduled")}: {formatDate(flightData.arrival.scheduled)}
            </Text>
            <Text>
              {t("status")}: {flightData.flight_status}
            </Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f2f2f2",
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  card: {
    marginTop: 24,
  },
});
