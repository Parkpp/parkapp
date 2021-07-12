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

export const CurrentSessionScreen = (props) => {
  const [spots, setParkingSpots] = useState([]);
  const user = props.user;

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        // Do something when the screen is focused
        const db = firebase.firestore();
        const parkingSpotsRef = db
          .collection("parkingSpots")
          .where("userId", "==", user.id)
          .where("reserved", "==", true);

        try {
          const snapshot = await parkingSpotsRef.get();
          if (snapshot.empty) {
            console.log("No matching documents.");
          }
          let parkingSpots = [];
          snapshot.forEach((doc) => {
            parkingSpots.push(doc.data());
          });
        } catch (error) {
          console.log(error);
        }

        setParkingSpots(parkingSpots);
      })();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {spots.map((spot, idx) => {
        return (
          <View key={idx} style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => toSingleSpotView(spot)}>
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
