import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Platform
} from 'react-native';
import styles from './styles';

export default function InfoScreen (props) {
  return (
    <View>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle='dark-content' translucent={true} />
      ) : (
        <StatusBar barStyle='light-content' translucent={true} />
      )}
      <Text style={styles.title}>Welcome to Park App</Text>
      <Image
        style={styles.image}
        source={require('../../../assets/CarinGarage.png')}
      />
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          Park app is a platform where users can post their available parking
          spots for other users to rent for an agreed upon duration and rate.
          Just search for a location you would like to rent a parking spot at
          and all of the available spots will appear on the map as red markers.
          If you choose to provide any parking spots to the app, your spots will
          appear in blue!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          });
        }}
      >
        <Text style={styles.confirmButtonText}>Enter Here</Text>
      </TouchableOpacity>
    </View>
  );
}
