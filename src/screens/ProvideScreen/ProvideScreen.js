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
import styles from "./styles";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export const ProvideScreen = (props) => {
  //Stack Screen Nagivation
  const toParkingSpotList = () => {
    props.navigation.navigate("My Parking Spots");
  };

  const toProvideParking = () => {
    props.navigation.navigate("Provide Parking");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        flexDirection: "column",
      }}
    >
      <TouchableOpacity
        style={styles.provideScreenButton}
        onPress={toParkingSpotList}
      >
        <Text style={styles.provideButtonTitle}>My Parking Spots</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.provideScreenButton}
        onPress={toProvideParking}
      >
        <Text style={styles.provideButtonTitle}>Provide Parking</Text>
      </TouchableOpacity>
    </View>
  );
};
