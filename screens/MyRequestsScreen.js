import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Card, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import EditRequestModal from "../components/EditRequestModal";

export default function MyRequestsScreen() {
  const { t } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({});

  const loadRequests = async () => {
    try {
      const ticketData = await AsyncStorage.getItem("bookings");
      const parkingData = await AsyncStorage.getItem("parkings");

      const tickets = ticketData ? JSON.parse(ticketData) : [];
      const parkings = parkingData ? JSON.parse(parkingData) : [];

      const combined = [
        ...tickets.map((item) => ({ type: "ticket", ...item })),
        ...parkings.map((item) => ({ type: "parking", ...item })),
      ];

      combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRequests(combined);
    } catch (error) {
      console.error("Failed to load requests:", error);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleDelete = async (indexToDelete) => {
    const updated = [...requests];
    updated.splice(indexToDelete, 1);
    setRequests(updated);

    const tickets = updated.filter((item) => item.type === "ticket");
    const parkings = updated.filter((item) => item.type === "parking");

    await AsyncStorage.setItem("bookings", JSON.stringify(tickets));
    await AsyncStorage.setItem("parkings", JSON.stringify(parkings));
  };

  const openEditModal = (item, index) => {
    setEditItem(item);
    setEditIndex(index);
    setFormData(item);
    setEditVisible(true);
  };

  const handleUpdate = async () => {
    const updatedRequests = [...requests];
    updatedRequests[editIndex] = {
      ...formData,
      timestamp: new Date().toISOString(),
    };
    setRequests(updatedRequests);

    const tickets = updatedRequests.filter((item) => item.type === "ticket");
    const parkings = updatedRequests.filter((item) => item.type === "parking");

    await AsyncStorage.setItem("bookings", JSON.stringify(tickets));
    await AsyncStorage.setItem("parkings", JSON.stringify(parkings));

    setEditVisible(false);
    Alert.alert(t("confirm"), t("requests_saved"));
  };

  const clearAllRequests = async () => {
    await AsyncStorage.removeItem("bookings");
    await AsyncStorage.removeItem("parkings");
    setRequests([]);
    Alert.alert(t("confirm"), t("requests_cleared"));
  };

  const renderItem = ({ item, index }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.type === "ticket" ? t("book_ticket") : t("book_parking")}
      />
      <Card.Content>
        {item.type === "ticket" ? (
          <>
            <Text>
              {t("flight_status")}: {item.flightNumber}
            </Text>
            <Text>
              {t("passenger_name")}: {item.passengerName}
            </Text>
            <Text>
              {t("travel_date")}: {item.travelDate}
            </Text>
          </>
        ) : (
          <>
            <Text>
              {t("location")}: {item.location}
            </Text>
            <Text>
              {t("vehicle_number")}: {item.vehicleNumber}
            </Text>
            <Text>
              {t("travel_date")}: {item.parkingDate}
            </Text>
          </>
        )}
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" onPress={() => openEditModal(item, index)}>
          {t("edit")}
        </Button>
        <Button mode="outlined" onPress={() => handleDelete(index)}>
          {t("delete")}
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {t("my_requests")}
      </Text>

      <FlatList
        data={requests}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      {requests.length > 0 && (
        <Button
          mode="contained"
          icon="delete"
          onPress={clearAllRequests}
          style={styles.clearButton}
        >
          {t("clear_requests")}
        </Button>
      )}

      <EditRequestModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        onUpdate={handleUpdate}
        formData={formData}
        setFormData={setFormData}
        type={editItem?.type}
      />
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
  card: {
    marginBottom: 16,
  },
  clearButton: {
    marginTop: 16,
    alignSelf: "center",
    backgroundColor: "#d32f2f",
  },
});
