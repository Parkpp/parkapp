import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ReservationScreen(props) {
  const user = props.route.params.user;
  const spot = props.route.params.spot;

  // const startTimeLimit = spot.startTime;
  // const endTimeLimit = spot.endTinme;

  // startTimeHour = Number(startTimeLimit.slice(0, 2)) * 60 * 60;
  // startTimeMins = Number(startTimeLimit.slice(3, 5)) * 60;

  // endTimeHour = Number(endTimeLimit.slice(0, 2)) * 60 * 60;
  // endTimeMins = Number(endTimeLimit.slice(3, 5)) * 60;

  // startTimeLimit = startTimeHour + startTimeMins;
  // endTimeLimit = endTimeHour + endTimeMins;

  const [vehicles, setVehicles] = useState([]);
  // const [selected, setSelected] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [androidStartTime, setAndroidStartTime] = useState(null);
  const [androidEndTime, setAndroidEndTime] = useState(null);

  //Make call to firebase to retrieve user vehicle information
  useEffect(() => {
    (async () => {
      const db = firebase.firestore();
      const vehicleRef = db
        .collection("vehicles")
        .where("userId", "==", user.id);
      const snapshot = await vehicleRef.get();
      let vehiclesData = [];
      snapshot.forEach((doc) => {
        vehiclesData.push(doc.data());
      });
      setVehicles(vehiclesData);
    })();
  }, []);

  const onChangeStartTime = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setStartTime(currentTime);
    setAndroidStartTime(formatTime(currentTime));
    setShowStartTime(false);
  };

  const revealStartTimeSelector = () => {
    setShowStartTime(true);
  };

  const onChangeEndTime = (event, selectedTime) => {
    const currentTime = selectedTime || endTime;
    setEndTime(currentTime);
    setAndroidEndTime(formatTime(currentTime));
    setShowEndTime(false);
    //Validation occurs here so that End time > Start Time
  };

  const revealEndTimeSelector = () => {
    setShowEndTime(true);
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  //If Platform = android, create state for buttons to show when clicked that renders out a time selection
  return (
    <SafeAreaView>
      <ScrollView>
        {/*Vehicle Information*/}
        {vehicles.map((vehicle, idx) => {
          return (
            <View key={idx}>
              <Text>Brand: {vehicle.make}</Text>
              <Text>Model: {vehicle.model}</Text>
              <Text>Year: {vehicle.year}</Text>
              <Text>Color: {vehicle.color}</Text>
              <Text>License Plate: {vehicle.licensePlate}</Text>
            </View>
          );
        })}

        {Platform.OS == "ios" ? (
          //IOS View for Time Selector
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/*Start Time*/}
            <Text>Start Time:</Text>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <DateTimePicker
                testId="Start Time"
                value={startTime}
                mode={"time"}
                display="default"
                onChange={onChangeStartTime}
                minuteInterval={30}
                is24hour={true}
                style={{ margin: 10 }}
              />
            </View>
            {/*End Time*/}

            <Text>End Time: </Text>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <DateTimePicker
                testId="End Time"
                value={endTime}
                mode={"time"}
                display="default"
                onChange={onChangeEndTime}
                minuteInterval={30}
                is24hour={true}
                style={{ margin: 10 }}
              />
            </View>
          </View>
        ) : (
          //Android View for Time Selector
          <View>
            <Text>Start Time: </Text>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => revealStartTimeSelector()}
              >
                {!androidStartTime ? (
                  <Text>Select Start Time</Text>
                ) : (
                  <Text>{androidStartTime}</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text>End Time: </Text>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => revealEndTimeSelector()}
              >
                {!androidEndTime ? (
                  <Text>Select End Time</Text>
                ) : (
                  <Text>{androidEndTime}</Text>
                )}
              </TouchableOpacity>
            </View>

            {showStartTime && (
              <DateTimePicker
                testId="Start Time"
                value={startTime}
                mode={"time"}
                display="spinner"
                onChange={onChangeStartTime}
                minuteInterval={30}
                is24hour={true}
                style={{ margin: 10 }}
              />
            )}
            {showEndTime && (
              <DateTimePicker
                testId="End Time"
                value={endTime}
                mode={"time"}
                display="spinner"
                onChange={onChangeEndTime}
                minuteInterval={30}
                is24hour={true}
                style={{ margin: 10 }}
              />
            )}
          </View>
        )}
        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.buttonTitle}>Checkout -&gt; </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
