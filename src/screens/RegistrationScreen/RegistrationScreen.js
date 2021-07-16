import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { Alert } from "react-native";

export default function RegistrationScreen(props) {
  //User Info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //Vehicle Information
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");

  const onFooterLinkPress = () => {
    props.navigation.navigate("Login");
  };

  const onRegisterPress = async () => {

  
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

   

    try {
      let credentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("credentials-->", credentials.user);
     

      let uid = credentials.user.uid;

      const data = {
        id: uid,
        email,
        fullName,
        username,
        phoneNumber,
        isProvider: false,
      };
      const vehicleData = {
        userId: uid,
        make: vehicleMake,
        model: vehicleModel,
        year: vehicleYear,
        licensePlate: licensePlate,
        color: vehicleColor,
        createdAt: timestamp,
      };
     
      const vehicleRef = firebase.firestore().collection("vehicles");
      let vehicle = vehicleRef.doc();
      vehicleData["id"] = vehicle.id;
      await vehicle.set(vehicleData);
      const usersRef = firebase.firestore().collection("users");
      await usersRef.doc(uid).set(data);
    } catch (error) {

     // alert(error)
    }


  
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/CarinGarageClear.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setUsername(text)}
          value={username}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <Text>Vehicle Information</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Brand"
          onChangeText={(text) => setVehicleMake(text)}
          value={vehicleMake}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Model"
          onChangeText={(text) => setVehicleModel(text)}
          value={vehicleModel}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Year"
          onChangeText={(text) => setVehicleYear(text)}
          value={vehicleYear}
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
          value={vehicleColor}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="License Plate"
          onChangeText={(text) => setLicensePlate(text)}
          value={licensePlate}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
