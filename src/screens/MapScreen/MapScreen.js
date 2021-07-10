import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import styles from './styles';
import { firebase, GOOGLE_API_KEY } from '../../firebase/config';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { getDistance } from 'geolib';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

Geocoder.init(GOOGLE_API_KEY, { language: 'en' });

// let db = firebase.firestore();

// const dummyData = [
//   {
//     city: 'Los Angeles',
//     description: 'Test Spot 1',
//     imageUrl:
//       'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
//     latitude: 34.049114,
//     longitude: -118.252324,
//     state: 'CA',
//     street: '478-418 5th St',
//     userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
//     zipcode: 90013
//   },
//   {
//     city: 'Los Angeles',
//     description: 'Test Spot 2',
//     imageUrl:
//       'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
//     latitude: 34.054303,
//     longitude: -118.249590,
//     state: 'CA',
//     street: 'W 2nd St',
//     userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
//     zipcode: 90012
//   },
//   {
//     city: 'Los Angeles',
//     description: 'Test Spot 3',
//     imageUrl:
//       'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
//     latitude: 34.052598,
//     longitude: 118.243934,
//     state: 'CA',
//     street: '131-161 W 1st St',
//     userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
//     zipcode: 90012
//   },
//   {
//     city: 'Los Angeles',
//     description: 'Test Spot 4',
//     imageUrl:
//       'https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg',
//     latitude: 34.044381,
//     longitude: -118.244440,
//     state: 'CA',
//     street: '366-498 E 5th St',
//     userId: 'uyUPmfHSBdR73FVXfG2vWQbTkQm2',
//     zipcode: 90013
//   }
// ];
// dummyData.forEach(doc => {
//   db.collection('parkingSpots').add(doc);
// });

export default function MapScreen (props) {
  const [location, setLocation] = useState(null);
  const [searchlocation, setSearchLocation] = useState(null);
  const [state, setState] = useState('NY');
  const [parkingSpots, setParkingSpots] = useState(null);
  const [region, setRegion] = useState({
    latitude: 40.757952,
    longitude: -73.985572,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(true);

  const geocode = async text => {
    let coords = await Geocoder.from(text);
    return {
      latitude: coords.results[0].geometry.location.lat,
      longitude: coords.results[0].geometry.location.lng
    };
  };
  let snapshot;
  const fetchParkingSpots = async newState => {
    // console.log(newState);
    // console.log('fetch parking spots');
    const db = firebase.firestore();
    const parkingSpotsRef = db
      .collection('parkingSpots')
      .where('state', '==', newState);
    snapshot = await parkingSpotsRef.get().catch(() => {
      console.log('No matching documents.');
    });
    let parkingSpots = [];
    await snapshot.forEach(doc => {
      // console.log(region);
      parkingSpots.push(doc.data());
      // if (
      //   getDistance(
      //     {
      //       latitude: region.latitude,
      //       longitude: region.longitude
      //     },
      //     {
      //       latitude: doc.data().latitude,
      //       longitude: doc.data().longitude
      //     }
      //   ) <= 16093
      // ) {
      //   parkingSpots.push(doc.data());
      // }
    });
    setParkingSpots(parkingSpots);
    // console.log(parkingSpots);
  };

  useEffect(() => {
    async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        let currLoc = await Location.getCurrentPositionAsync();
        setLocation(currLoc);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    fetchParkingSpots(state);
  }, []);

  const markerClick = event => {
    props.navigation.navigate('MapSingleSpotScreen');
  };

  const onRegionChangeComplete = async () => {
    const currState = state;
    // console.log(currState);
    const loc = await Geocoder.from(region.latitude, region.longitude).catch(
      () => {
        console.log('error geocoding');
      }
    );
    let results = loc.results[0].address_components;
    let newState;
    results.forEach(obj => {
      if (obj.short_name.length == 2 && obj.short_name != 'US') {
        newState = obj.short_name;
      }
    });
    // console.log(newState, 'states');
    if (newState != currState) {
      setState(newState);
      fetchParkingSpots(newState);
      // console.log('fetched');
    }
    // console.log('region complete');
    // console.log('loop check');
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
            setSearchLocation(data.description);
            let coords = await geocode(data.description);
            setRegion({
              ...coords,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            });
          }}
          onFail={error => console.error(error)}
        />
      </View>
      <MapView
        loadingEnabled={true}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton={true}
        region={region}
        onRegionChangeComplete={async region => {
          let tempRegion = {
            latitude: Number(region.latitude).toFixed(4),
            longitude: Number(region.longitude).toFixed(4),
            latitudeDelta: Number(region.latitudeDelta),
            longitudeDelta: Number(region.longitudeDelta)
          };
          setRegion(tempRegion);
          onRegionChangeComplete();
        }}
      >
        {parkingSpots &&
          parkingSpots.map(spot => {
            return (
              <Marker
                key={spot.description}
                coordinate={{
                  latitude: spot.latitude,
                  longitude: spot.longitude
                }}
                onCalloutPress={event => markerClick(event)}
              >
                <Callout>
                  <TouchableHighlight>
                    <View>
                      <Text>{spot.description}</Text>
                    </View>
                  </TouchableHighlight>
                </Callout>
              </Marker>
            );
          })}
      </MapView>
    </SafeAreaView>
  );
}
