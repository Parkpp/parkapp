import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const convertTo12Hour = time => {
  let hours = Number(time.slice(0, 2));

  let AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  let minutes = time.slice(3, 5);
  let finalTime = hours + ':' + minutes + AmOrPm;
  return finalTime;
};

export default function MapSingleSpotScreen (props) {
  let spot = props.route.params.parkingSpot;
  const user = props.route.params.user;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{spot.description}</Text>
      <Image
        source={{
          uri: spot.imageUrl
        }}
        style={styles.image}
      ></Image>
      <View style={styles.textContainer}>
        <Text style={styles.textLabels}>
          Address:
          <Text style={styles.text}>
            {` ${spot.street} ${spot.city}, ${spot.state} ${spot.postalCode}`}
          </Text>
        </Text>
        <Text style={styles.textLabels}>
          Rate:
          <Text style={styles.text}>{` $${spot.rate}/hr`}</Text>
        </Text>
        <Text style={styles.textLabels}>
          Status:
          <Text style={styles.text}>
            {spot.reserved ? ' Reserved' : ' Available: '}
            {!spot.reserved ? (
              <Text>{`${convertTo12Hour(spot.startTime)} - ${convertTo12Hour(
                spot.endTime
              )}`}</Text>
            ) : (
              <></>
            )}
            <Text></Text>
          </Text>
        </Text>
      </View>
      {spot.userId == user.id || spot.reserved  ? (
        <></>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Reservation', {
              user: user,
              spot: spot
            });
          }}
        >
          <Text style={styles.buttonText}>Reserve?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
