import React, { useState } from "react";
import { firebase } from "../../firebase/config";
import { Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import styles from "./styles";

export function UpdateUserCredentialScreen({ navigation }) {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  let user = firebase.auth().currentUser;

  console.log("What is Auth user--->", user.uid);

  const reauthenticate = (currentPassword) => {
    let cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const onChangeEmailPress = async () => {
    try {
      const userRef = firebase.firestore().collection("users").doc(user.uid);
      // reauthenticate(password);
      //is there an error code for auth/requires-recent-login, so that if that occurs, require reauthentication with promptForCredentials()
      await user.updateEmail(newEmail);
      await userRef.update({ email: newEmail });
      Alert.alert("Email was successfully updated!");
      navigation.navigate("User Profile");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onChangePasswordPress = async () => {
    try {
      reauthenticate(password);
      await user.updatePassword(newPassword);
      Alert.alert("Password was successfully changed!");
      navigation.navigate("User Profile");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="New Email"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => {
          setNewEmail(text);
        }}
        defaultValue={user.email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        keyboardType="email-address"
        editable={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onChangeEmailPress()}
      >
        <Text style={styles.buttonTitle}>Change Email</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor="#aaaaaa"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#aaaaaa"
        secureTextEntry={true}
        onChangeText={(text) => {
          setNewPassword(text);
        }}
        value={newPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onChangePasswordPress()}
      >
        <Text style={styles.buttonTitle}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
}
