import { StatusBar } from 'expo-status-bar';
import { createContext, useContext, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import auth from "./util/auth";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import WelcomeScreen from "./screen/WelcomScreen";
import { Provider } from "react-redux";
import store from "./store";
import { ModalPortal } from "react-native-modals";

export const contextApi = createContext();
const stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="LoginScreen" component={LoginScreen} />
      <stack.Screen name="SignupScreen" component={SignupScreen} />
    </stack.Navigator>
  );
}

// D

// Authentication Checking

function Authentication() {
  const [isAuth, setIsAuth] = useState(false);
  const authCtx = useContext(AuthContext);
  if (authCtx.isAuthenticated) {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <WelcomeScreen />
          <ModalPortal />
        </Provider>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }
}

export default function App() {
  return (
    <AuthContextProvider>
      <Authentication />
    </AuthContextProvider>
  );
}
