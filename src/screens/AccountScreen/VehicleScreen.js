import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { firebase } from "../../firebase/config";

export function VehicleScreen(props) {
  // const userRef = firebase.firestore().collection("users");
  const { user } = props;
  console.log("what is user-->", user);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const vehicleRef = firebase.firestore().collection("vehicles");
    const getVehicle = async () => {
      const vehicle = await vehicleRef
        .where("userId", "==", user.id)
        // .orderBy("createdAt", "desc")
        .get();
      // console.log("what is vehicle?-->", vehicle);
    };
  });

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
