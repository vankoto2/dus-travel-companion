import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, Button, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { useTranslation } from "react-i18next";

export default function BookTicketScreen() {
  const { t } = useTranslation();

  const [flightNumber, setFlightNumber] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!flightNumber || !passengerName || !date) {
      Alert.alert(t("error_fill_fields"));
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];

    const newBooking = {
      flightNumber,
      passengerName,
      travelDate: formattedDate,
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem("bookings");
      const bookings = existing ? JSON.parse(existing) : [];
      bookings.push(newBooking);
      await AsyncStorage.setItem("bookings", JSON.stringify(bookings));

      Alert.alert(
        t("confirm"),
        `${t("flight_status")}: ${flightNumber}\n${t(
          "welcome"
        )}, ${passengerName}!`
      );

      setFlightNumber("");
      setPassengerName("");
      setDate(undefined);
    } catch (error) {
      Alert.alert("Error", "Failed to save booking");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {t("book_ticket")}
      </Text>

      <TextInput
        label={t("flight_status")}
        placeholder="e.g. LH123"
        value={flightNumber}
        onChangeText={setFlightNumber}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label={t("passenger_name")}
        placeholder="John Doe"
        value={passengerName}
        onChangeText={setPassengerName}
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="outlined"
        onPress={() => setOpen(true)}
        style={styles.input}
      >
        {date ? date.toISOString().split("T")[0] : t("travel_date")}
      </Button>

      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={open}
        onDismiss={() => setOpen(false)}
        date={date}
        onConfirm={({ date }) => {
          setOpen(false);
          setDate(date);
        }}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {t("confirm")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f2f2f2",
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
