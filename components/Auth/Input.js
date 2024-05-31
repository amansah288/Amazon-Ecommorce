import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

function Input({
  keyboardType,
  value,
  secure,
  label,
  onUpdateValue,
  isInvalid,
  name,
  size,
  color,
}) {
  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.InnerContainer}>
        <MaterialIcons name={name} size={size} color={color} />
        <TextInput
          style={[styles.input, isInvalid && styles.inputInvalid]}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          placeholder={label}
        />
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "#D0D0D0",
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
  InnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#D0D0D0",
    paddingVertical: 5,
    borderRadius: 5,
    // marginTop: 30,
    padding: 10,
  },
});
