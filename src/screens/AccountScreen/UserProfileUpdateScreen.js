import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../firebase/config";
import styles from "./styles";

export function UserProfileUpdateScreen(props) {
  const { user } = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // const update = await userRef.update({reference value: new value})

  const onSubmitPress = async () => {
    const userRef = firebase.firestore().collection("users").doc(user.id);
    const data = {
      fullName: fullName,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
    };
    await userRef.update(data);
    props.navigation.navigate("User Profile", { user: data });

    // const fullNameUpdate = await userRef.update({fullName: fullName})
    // const usernameUpdate = await userRef.update({username: username})
    // const emailUpdate = await userRef.update({email: email})
    // const phoneNumberUpdate = await userRef.update({phoneNumber: phoneNumber})
  };

  return (
    <View>
      {/* <KeyboardAwareScrollView> */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setFullName(text)}
        defaultValue={user.fullName}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        editable={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setUsername(text)}
        defaultValue={user.username}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        defaultValue={user.email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setPhoneNumber(Number(text))}
        defaultValue={user.phoneNumber.toString()}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        keyboardType="numeric"
        maxLength={10}
      />
      <TouchableOpacity style={styles.button} onPress={() => onSubmitPress()}>
        <Text style={styles.buttonTitle}>Submit</Text>
      </TouchableOpacity>
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
}
