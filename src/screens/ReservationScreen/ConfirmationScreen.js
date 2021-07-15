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

  console.log("In confimation screen user -->", user);

  console.log("In confirmation screen spot -->", spot);



  const returnToMapScreen = () => {

    props.navigation.navigate('MapScreen')
  }
  return (
    <SafeAreaView>
      <TouchableOpacity
       onPress={returnToMapScreen}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            {" "}
            {user.fullName}, your reservation at {spot.street} {spot.city}{" "}
            {spot.state} has been confirmed!{" "}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
