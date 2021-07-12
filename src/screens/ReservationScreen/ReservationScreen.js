import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import styles from "./styles";


//Use a duration to select time

// .1 A list of times  
// .2 Modify the list to contain only times within start and end time
    //
//



const mockData = {
  slots: {
    slot1: "9:00am to 9:30am",
    slot2: "9:30am to 10:00am",
    slot3: "10:00am to 10:30am",
    slot4: "10:30am to 11:00am",
    slot5: "11:00am to 11:30am",
    slot6: "11:30am to 12:00pm",
  },
};

const mockDataArr = [
  "9:00am to 9:30am",
  "9:30am to 10:00am",
  "10:00am to 10:30am",
  "10:30am to 11:00am",
  "11:00am to 11:30am",
  "11:30am to 12:00pm",
];

export default function ReservationScreen() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     bookingDate: this.props.navigation.state.params.bookingDate,
  //   };
  // }
  // onPressBack() {
  //   const { goBack } = this.props.navigation;
  //   goBack();
  // }
  // bookSlot(status, key, value) {
  //   const month = this.state.bookingDate.month;
  //   const date = this.state.bookingDate.day;
  //   const user = firebase.auth().currentUser;
  //   const uid = user.uid;
  //   let userDataJson = {};
  //   if (status) userDataJson[key] = uid;
  //   else userDataJson[key] = null;

  // firebase
  //   .database()
  //   .ref("users")
  //   .child(uid)
  //   .child("appointments")
  //   .child(month)
  //   .child(date)
  //   .update(userDataJson);
  // }

  const [selected, setSelected] = React.useState([]);
  const handlePress = (slot) =>
    selected.includes(slot)
      ? setSelected(selected.filter((s) => s !== slot))
      : setSelected([...selected, slot]);

  const slots = mockData.slots;
  const slotsarr = Object.keys(slots).map(function (k) {
    return (
      <View key={k} style={{ margin: 5 }}>
        <TouchableOpacity
          //onPress={(status) => this.bookSlot(status, k, slots[k])}
          onPressIn={() => handlePress(slots[k])}
          style={[
            styles.button,
            {
              backgroundColor: selected.includes(slots[k])
                ? "#00cc00"
                : "#788eec",
            },
          ]}
        >
          <Text style={styles.buttonTitle}>{slots[k]}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "navy" }]}
          onPress={() => this.onPressBack()}
        >
          <Text style={styles.buttonTitle}>Go Back</Text>
        </TouchableOpacity>
      </View>
      <Text>Select a Time Slot!</Text>
      {slotsarr}
      <TouchableOpacity style={[styles.button, { backgroundColor: "navy" }]}>
        <Text style={styles.buttonTitle}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}
