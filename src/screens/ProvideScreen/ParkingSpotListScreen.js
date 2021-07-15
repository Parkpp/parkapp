import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { decode, encode } from "base-64";
import {
  Image,
  SafeAreaView,
  ScrollView,
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

//parkingSpots();

export const ParkingSpotListScreen = (props) => {
  const [spots, setParkingSpots] = useState([]);
  const user = props.user;

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        // Do something when the screen is focused
        let parkingSpots = [];

        try {
          const parkingSpotsRef = firebase
            .firestore()
            .collection("parkingSpots")
            .where("userId", "==", user.id);
          const snapshot = await parkingSpotsRef.get();

          if (snapshot.empty) {
            console.log("No matching documents.");
          }
          snapshot.forEach((doc) => {
            parkingSpots.push(doc.data());
          });
        } catch (error) {
          console.log("hello this might be an error");
        }

        setParkingSpots(parkingSpots);
      })();
    }, [])
  );

  // /Users/Etty/parkapp/node_modules/react-native-reanimated/lib/reanimated1/animations/decay.js
  const updateSpot = (spot) => {
    //console.log("This is the parking spot informaion", spot);
    props.navigation.navigate("Update Parking Spot", { spot: spot });
  };

  const deleteSpot = (spot) => {
    props.navigation.navigate("Delete Parking Spot", { spot: spot });
  };

  const buttonsOrActiveStatus = (spot) => {
    if (spot.reserved) {
      return (
        <View
          styles={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>ACTIVE</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.provideButton}
            onPress={() => updateSpot(spot)}
          >
            <Text style={styles.buttonTitle}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.provideButton}
            onPress={() => deleteSpot(spot)}
          >
            <Text style={styles.buttonTitle}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const convertTo12Hour = (time) => {
    let hours = Number(time.slice(0, 2));

    let AmOrPm = hours >= 12 ? "pm" : "am";
    console.log(AmOrPm);
    hours = hours % 12 || 12;
    let minutes = time.slice(3, 5);
    let finalTime = hours + ":" + minutes + AmOrPm;
    return finalTime;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} persistentScrollbar={true}>
        {spots.map((spot, idx) => {
          let startTime = convertTo12Hour(spot.startTime);
          let endTime = convertTo12Hour(spot.endTime);

          return (
            <View key={idx} style={styles.singleParkingSpot}>
              <View style={styles.parkingSpotInfo}>
                {/* //render image, location */}
                <ScrollView style={styles.parkingInfoScrollView}>
                  <Text>
                    Description: {spot.description ? spot.description : "N/A"}
                  </Text>
                  <Text>Street: {spot.street}</Text>
                  <Text>City: {spot.city}</Text>
                  <Text>State: {spot.state}</Text>
                  <Text>Rate: ${spot.rate}/hr</Text>
                  <Text>Start time: {startTime}</Text>
                  <Text>End time: {endTime}</Text>
                  <Text>
                    Status: {spot.reserved ? "reserved" : "available"}
                  </Text>

                  {/* <Text>${spot.daysofWeek}</Text> */}
                </ScrollView>
                <View>
                  <Image
                    style={styles.parkingSpotImage}
                    source={{ uri: spot.imageUrl }}
                  />
                </View>
              </View>
              {buttonsOrActiveStatus(spot)}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
