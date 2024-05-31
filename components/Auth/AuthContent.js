import { useState } from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("SignupScreen");
    } else {
      navigation.replace("LoginScreen");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <View>
        <Image
          style={{ width: 150, height: 100, marginLeft: 80, marginTop: 80 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.logIntxt}>Log In to your Account</Text>
      </View>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />

      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Don't have an account? Sign Up" : "Log in instead"}
        </FlatButton>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text>Keep logged in</Text>
        <Text style={{ color: "#007FFF", fontWeight: "500" }}>
          forgot your password
        </Text>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    // marginTop: 64,
    // marginHorizontal: 32,
    padding: 16,
    //borderRadius: 8,
    backgroundColor: "white",
    //elevation: 2,
    //shadowColor: "black",
    //shadowOffset: { width: 1, height: 1 },
    //shadowOpacity: 0.35,
    //shadowRadius: 4,
    height: "100%",
  },
  buttons: {
    marginTop: 8,
  },
  logIntxt: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },
});
