// app/screens/DashboardScreen.tsx
import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useContactStore } from "../store/useStore";
import { StatusBar } from "expo-status-bar";

const DashboardScreen = () => {
  const contacts = useContactStore((state) => state.contacts);

  useEffect(() => {
    // Randomly select an address for each contact
    contacts.forEach((contact) => {
      contact.randomAddress =
        contact.addresses[Math.floor(Math.random() * contact.addresses.length)];
    });
  }, [contacts]);

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Text>Table View</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.phoneNumber}</Text>
              <Text style={styles.tableCell}>{item.email}</Text>
              <Text style={styles.tableCell}>{item.randomAddress}</Text>
              <Text style={styles.tableCell}>{item.longitude}</Text>
              <Text style={styles.tableCell}>{item.latitude}</Text>
            </View>
          )}
        />
      </View>

      <Text>Map View </Text>
      <MapView style={styles.map}>
        {contacts.map((contact) => (
          <Marker
            key={contact.id}
            coordinate={{
              latitude: contact.latitude,
              longitude: contact.longitude,
            }}
            title={contact.name}
            description={contact.randomAddress}
          />
        ))}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
  tableContainer: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  map: {
    flex: 2,
  },
});

export default DashboardScreen;
