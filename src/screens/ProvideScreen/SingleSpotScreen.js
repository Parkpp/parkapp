//Receives props for the parkingListSrreen
//Should render all the data of the parking spot
//Should render position with marker on a map
//Should allow user to edit info (updating map is a stretch goal)
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
import styles from "./styles";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
//API call to convert entered user loction to Geopoint long and lat
//Need to pull in data from firebase
export const SingleSpotListScreen = (props) => {
  const [spots, setParkingSpots] = useState([]);
  const user = props.user;
  useEffect(() => {
    //Make call to firebase
    const getParkingSpots = async () => {
      //Need logic to check "userId" field and filter query  as so
      const db = firebase.firestore();
      const parkingSpotsRef = db
        .collection("parkingSpots")
        .where("userId", "==", user.id);
      const snapshot = await parkingSpotsRef.get();
      if (snapshot.empty) {
        console.log("No matching documents.");
      }
      let parkingSpots = [];
        snapshot.forEach((doc) => {
        parkingSpots.push(doc.data());
      });
      setParkingSpots(parkingSpots);
    };
    getParkingSpots();
  }, []);
  const toSingleSpotView = (spot) => {
    console.log('spot sent to singlespotscreen', spot)
    props.navigation.navigate("singleSpot", { parkingSpot: spot });
  };
  return (
    <SafeAreaView style={styles.container}>
      {spots.map((spot, idx) => {
        console.log(spot.city);
        return (
          <TouchableOpacity key={idx} onPress={() => toSingleSpotView(spot)}>
            <View>
              {/* //render image, location */}
              <Text>{spot.description}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};