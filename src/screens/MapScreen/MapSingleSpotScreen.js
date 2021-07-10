import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function MapSingleSpotScreen (props) {
  // console.log(props);
  return (
    <View>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'navy' }]}>
        <Text style={styles.buttonTitle}>Go Back</Text>
      </TouchableOpacity>
      <Text>Placeholder Page</Text>
    </View>
  );
}
