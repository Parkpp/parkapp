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
import DateTimePicker from "@react-native-community/datetimepicker";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

import * as Location from "expo-location";

export const UpdateParkingSpotScreen = (props) => {
  // values in form initialized to current info of parking spot
  const spotToUpdate = props.route.params.spot;
  const [description, setdescription] = useState(spotToUpdate.description);
  const [street, setStreet] = useState(spotToUpdate.street);
  const [city, setCity] = useState(spotToUpdate.city);
  const [state, setState] = useState(spotToUpdate.state);
  const [postalCode, setpostalCode] = useState(spotToUpdate.postalCode);
  const [rate, setRate] = useState(spotToUpdate.rate);
  const [spotCheck, setSpotCheck] = useState(false);
  const [coords, setCoords] = useState({});
  const [startTime, setStartTime] = useState(spotToUpdate.startTime);
  const [endTime, setEndTime] = useState(spotToUpdate.endTime);
  const [startPicker, setStartPicker] = useState(false);
  const [endPicker, setEndPicker] = useState(false);
  const [displayStartTime, setDisplayStartTime] = useState(
    spotToUpdate.startTime
  );
  const [displayEndTime, setDisplayEndTime] = useState(spotToUpdate.endTime);
  const [iosStartTime, setIosStartTime] = useState(new Date());
  const [iosEndTime, setIosEndTime] = useState(new Date());

  const date = new Date();

  //Geocoding- retrieve lat & long from user entered address
  const onRegisterPress = async () => {
    if (description.length > 24)
      return alert("Please enter a shorter description (max 25 char)");

    if (isNaN(rate) || rate == "")
      return alert("please enter a number for rate");
    if (startTime === "Select Start Time")
      return alert("please select a start time");
    if (endTime === "Select End Time")
      return alert("please select an end time");
    const address = `${street}, ${city}, ${state}`;

    const returnedCoords = await Location.geocodeAsync(address);
    if (!returnedCoords[0]) return alert("please enter full address");

    setCoords(returnedCoords[0]);
    setSpotCheck(true);
  };

  //API call to firebase to add user confirmed parking spot
  const updateParkingSpot = async () => {
    const db = firebase.firestore();
    const parkingRef = db.collection("parkingSpots");

    //Retreive registered map API address of user confirmed coordinates
    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      //Update parking spot info in firebase
      await parkingRef.doc(spotToUpdate.id).update({
        description: description.length < 1 ? "None" : description,
        street:
          address.name === address.street
            ? `${address.street}`
            : `${address.name} ${address.street}`,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        state: address.region,
        rate: rate,
        imageUrl:
          "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
        latitude: coords.latitude,
        longitude: coords.longitude,
        startTime: startTime,
        endTime: endTime,
      });
    } catch (error) {}

    props.navigation.navigate("My Parking Spots");
  };

  const returnToForm = () => {
    setSpotCheck(false);
  };

  const convertTo12Hour = (time) => {
    let hours = Number(time.slice(0, 2));

    let AmOrPm = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12;
    let minutes = time.slice(3, 5);
    let finalTime = hours + ":" + minutes + AmOrPm;
    return finalTime;
  };
  const onStartChange = (event, selectedDate) => {
    setStartPicker(false);
    let tempSelection = new Date(selectedDate);
    let tempTime = tempSelection.getHours() + ":" + tempSelection.getMinutes();

    if (tempSelection.getHours().toString().length < 2)
      tempTime = `0${tempTime}`;
    if (tempSelection.getMinutes().toString().length < 2)
      tempTime = `${tempTime}0`;

    if (tempTime === "NaN:NaN") tempTime = startTime;
    setStartTime(tempTime);
    setIosStartTime(tempSelection);
    setDisplayStartTime(convertTo12Hour(tempTime));
  };
  const onEndChange = (event, selectedDate) => {
    setEndPicker(false);
    let tempSelection = new Date(selectedDate);

    let tempTime = tempSelection.getHours() + ":" + tempSelection.getMinutes();

    if (tempSelection.getHours().toString().length < 2)
      tempTime = `0${tempTime}`;
    if (tempSelection.getMinutes().toString().length < 2)
      tempTime = `${tempTime}0`;

    if (tempTime === "NaN:NaN") tempTime = endTime;
    setEndTime(tempTime);
    setIosEndTime(tempSelection);
    setDisplayEndTime(convertTo12Hour(tempTime));
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
              onPress={() => updateParkingSpot()}
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
              source={require("../../../assets/CarinGarageClear.png")}
            />
            <TextInput
              style={styles.input}
              placeholder={description}
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setdescription(text)}
              value={description}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder={street}
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setStreet(text)}
              value={street}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder={city}
              onChangeText={(text) => setCity(text)}
              value={city}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder={state ? state : "State"}
              onChangeText={(text) => setState(text)}
              value={state}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder={postalCode}
              onChangeText={(text) => setpostalCode(text)}
              value={postalCode}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder={rate}
              onChangeText={(text) => setRate(text)}
              value={rate}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            {Platform.OS == "ios" ? (
              <View>
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text> Start Time: </Text>
                    <DateTimePicker
                      testId="start"
                      value={iosStartTime}
                      mode={"time"}
                      display="default"
                      onChange={onStartChange}
                      minuteInterval={30}
                      style={{ flex: 1, margin: 10, paddingHorizontal: 50 }}
                    />
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
                    <DateTimePicker
                      testId="start"
                      value={iosEndTime}
                      mode={"time"}
                      display="default"
                      onChange={onEndChange}
                      minuteInterval={30}
                      style={{ flex: 1, margin: 10, paddingHorizontal: 50 }}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onRegisterPress()}
                >
                  <Text style={styles.buttonTitle}>Register Spot</Text>
                </TouchableOpacity>
              </View>
            ) : (
              //Android
              <>
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
                    <Text style={styles.buttonTitle}>{displayStartTime}</Text>
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
                    <Text style={styles.buttonTitle}>{displayEndTime}</Text>
                  </TouchableOpacity>
                </View>
                {/* Upload image */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onRegisterPress()}
                >
                  <Text style={styles.buttonTitle}>Update Parking Spot</Text>
                </TouchableOpacity>
              </>
            )}
          </KeyboardAwareScrollView>
        </View>
      )}
    </>
  );
};
