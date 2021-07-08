import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { set } from "react-native-reanimated";
import { firebase } from "../../firebase/config";

export function VehicleScreen(props) {
  // const userRef = firebase.firestore().collection("users");
  const { user } = props;
  console.log("what is user-->", user);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
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
      snapshot.map((doc) => {
        vehicles.push(doc.data());
      });
      console.log("what are vehicles-->", vehicles);
      setVehicles(vehicles);
    };
    getVehicles();
  }, []);

  return (
    <View>
      <Text>Profile Info</Text>
      <Text>Username: </Text>
      <Text>FullName: </Text>
      <Text>Email: </Text>
      <Text>Phone Number: </Text>
    </View>
  );
}
