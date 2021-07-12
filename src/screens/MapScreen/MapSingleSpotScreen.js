import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function MapSingleSpotScreen (props) {
  let spot = props.route.params.parkingSpot;
  const img = spot.imageUrl;
  return (
    <View style={styles.container}>
      <Text>{spot.description}</Text>
      <Image
        source={{
          uri: spot.imageUrl
        }}
        style={styles.image}
      ></Image>
      <Text>
        {`${spot.street} ${spot.city}, ${spot.state} ${spot.zipcode}`}
      </Text>
      <Text>Rate placeholder</Text>
      <Text>Availability Placeholder?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate('ReservationScreen');
        }}
      >
        <Text>Would you like to reserve this spot?</Text>
      </TouchableOpacity>
    </View>
  );
}
