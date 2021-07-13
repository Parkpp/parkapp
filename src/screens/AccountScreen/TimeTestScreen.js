import React, { useState } from "react";
import { View, Platform, Text, SafeAreaView, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const startTime = "06:00:00";
const endTime = "12:00:00";

//Need to convert starTime to DateTime

startTimeHour = Number(startTime.slice(0, 2)) * 60 * 60;
startTimeMins = Number(startTime.slice(3, 5)) * 60;

startTimeN = startTimeHour + startTimeMins;
console.log(startTimeHour, startTimeMins, startTimeN);
endTimeHour = Number(endTime.slice(0, 2)) * 60 * 60;
endTimeMins = Number(endTime.slice(3, 5)) * 60;

endTimeN = endTimeHour + endTimeMins;

export const TimeTestScreen = () => {
  const [date, setDate] = useState(new Date());
  const [reservationTime, setReservationTime] = useState("");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log("currentDate-->", currentDate);
    let tempSelection = new Date(currentDate);
    let tempTime = tempSelection.getHours() + ":" + tempSelection.getMinutes();

    setReservationTime(`You have selected your reservation at ${tempTime}`);
    console.log("What type is temptTime", typeof tempTime);
    console.log("what is this?", tempSelection);
    console.log("Selected time and Date-->", `Time:${tempTime}`);
    setShow(false);
  };

  const showTimePicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={{ margin: 10 }}>{reservationTime}</Text>
        <View style={{ margin: 20 }}>
          <Button onPress={() => showTimePicker()} title="Select Start Time" />
        </View>
        {show && (
          <View>
            <DateTimePicker
              testId="timePicker"
              value={date}
              mode={"time"}
              display="default"
              onChange={onChange}
              minuteInterval={30}
              is24hour={false}
              style={{ margin: 10 }}
            />
            {/* <Text>This is Spinner Time Selector</Text>
            <DateTimePicker
              testId="timePicker"
              value={date}
              mode={"time"}
              display="spinner"
              is24hour={false}
              onChange={onChange}
              minuteInterval={30}
              style={{ margin: 10 }}
            /> */}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
