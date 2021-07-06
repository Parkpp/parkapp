import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { decode, encode } from "base-64";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

//Need to pull in data from firebase
export default function ParkingSpotListScreen(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const renderParkingSpots = async () => {
    //Make call to firebase

    const parkingSpots = [];
    return (
      <>
        {parkingSpots.map((spots) => (
          <TouchableOpacity onPress={toCurrentSession}>
            <Text style={styles.buttonText}>CurrentSession</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  return <View style={styles.container}>{renderParkingSpots}</View>;
}
