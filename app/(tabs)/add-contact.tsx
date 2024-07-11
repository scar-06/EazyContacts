// app/screens/AddContactScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useContactStore } from "../store/useStore";
import { StatusBar } from "expo-status-bar";

const AddContactScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addresses, setAddresses] = useState<string[]>([""]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const addContact = useContactStore((state) => state.addContact);
  const router = useRouter();

  const handleSaveContact = () => {
    if (
      name &&
      phoneNumber &&
      email &&
      addresses.length &&
      longitude &&
      latitude
    ) {
      const newContact = {
        id: Date.now().toString(),
        name,
        phoneNumber,
        email,
        addresses,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
      };
      addContact(newContact);
      router.push("/"); // Navigate to Dashboard after saving
    }
  };

  const addAddressField = () => {
    if (addresses.length < 5) {
      setAddresses([...addresses, ""]);
    }
  };
  const removeAddressField = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text>Add Contact</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      {addresses.map((address, index) => (
        <View key={index} style={styles.addressContainer}>
          <TextInput
            placeholder={`Address ${index + 1}`}
            value={address}
            onChangeText={(text) => {
              const newAddresses = [...addresses];
              newAddresses[index] = text;
              setAddresses(newAddresses);
            }}
            style={styles.input}
          />
          {addresses.length > 1 && (
            <Button title="Remove" onPress={() => removeAddressField(index)} />
          )}
        </View>
      ))}
      {addresses.length < 5 && (
        <Button title="Add Address" onPress={addAddressField} />
      )}
      <TextInput
        placeholder="Longitude"
        keyboardType="numeric"
        value={longitude}
        onChangeText={setLongitude}
        style={styles.input}
      />
      <TextInput
        placeholder="Latitude"
        keyboardType="numeric"
        value={latitude}
        onChangeText={setLatitude}
        style={styles.input}
      />
      <Button title="Save Contact" onPress={handleSaveContact} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 8,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AddContactScreen;
