import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

export default function EditRequestModal({
  visible,
  onClose,
  onUpdate,
  formData,
  setFormData,
  type,
}) {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text variant="titleMedium" style={styles.title}>
            {t("edit")}{" "}
            {type === "ticket" ? t("book_ticket") : t("book_parking")}
          </Text>

          {type === "ticket" ? (
            <>
              <TextInput
                label={t("flight_status")}
                value={formData.flightNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, flightNumber: text })
                }
                style={styles.input}
              />
              <TextInput
                label={t("passenger_name")}
                value={formData.passengerName}
                onChangeText={(text) =>
                  setFormData({ ...formData, passengerName: text })
                }
                style={styles.input}
              />
              <TextInput
                label={t("travel_date")}
                value={formData.travelDate}
                onChangeText={(text) =>
                  setFormData({ ...formData, travelDate: text })
                }
                style={styles.input}
              />
            </>
          ) : (
            <>
              <TextInput
                label={t("location")}
                value={formData.location}
                onChangeText={(text) =>
                  setFormData({ ...formData, location: text })
                }
                style={styles.input}
              />
              <TextInput
                label={t("vehicle_number")}
                value={formData.vehicleNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, vehicleNumber: text })
                }
                style={styles.input}
              />
              <TextInput
                label={t("travel_date")}
                value={formData.parkingDate}
                onChangeText={(text) =>
                  setFormData({ ...formData, parkingDate: text })
                }
                style={styles.input}
              />
            </>
          )}

          <Button mode="contained" onPress={onUpdate} style={styles.button}>
            {t("confirm")}
          </Button>
          <Button mode="outlined" onPress={onClose} style={styles.button}>
            {t("cancel")}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 24,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});
