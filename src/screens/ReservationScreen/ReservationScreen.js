import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReservationScreen (props) {
  const [vehicle, setVehicles] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [androidStartTime, setAndroidStartTime] = useState(null);
  const [androidEndTime, setAndroidEndTime] = useState(null);
  const date = new Date();
  const [iosStartTime, setIosStartTime] = useState(new Date());
  const [iosEndTime, setIosEndTime] = useState(new Date());
  const user = props.user;
  const spot = props.route.params.spot;

  console.log('What are my props-->', props);

  const timeInSeconds = time => {
    let hourInSec = Number(time.slice(0, 2)) * 60 * 60;
    let minInSec = Number(time.slice(3, 5)) * 60;

    return hourInSec + minInSec;
  };

  //Make call to firebase to retrieve user vehicle information
  useEffect(() => {
    (async () => {
      const db = firebase.firestore();
      const vehicleRef = db
        .collection('vehicles')
        .where('userId', '==', user.id);
      const snapshot = await vehicleRef.get();
      let vehiclesData = [];
      snapshot.forEach(doc => {
        vehiclesData.push(doc.data());
      });
      setVehicles(vehiclesData);
    })();
  }, []);

  const reserveParking = async () => {
    if (!(endTime && startTime)) {
      alert(`please select available times for parking`);
      return;
    }

    let duration;

    if (timeInSeconds(startTime) > timeInSeconds(endTime)) duration = 24;

    const db = firebase.firestore();
    const ordersRef = db.collection('orders');
    const parkingSpotRef = db.collection('parkingSpots');

    try {
      let order = ordersRef.doc();
      await spot.set({
        id: order.id,
        userId: user.id,
        vehicle: vehicle.id,
        parkingSpotId: '',
        startTime: startTime,
        duration: duration
      });
    } catch (error) {
      console.log(error);
    }
    props.navigation.navigate('Confirmation', { spot: spot });
  };

  const onChangeStartTime = (event, selectedTime) => {
    setShowStartTime(false);
    let tempSelection = new Date(selectedTime);
    let tempTime = tempSelection.getHours() + ':' + tempSelection.getMinutes();
    if (tempSelection.getHours().toString().length < 2)
      tempTime = `0${tempTime}`;
    if (tempSelection.getMinutes().toString().length < 2)
      tempTime = `${tempTime}0`;
    //temp time is a string in complete military format
    //Check if selected start time is is > than parking spot
    console.log('selected time-->', timeInSeconds(tempTime));
    console.log('spot startTime-->', timeInSeconds(spot.startTime));

    if (!(timeInSeconds(tempTime) >= timeInSeconds(spot.startTime))) {
      alert(`Please select a start time after ${spot.startTime}`);
      return setShowStartTime(false);
    }
    setStartTime(tempTime);
    setAndroidStartTime(formatTime(selectedTime));
    setIosStartTime(selectedTime);
    setShowStartTime(false);
  };

  const revealStartTimeSelector = () => {
    setShowStartTime(true);
  };

  const onChangeEndTime = (event, selectedTime) => {
    setShowEndTime(false);
    let tempSelection = new Date(selectedTime);
    let tempTime = tempSelection.getHours() + ':' + tempSelection.getMinutes();
    if (tempSelection.getHours().toString().length < 2)
      tempTime = `0${tempTime}`;
    if (tempSelection.getMinutes().toString().length < 2)
      tempTime = `${tempTime}0`;
    //temp time is a string in complete military format
    //Check if selected start time is is > than parking spot
    console.log('selected time-->', timeInSeconds(tempTime));
    console.log('spot End time-->', timeInSeconds(spot.endTime));
    if (!(timeInSeconds(tempTime) <= timeInSeconds(spot.endTime))) {
      alert(`Please select an end time before ${spot.endTime}`);
      return setShowEndTime(true);
    }
    setEndTime(tempTime);
    setAndroidEndTime(formatTime(selectedTime));
    setIosEndTime(selectedTime);
    setShowEndTime(false);
  };

  const revealEndTimeSelector = () => {
    setShowEndTime(true);
  };

  const formatTime = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  //If Platform = android, create state for buttons to show when clicked that renders out a time selection
  return (
    <SafeAreaView>
      <ScrollView>
        {/*Vehicle Information*/}
        {vehicle.map((vehicle, idx) => {
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

        {Platform.OS == 'ios' ? (
          //IOS View for Time Selector
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            {/*Start Time*/}
            <Text>Start Time:</Text>
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <DateTimePicker
                testId='Start Time'
                value={iosStartTime}
                mode={'time'}
                display='default'
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
                testId='End Time'
                value={iosEndTime}
                mode={'time'}
                display='default'
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
                testId='Start Time'
                value={date}
                mode={'time'}
                display='default'
                onChange={onChangeStartTime}
                minuteInterval={30}
                is24hour={true}
                style={{ margin: 10 }}
              />
            )}
            {showEndTime && (
              <DateTimePicker
                testId='End Time'
                value={date}
                mode={'time'}
                display='default'
                onChange={onChangeEndTime}
                minuteInterval={30}
                is24hour={true}
                style={{ margin: 10 }}
              />
            )}
          </View>
        )}
        {/* Checkout Button */}
        <TouchableOpacity style={styles.button} onPress={reserveParking}>
          <Text style={styles.buttonTitle}>Checkout -&gt; </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
