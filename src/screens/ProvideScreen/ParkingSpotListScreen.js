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

//Need to pull in data from firebase
export const ParkingSpotListScreen = (props) => {
  const [spots, setParkingSpots] = useState([]);

  useEffect( () => {
    //Make call to firebase
    const getParkingSpots = async() =>{

      const db = firebase.firestore();
      const parkingSpotsRef = db.collection("parkingSpots");
      const snapshot = await parkingSpotsRef.get();
  
      if (snapshot.empty) {
        console.log("No matching documents.");
      }
  
      let parkingSpots = [];
  
      snapshot.forEach((doc) => {
        parkingSpots.push(doc.data());
      });
      console.log(parkingSpots);
  
      setParkingSpots(parkingSpots)

    }

      getParkingSpots()
  },[]);

  const toSingleSpotView  = (spot)=>{

    props.navigation.navigate('singleSpot',{parkingSpot: spot})

  }

  return (
    <SafeAreaView style={styles.container}>
      {spots.map((spot, idx) => {
        console.log(spot.city);
        return (
          <TouchableOpacity key={idx} onPress={()=> toSingleSpotView(spot)}>
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
