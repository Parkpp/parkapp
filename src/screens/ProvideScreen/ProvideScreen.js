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

  //Stack Screen Nagivation
  const toCurrentSession = () => {
    props.navigation.navigate("CurrentSession");
  };

  const toParkingSpotList = () => {
    props.navigation.navigate("ParkingSpotList");
  };

  const toProvideParking = () => {
    props.navigation.navigate("ProvideParking");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
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
};
