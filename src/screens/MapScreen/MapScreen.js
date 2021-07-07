import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen (props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const userID = props.extraData.id;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currLoc = await Location.getCurrentPositionAsync();
      setLocation(currLoc);
    })();
  }, []);
  console.log(location);

  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton={true}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
    >
      <Marker
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324
        }}
        pinColor='red'
      >
        <Callout>
          <Text>I'm here!</Text>
        </Callout>
      </Marker>
    </MapView>
  );
}
