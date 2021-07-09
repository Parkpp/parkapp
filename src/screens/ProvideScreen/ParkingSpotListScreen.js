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
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import { parkingSpots } from "../../../parkingSeed";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export const ParkingSpotListScreen = (props) => {
  const [spots, setParkingSpots] = useState([]);
  const user = props.user;

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        console.log("up here after navigating back");

        // Do something when the screen is focused
        const db = firebase.firestore();
        const parkingSpotsRef = db
          .collection("parkingSpots")
          .where("userId", "==", user.id);
        const snapshot = await parkingSpotsRef.get();
        if (snapshot.empty) {
          console.log("No matching documents.");
        }
        //let parkingSpots = snapshot.map(doc=> doc.data());

        let parkingSpots = [];
        snapshot.forEach((doc) => {
          console.log("trying to find time", doc.data().Time);
          parkingSpots.push(doc.data());
        });

        setParkingSpots(parkingSpots);
      })();
    }, [])
  );

  const updateSpot = (spot) => {
    //console.log("This is the parking spot informaion", spot);
    props.navigation.navigate("UpdateParkingSpot", { spot: spot });
  };

  const deleteSpot = (spot) => {
    props.navigation.navigate("DeleteParkingSpot", { spot: spot });
  };

  return (
    <SafeAreaView style={styles.container}>
      {spots.map((spot, idx) => {
        console.log("down here after navigating back");

        return (
          <View style={{ flex: 1 }}>
            <TouchableOpacity key={idx} onPress={() => toSingleSpotView(spot)}>
              <View>
                {/* //render image, location */}
                <Text>{spot.id}</Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateSpot(spot)}
              >
                <Text style={styles.buttonTitle}>Update Spot</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => deleteSpot(spot)}
              >
                <Text style={styles.buttonTitle}>Delete Spot</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </SafeAreaView>
  );
};
