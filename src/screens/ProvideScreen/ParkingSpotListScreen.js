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
          console.log(error);
        }

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

  const buttonsOrActiveStatus = (spot) => {
    if (spot.reserved) {
      return (
        <View style={{flex:1}}>
          <Text>ACTIVE</Text>;
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

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} persistentScrollbar={true}>
        {spots.map((spot, idx) => {
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
                  <Text>Start time: {spot.startTime}</Text>
                  <Text>End time: {spot.endTime}</Text>
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
