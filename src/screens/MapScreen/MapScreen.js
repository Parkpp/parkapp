import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import styles from './styles';
import { firebase, GOOGLE_API_KEY } from '../../firebase/config';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { LogBox } from 'react-native';
import { dummyData } from '../../../parkingSeed';
// const db = firebase.firestore();
// dummyData.forEach(doc => {
//   db.collection('parkingSpots').add(doc);
// });

//LogBox.ignoreAllLogs(true);

Geocoder.init(GOOGLE_API_KEY, { language: 'en' });

export default function MapScreen (props) {
  const [location, setLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [parkingSpots, setParkingSpots] = useState(null);
  const [region, setRegion] = useState({
    latitude: 40.757952,
    longitude: -73.985572,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
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
      let { status } = await Location.requestForegroundPermissionsAsync();
      let currLoc = await Location.getCurrentPositionAsync();
      setLocation(currLoc);
    };
    fetchParkingSpots(state);
  }, []);

  const markerClick = (event, spotDescription) => {
    let spot;
    for (let i = 0; i < parkingSpots.length; i++) {
      if (parkingSpots[i].description == spotDescription) {
        spot = parkingSpots[i];
      }
    }
    props.navigation.navigate('MapSingleSpotScreen', {
      parkingSpot: spot
    });
  };

  // const onRegionChangeComplete = async () => {
  //   const currState = state;
  //   const loc = await Geocoder.from(region.latitude, region.longitude).catch(
  //     () => {
  //       console.log('error geocoding');
  //     }
  //   );
  //   let results = loc.results[0].address_components;
  //   let newState;
  //   results.forEach(obj => {
  //     if (obj.short_name.length == 2 && obj.short_name != 'US') {
  //       newState = obj.short_name;
  //     }
  //   });
  //   if (newState != currState) {
  //     setState(newState);
  //     fetchParkingSpots(newState);
  //   }
  // };

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
            let coords = await geocode(searchLocation);
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
          // onRegionChangeComplete();
        }}
      >
        {parkingSpots &&
          parkingSpots.map(spot => {
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
                  onPress={event => markerClick(event, spot.description)}
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
