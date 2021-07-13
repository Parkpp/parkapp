import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function MapSingleSpotScreen (props) {
  let spot = props.route.params.parkingSpot;
  const user = props.route.params.user;
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
        {`${spot.street} ${spot.city}, ${spot.state} ${spot.postalCode}`}
      </Text>
      <Text>{`$${spot.rate}/hr`}</Text>
      <Text>{spot.reserved ? 'Reserved' : 'Available'}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate('ReservationScreen', {
            user: user,
            spot: spot
          });
        }}
      >
        <Text>Would you like to reserve this spot?</Text>
      </TouchableOpacity>
    </View>
  );
}
