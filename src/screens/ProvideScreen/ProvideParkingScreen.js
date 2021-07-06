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

//Need to send data to firbase

//Form for loading parking spot info

//User will have to select spot on map to fill the longitude and latitude of the parking spot

//This component will have to work with the maps

export const ProvideParkingScreen = (props) => {
  const [description, setdescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  //const [imageUrl, setImageUrl] = useState("");  Stretch goal to upload picture from user phone

  // latitude: 41.9799992, To be retrieved from map or street address and city
  // longitude: -87.6900267, To be retrieved from map or street address and city

  const onRegisterPress = async () => {
    //API call to firebase to save data
    const db = firebase.firestore();
    const parkingRef = db.collection("parkingSpots");

    await parkingRef.add({
      description: description,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      // imageUrl:
      //   "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
      // latitude: 41.9839992,
      // longitude: -87.6200267,
    });
    //Create object of info to save to firebase database

    props.navigation.navigate("ParkingSpotList");
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setdescription(text)}
          value={description}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setStreet(text)}
          value={street}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="City"
          onChangeText={(text) => setCity(text)}
          value={city}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="State"
          onChangeText={(text) => setState(text)}
          value={state}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Zip-code"
          onChangeText={(text) => setZipcode(text)}
          value={zipcode}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        {/* Upload image */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Register Spot</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};
