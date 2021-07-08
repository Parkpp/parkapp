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
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

import * as Location from "expo-location";
import { cond } from "react-native-reanimated";

export const ProvideParkingScreen = (props) => {
  const [description, setdescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [spotCheck, setSpotCheck] = useState(false);
  const [coords, setCoords] = useState({});

  //const [imageUrl, setImageUrl] = useState("");  Stretch goal to upload picture from user phone

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        //setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const onRegisterPress = async () => {
    const address = `${street}, ${city}, ${state}`;
    console.log(address);
    //check if form entered data returns longitude and latidude from geocoding APi

    const returnedCoords = await Location.geocodeAsync(address);

    console.log(returnedCoords[0]);

    setCoords(returnedCoords[0]);
    setSpotCheck(true);
    //Navigate to simple map component render
    //props.navigation.navigate('map', {coor})

    return;
  };

  //API call to firebase to save data

  const addParkingSpot = async () => {
    const db = firebase.firestore();
    const parkingRef = db.collection("parkingSpots");

    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      let spot = parkingRef.doc();
      await spot.set({
        id: spot.id,
        userId: props.user.id,
        description: description,
        street: `${address.name} ${address.street}`,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        State: address.region,
        imageUrl:
          "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }

    props.navigation.navigate("ParkingSpotList");
  };

  const returnToForm = () => {
    setSpotCheck(false);
  };

  return (
    <>
      {spotCheck ? (
        <SafeAreaView style={styles.AndroidSafeArea}>
          <MapView
            style={{ flex: 4 }}
            loadingEnabled={true}
            //provider={PROVIDER_GOOGLE}
            region={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
            ></Marker>
          </MapView>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 100,
            }}
          >
            Is this the correct location?
          </Text>

          <View style={{ flex: 1, flexDirection: "column" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addParkingSpot()}
            >
              <Text style={styles.buttonTitle}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => returnToForm()}
            >
              <Text style={styles.buttonTitle}>No</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
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
              placeholder="City"
              onChangeText={(text) => setCity(text)}
              value={city}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
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
      )}
    </>
  );
};
