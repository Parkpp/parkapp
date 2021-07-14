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
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styles from "./styles";

import DateTimePicker from "@react-native-community/datetimepicker";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
import * as Location from "expo-location";

export const ProvideParkingScreen = (props) => {
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [rate, setRate] = useState("");
  const [spotCheck, setSpotCheck] = useState(false);
  const [startTime, setStartTime] = useState("Select Start Time");
  const [endTime, setEndTime] = useState("Select End Time");
  const [coords, setCoords] = useState({});
  const [startPicker, setStartPicker] = useState(false);
  const [endPicker, setEndPicker] = useState(false);
  const date = new Date();

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
    if (description.length > 24)
      return alert("Please enter a shorter description (max 25 char)");
    if (description.length < 1)
      if (isNaN(rate) || rate == "")
        return alert("please enter a number for rate");
    if (startTime === "Select Start Time")
      return alert("please select a start time");
    if (endTime === "Select End Time")
      return alert("please select an end time");

    const address = `${street}, ${city}, ${state}`;
    //check if form entered data returns longitude and latidude from geocoding APi

    const returnedCoords = await Location.geocodeAsync(address);
    if (!returnedCoords[0]) return alert("please enter full address");

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
        longitude: coords.longitude,
        latitude: coords.latitude,
      });

      console.log(address);
      let spot = parkingRef.doc();
      await spot.set({
        id: spot.id,
        userId: props.user.id,
        description: description.length < 1 ? "None" : description,
        street:
          address.name === address.street
            ? `${address.street}`
            : `${address.name} ${address.street}`,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        state: address.region,
        imageUrl:
          "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
        latitude: coords.latitude,
        longitude: coords.longitude,
        reserved: false,
        startTime: startTime,
        endTime: endTime,
        rate: rate,
      });
    } catch (error) {
      console.log(error);
    }

    props.navigation.navigate("ProvideScreen");
  };

  const returnToForm = () => {
    setSpotCheck(false);
  };

  const onStartChange = (event, selectedDate) => {
    //console.log(event);
    setStartPicker(false);
    let tempSelection = new Date(selectedDate);
    let tempTime = tempSelection.getHours() + ":" + tempSelection.getMinutes();

    if (tempSelection.getHours().toString().length < 2)
      tempTime = `0${tempTime}`;
    if (tempSelection.getMinutes().toString().length < 2)
      tempTime = `${tempTime}0`;

    if (tempTime === "NaN:NaN") tempTime = startTime;
    setStartTime(tempTime);
  };
  const onEndChange = (event, selectedDate) => {
    //console.log(event);
    setEndPicker(false);
    let tempSelection = new Date(selectedDate);

    let tempTime = tempSelection.getHours() + ":" + tempSelection.getMinutes();

    console.log(tempTime);
    if (tempSelection.getHours().toString().length < 2)
      tempTime = `0${tempTime}`;
    if (tempSelection.getMinutes().toString().length < 2)
      tempTime = `${tempTime}0`;

    // let selectedDateinSec = timeInSeconds(tempTime);

    console.log(tempTime);
    //if (tempTime === "NaN:NaN") tempTime = endTime;
    setEndTime(tempTime);
  };

  return (
    <>
      {spotCheck ? (
        <SafeAreaView style={styles.AndroidSafeArea}>
          <MapView
            style={{ flex: 4 }}
            loadingEnabled={true}
            provider={PROVIDER_GOOGLE}
            mapType={"mutedStandard"}
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
              source={require("../../../assets/park.png")}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter short description (max 25 characters)"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => Dsetdescription(text)}
              value={description}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
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
              placeholder="Postalcode"
              onChangeText={(text) => setpostalCode(text)}
              value={postalCode}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder="Rate (per hour)"
              onChangeText={(text) => setRate(text)}
              value={rate}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

            {startPicker ? (
              <DateTimePicker
                testId="start"
                value={date}
                mode={"time"}
                display="default"
                onChange={onStartChange}
                minuteInterval={30}
                style={{ margin: 10 }}
              />
            ) : (
              <></>
            )}
            {endPicker ? (
              <DateTimePicker
                testId="start"
                value={date}
                mode={"time"}
                display="default"
                onChange={onEndChange}
                minuteInterval={30}
                style={{ margin: 10 }}
              />
            ) : (
              <></>
            )}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text> Start Time:</Text>
              <TouchableOpacity
                style={{ ...styles.button, width: 220 }}
                onPress={() => setStartPicker(true)}
              >
                <Text style={styles.buttonTitle}>{startTime}</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text> End Time: </Text>
              <TouchableOpacity
                style={{ ...styles.button, width: 220 }}
                onPress={() => setEndPicker(true)}
              >
                <Text style={styles.buttonTitle}>{endTime}</Text>
              </TouchableOpacity>
            </View>
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
