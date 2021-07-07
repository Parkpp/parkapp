import React from "react";
import { firebase } from "../../firebase/config";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { AccountScreen } from "./AccountScreen";
import { UserProfileScreen } from "./UserProfileScreen";

const Account = createStackNavigator();

export default function App(props) {
  const { user } = props;
  return (
    <NavigationContainer independent={true}>
      <Account.Navigator>
        <Account.Screen name="Account" component={AccountScreen} />
        <Account.Screen name="User Profile">
          {(props) => <UserProfileScreen {...props} user={user} />}
        </Account.Screen>
      </Account.Navigator>
    </NavigationContainer>
  );
}
