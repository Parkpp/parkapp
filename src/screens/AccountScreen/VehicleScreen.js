import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { firebase } from "../../firebase/config";
import styles from "./styles";

export function VehicleScreen(props) {
  const { user, navigation } = props;
  const [vehicles, setVehicles] = useState([]);

  const vehicleRef = firebase.firestore().collection("vehicles");
  const getVehicles = async () => {
    const vehiclesRef = vehicleRef
      .where("userId", "==", user.id)
      .orderBy("createdAt", "desc");
    const snapshot = await vehiclesRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
    }
    let vehicles = [];
    snapshot.forEach((doc) => {
      vehicles.push(doc.data());
    });

    setVehicles(vehicles);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <View>
      {vehicles.map((vehicle, idx) => {
        return (
          <View key={idx}>
            <Text>Brand: {vehicle.make}</Text>
            <Text>Model: {vehicle.model}</Text>
            <Text>Year: {vehicle.year}</Text>
            <Text>Color: {vehicle.color}</Text>
            <Text>License Plate: {vehicle.licensePlate}</Text>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Update Vehicle", { vehicle: vehicles })
        }
      >
        <Text style={styles.buttonTitle}>Update Vehicle -&gt; </Text>
      </TouchableOpacity>
    </View>
  );
}
