import React, { useEffect, useState, useRef } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import styles from './styles';
import { firebase, GOOGLE_API_KEY } from '../../firebase/config';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Camera
} from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { LogBox } from 'react-native';
// import { dummyData } from '../../../parkingSeed';
// const db = firebase.firestore();
// dummyData.forEach(doc => {
//   db.collection('parkingSpots').add(doc);
// });

LogBox.ignoreAllLogs(true);

Geocoder.init(GOOGLE_API_KEY, { language: 'en' });

export default function MapScreen (props) {
  const [parkingSpots, setParkingSpots] = useState(null);
  const [region, setRegion] = useState({
    center: {
      latitude: 40.757952,
      longitude: -73.985572
    },
    pitch: 0,
    zoom: 13,
    heading: 0,
    altitude: 0
  });

  const geocode = async text => {
    let coords = await Geocoder.from(text);
    return {
      latitude: coords.results[0].geometry.location.lat,
      longitude: coords.results[0].geometry.location.lng
    };
  };

  let snapshot;
  const fetchParkingSpots = async () => {
    const db = firebase.firestore();
    const parkingSpotsRef = db.collection('parkingSpots');
    snapshot = await parkingSpotsRef.get().catch(() => {
      console.log('No matching documents.');
    });
    let parkingSpots = [];
    let ctr = 0;
    await snapshot.forEach(doc => {
      parkingSpots.push(doc.data());
      parkingSpots[ctr].id = doc.id;
      ctr++;
    });
    setParkingSpots(parkingSpots);
  };

  useEffect(() => {
    async () => {
      await Location.requestForegroundPermissionsAsync();
      await Location.getCurrentPositionAsync();
    };
    fetchParkingSpots();
  }, []);

  const markerClick = (event, spotId) => {
    let tempSpots = parkingSpots;
    let spot = tempSpots.filter(spot => {
      return spot.id == spotId;
    });
    props.navigation.navigate('Parking Spot', {
      parkingSpot: spot[0],
      user: props.user
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          query={{
            key: GOOGLE_API_KEY,
            language: 'en'
          }}
          onPress={async (data = null) => {
            let coords = await geocode(data.description);
            setRegion({
              center: coords,
              pitch: 0,
              zoom: 13,
              heading: 0,
              altitude: 0
            });
          }}
          onFail={error => console.error(error)}
        />
      </View>
      <View style={styles.key}>
        <Text style={styles.refreshButton} onPress={() => fetchParkingSpots()}>
          Tap to refresh 🔄
        </Text>
        <Text style={styles.keyText}>Key</Text>
        <Text style={styles.keyText}>🔵: Your Spots</Text>
        <Text style={styles.keyText}>🔴: Available Spots</Text>
      </View>
      <MapView
        loadingEnabled={true}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsBuildings
        showsMyLocationButton={true}
        mapType={'mutedStandard'}
        camera={region}
        initialCamera={region}
        onCameraChangeComplete={async region => {
          let tempRegion = {
            center: {
              latitude: Number(region.latitude).toFixed(4),
              longitude: Number(region.longitude).toFixed(4)
            },
            pitch: 0,
            zoom: 13,
            heading: 0,
            altitude: 0
          };
          setRegion(tempRegion);
        }}
      >
        {parkingSpots?.map(spot => {
          return (
            <Marker
              key={spot.id}
              coordinate={{
                latitude: spot.latitude,
                longitude: spot.longitude
              }}
              pinColor={props.user.id == spot.userId ? 'blue' : 'red'}
            >
              <Callout
                key={spot.id}
                onPress={event => markerClick(event, spot.id)}
              >
                <Text>{spot.description}</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}
