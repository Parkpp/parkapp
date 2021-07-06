import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { decode, encode } from "base-64";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import styles from "./styles";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

//Render Buttons to link to other Stack.screens
//Functions to handle button navigation

//const Tab = create();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "space-evenly",
  },
  buttonText: {},
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const ProvideScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //Funtion to handle navigation to Current Session Screen
  const toCurrentSession = () => {
    props.navigation.navigate("CurrentSession");
  };

  //Funtion to handle navigation to Current Session Screen
  const toParkingSpotList = () => {
      //'Root', { screen: 'Settings' }
    props.navigation.navigate("ParkingSpotList");
  };

  //Funtion to handle navigation to Current Session Screen
  const toProvideParking = () => {
    props.navigation.navigate("ProvideParking");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toCurrentSession}>
          <View>
            <Text style={styles.buttonText}>CurrentSession</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={toParkingSpotList}>
          <View>
            <Text style={styles.buttonText}>ParkingSpots</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={toProvideParking}>
          <View>
            <Text style={styles.buttonText}>ProvideParking</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
