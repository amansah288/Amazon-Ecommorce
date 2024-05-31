import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PersoneScreen = () => {
  return (
    <View style={styles.Container}>
      <Text>PersoneScreen</Text>
    </View>
  );
};

export default PersoneScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
