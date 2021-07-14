import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ReservationScreen(props) {
  console.log("reservation", props);
  const user = props.route.params.user;
  const spot = props.route.params.spot;

  const [vehicle, setVehicle] = useState({});
  const [selected, setSelected] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const timeInSeconds = (time) => {
    let hourInSec = Number(time.slice(0, 2)) * 60 * 60;
    let minInSec = Number(time.slice(3, 5)) * 60;

    return hourInSec + minInSec;
  };

  // const [date, setDate] = useState(new Date());
  // const [reservationTime, setReservationTime] = useState("");

  //Make call to firebase to retrieve user vehicle information

  useEffect(() => {
    (async () => {
      const db = firebase.firestore();
      let vehicle = db.collection("vehicles").where("userId", "==", user.id);

      vehicle = vehicle.get();
      console.log(vehicle);
    })();
  }, []);

  //Make call to firebase to

  const onChange = (event, selectedDate) => {
    //const currentDate = selectedDate || date;
    //setDate(currentDate);
    let tempSelection = new Date(selectedDate);
    let tempTime = tempSelection.getHours() + ":" + tempSelection.getMinutes();
    let selectedDateinSec = timeInSeconds(tempTime);

    if (event.testId === "start") {
      let startTimeInSec = timeInSeconds(spot.startTime);

      if (selectedDateinSec < startTimeInSec) {
        alert(`please pick a time that starts before ${spot.startTime}`);
      } else {
        setStartTime(spot.startTime);
      }
    }
    if (event.testId === "end") {
      let endTimeInSec = timeInSeconds(props.route.params.spot.endTime);

      if (selectedDateinSec < endTimeInSec) {
        alert(`please pick a time that ends before ${spot.endTime}`);
      } else {
        setEndTime(spot.endTime);
      }
    }

    const reserveParking = async () => {
      if (!(endTime && startTime)) {
        alert(`please select available times for parking`);
        return;
      } else {
        const db = firebase.firestore();
        const ordersRef = db.collection("orders");

        try {
          let order = ordersRef.doc();
          await spot.set({
            id: order.id,
            userId: user.id,
            vehicle: vehicle.id,
            parkingSpotId: "",
            startTime: "",
            duration: "",
          });
        } catch (error) {
          console.log(error);
        }
        props.navigation.navigate("confirmation page");
      }
    };

    return (
      <SafeAreaView>
        <View>
          <Text>In reservation screen</Text>
        </View>
      </SafeAreaView>
    );
  };
}
