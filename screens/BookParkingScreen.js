import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, Button, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { useTranslation } from "react-i18next";

export default function BookParkingScreen() {
  const { t } = useTranslation();

  const [location, setLocation] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!location || !vehicleNumber || !date) {
      Alert.alert(t("error_fill_fields"));
      return;
    }

    const formattedDate = date.toISOString().split("T")[0];

    const newParking = {
      location,
      vehicleNumber,
      parkingDate: formattedDate,
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem("parkings");
      const parkings = existing ? JSON.parse(existing) : [];
      parkings.push(newParking);
      await AsyncStorage.setItem("parkings", JSON.stringify(parkings));

      Alert.alert(
        t("confirm"),
        `${t("book_parking")} @ ${location}\n${t("welcome")}, ${vehicleNumber}!`
      );

      setLocation("");
      setVehicleNumber("");
      setDate(undefined);
    } catch (error) {
      Alert.alert("Error", "Failed to save parking request");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {t("book_parking")}
      </Text>

      <TextInput
        label={t("location")}
        placeholder="e.g. Terminal 1"
        value={location}
        onChangeText={setLocation}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label={t("vehicle_number")}
        placeholder="e.g. CA1234BX"
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
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
