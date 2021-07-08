import React, { useEffect, useState } from "react";
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
  StatusBar,
} from "react-native";
import styles from "./styles";
import { firebase, GOOGLE_API_KEY } from "../../firebase/config";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";

Geocoder.init(GOOGLE_API_KEY, { language: "en" });

const dummyData = [
  {
    city: "New York City",
    description: "Test Spot 1",
    imageUrl:
      "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
    latitude: 40.757749,
    longitude: -73.985096,
    State: "NY",
    street: "198-116 W 45th St",
    userId: "uyUPmfHSBdR73FVXfG2vWQbTkQm2",
    zipcode: 10036,
  },
  {
    city: "New York City",
    description: "Test Spot 2",
    imageUrl:
      "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
    latitude: 40.756629,
    longitude: -73.98842,
    State: "NY",
    street: "298-200 W 42nd St",
    userId: "uyUPmfHSBdR73FVXfG2vWQbTkQm2",
    zipcode: 10036,
  },
  {
    city: "New York City",
    description: "Test Spot 3",
    imageUrl:
      "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
    latitude: 40.754646,
    longitude: -73.987941,
    State: "NY",
    street: "558-540 Fashion Ave",
    userId: "uyUPmfHSBdR73FVXfG2vWQbTkQm2",
    zipcode: 10018,
  },
  {
    city: "New York City",
    description: "Test Spot 4",
    imageUrl:
      "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
    latitude: 40.76078,
    longitude: -73.988459,
    State: "NY",
    street: "316 W 47th St",
    userId: "uyUPmfHSBdR73FVXfG2vWQbTkQm2",
    zipcode: 10036,
  },
];

export const geocode = async (text) => {
  let coords = await Geocoder.from(text);
  return {
    latitude: coords.results[0].geometry.location.lat,
    longitude: coords.results[0].geometry.location.lng,
  };
};

export default function MapScreen(props) {
  const [location, setLocation] = useState(null);
  const [searchlocation, setSearchLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 40.757952,
    longitude: -73.985572,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(true);

  // const userID = props.extraData.id;

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        let currLoc = await Location.getCurrentPositionAsync();
        setLocation(currLoc);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    })();
  }, []);
  // console.log(location);
  // const markerClick = event => {
  //   props.navigation.navigate('');
  // };

  // const searchForLocation = async text => {
  //   const response = await axios.get(``, {
  //     headers: { Authorization: MAPBOX_ACCESS_TOKEN }
  //   });

  // console.log(response, 'response');
  // }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {/* <View style={styles.searchBar}>
        <TextInput
          style={styles.textInputSearchBar}
          onChangeText={text => setText(text)}
          onSubmitEditing={text => {
            searchForLocation(text);
          }}
          placeholder={'Search'}
          placeholderTextColor={'#666'}
        />
      </View> */}
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          onPress={async (data, details = null) => {
            setSearchLocation(data.description);
            let coords = await geocode(data.description);
            setRegion({
              ...coords,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          onFail={(error) => console.error(error)}
        />
      </View>
      <MapView
        loadingEnabled={true}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton={true}
        region={region}
      >
        {dummyData.map((spot, idx) => {
          return (
            <Marker
              key={idx}
              coordinate={{
                latitude: spot.latitude,
                longitude: spot.longitude,
              }}
            >
              <Callout>
                <TouchableHighlight onPress={() => markerClick()}>
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
