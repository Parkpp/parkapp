import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { decode, encode } from "base-64";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import styles from "./styles";
//import SelectTime from './SelectTime'
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export const DeleteParkingSpotScreen = (props) => {
  const spotToDelete = props.route.params.spot;
  const [canDelete, setCanDelete] = useState(true);

  const db = firebase.firestore();

  const confirmDeleteParkingSpot = async () => {
    //Check if parking spot is currnetlu active in parkingSpot db
    const parkingSpotRef = db.collection("parkingSpots").doc(spotToDelete.id);
    const spot = await (await parkingSpotRef.get()).data();
    await db.collection("parkingSpots").doc(spot.id).delete();
    returnToParkingSpotsList();
  };

  const returnToParkingSpotsList = () => {
    props.navigation.navigate("ParkingSpotList");
  };

  return (
    <View>
      <Text>Do you want to delete this parking spot</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => confirmDeleteParkingSpot()}
      >
        <Text style={styles.buttonTitle}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => returnToParkingSpotsList()}
      >
        <Text style={styles.buttonTitle}>No</Text>
      </TouchableOpacity>
    </View>
  );
};
