import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../firebase/config";
import styles from "./styles";

export function UserProfileUpdateScreen(props) {
  const user = props.route.params.user[0];
  //can get user info from firebase.firestore().auth.user.uid
  const [fullName, setFullName] = useState(user.fullName);

  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const onSubmitPress = async () => {
    const userRef = firebase.firestore().collection("users").doc(user.id);
    const data = {
      fullName: fullName,
      username: username,
      phoneNumber: phoneNumber,
    };
    await userRef.update(data);
    Alert.alert("Your profile has been successfully updated!");

    props.navigation.navigate("User Profile");

    // const fullNameUpdate = await userRef.update({fullName: fullName})
    // const usernameUpdate = await userRef.update({username: username})
    // const emailUpdate = await userRef.update({email: email})
    // const phoneNumberUpdate = await userRef.update({phoneNumber: phoneNumber})
  };

  return (
    <View>
      <KeyboardAwareScrollView>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          defaultValue={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          editable={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setUsername(text)}
          defaultValue={username}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {/* <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        defaultValue={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        keyboardType="email-address"
      /> */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPhoneNumber(Number(text))}
          defaultValue={phoneNumber.toString()}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={10}
        />
        <TouchableOpacity style={styles.button} onPress={() => onSubmitPress()}>
          <Text style={styles.buttonTitle}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
