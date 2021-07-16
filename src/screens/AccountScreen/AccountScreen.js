import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./styles";
import { firebase } from "../../firebase/config";

const Stack = createStackNavigator();

export function AccountScreen(props) {
  const onSignOutPress = () => {
    firebase.auth().signOut();
  };

  return (
    <>
    
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "stretch",
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => props.navigation.navigate("User Profile")}
        >
          <Text style={styles.accountButtonTitle}>Profile </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => props.navigation.navigate("Vehicle Information")}
        >
          <Text style={styles.accountButtonTitle}>Vehicle </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => onSignOutPress()}
        >
          <Text style={styles.accountButtonTitle}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
