import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../firebase/config";
import styles from "./styles";

export function UpdateVehicleScreen(props) {
  const vehicle = props.route.params.vehicle[0];
  const [vehicleMake, setVehicleMake] = useState(vehicle.make);
  const [vehicleModel, setVehicleModel] = useState(vehicle.model);
  const [vehicleYear, setVehicleYear] = useState(vehicle.year);
  const [licensePlate, setLicensePlate] = useState(vehicle.licensePlate);
  const [vehicleColor, setVehicleColor] = useState(vehicle.color);

  const onSubmitPress = async () => {
    const vehicleRef = firebase
      .firestore()
      .collection("vehicles")
      .doc(vehicle.id);
    //Double check userId in database
    const data = {
      make: vehicleMake,
      model: vehicleModel,
      year: vehicleYear,
      licensePlate: licensePlate,
      color: vehicleColor,
    };

    console.log(vehicleRef);
    await vehicleRef.update(data);
    Alert.alert("Your vehicle information has been successfully updated!");

    props.navigation.navigate("User Profile");
  };

  return (
    <View>
      <KeyboardAwareScrollView>
        <TextInput
          style={styles.input}
          placeholder="Brand"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setVehicleMake(text)}
          defaultValue={vehicle.make}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          editable={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setVehicleModel(text)}
          defaultValue={vehicle.model}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setVehicleYear(Number(text))}
          defaultValue={vehicle.year.toString()}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={4}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Color"
          onChangeText={(text) => setVehicleColor(text)}
          defaultValue={vehicle.color}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="License Plate"
          onChangeText={(text) => setLicensePlate(text)}
          defaultValue={vehicle.licensePlate}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onSubmitPress()}>
          <Text style={styles.buttonTitle}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
