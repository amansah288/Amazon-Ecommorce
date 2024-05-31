import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../WelcomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const OrderScreen = () => {
  function FinalView() {
    const navigation = useNavigation();
    useEffect(() => {
      setTimeout(() => {
        navigation.replace("HomeScreen");
      }, 1300);
    }, []);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            marginTop: 40,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Image
            style={{ marginLeft: 90 }}
            source={require("../assets/truesign.png")}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 110 }}>
            Order Confirm
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FinalView" component={FinalView} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
