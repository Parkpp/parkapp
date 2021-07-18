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
import DateTimePicker from "@react-native-community/datetimepicker";

export default ConfirmationScreen = (props) => {
  const user = props.user;
  const spot = props.route.params.spot;

  const returnToMapScreen = () => {
    props.navigation.navigate("MapScreen");
  };

  const convertTo12Hour = (time) => {
    let hours = Number(time.slice(0, 2));

    let AmOrPm = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12;
    let minutes = time.slice(3, 5);
    let finalTime = hours + ":" + minutes + AmOrPm;
    return finalTime;
  };

  const startTime = convertTo12Hour(props.route.params.reservedStartTime);
  const endTime = convertTo12Hour(props.route.params.reservedEndTime);

  return (
    <SafeAreaView
      style={{ justifyContent: "center", alignItems: "center", marginTop: 200 }}
    >
      <TouchableOpacity onPress={returnToMapScreen}>
        <View style={styles.confirmationBackground}>
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 5,
              paddingRight: 5,
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            {user.fullName}, your reservation at {spot.street} {spot.city},
            {spot.state} for {startTime} to {endTime} has been confirmed!
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
