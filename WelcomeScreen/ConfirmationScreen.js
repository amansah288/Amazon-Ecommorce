import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import OrderScreen from "./OrderScreen";
import { cleanCart, removeFromCart } from "../redux/CartReducer";
import { useDispatch } from "react-redux";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@env";
import RazorpayCheckout from "react-native-razorpay";

const ConfirmationScreen = () => {
  let razorpayKeyId = RAZORPAY_KEY_ID;
  let razorpayKeySecret = RAZORPAY_KEY_SECRET;

  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Option" },
    { title: "Payment", content: "Peyment Details" },
    { title: "place Order", content: "Order Summary" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddress] = useState([]);
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  function OrderPlacer() {
    navigation.navigate("Order");
    dispatch(cleanCart());
    console.log("order created succesfully");
  }

  const amount = 100;

  const pay = () => {
    const options = {
      description: "Adding to wallet",
      currency: "INR",
      name: "Amazon",
      key: "rzp_test_E3GWYimxN7YMk8",
      amount: amount * 100,
      name: "My Customer 1",
      order_id: "",
      prefill: {
        email: "amansah288@gmail.com",
        contact: "9471485083",
        name: "aman kumar sah",
      },
      theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, backgroundColor: "green", height: 2 },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15,
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select Delivery Address
          </Text>

          {/* button */}
          <View style={{ marginTop: 20, padding: 10 }}>
            <Pressable
              onPress={() => setCurrentStep(1)}
              style={{
                backgroundColor: "#008397",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Deliver to this Address
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Choose your Delivery Option
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {option ? (
              <FontAwesome6
                //onPress={() => setOption(option)}
                name="circle-dot"
                size={20}
                color="gray"
              />
            ) : (
              <Entypo
                onPress={() => setOption(!option)}
                name="circle"
                size={20}
                color="black"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Tommorow by 10 pm
              </Text>{" "}
              - FREE delivery with your Prime membership
            </Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select your payment Methode
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 12,
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome6
                //onPress={() => setOption(option)}
                name="circle-dot"
                size={20}
                color="gray"
              />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={20}
                color="black"
              />
            )}

            <Text>Cash on Delivery</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 12,
            }}
          >
            {selectedOption === "card" ? (
              <FontAwesome6
                //onPress={() => setOption(option)}
                name="circle-dot"
                size={20}
                color="gray"
              />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption("card");
                  Alert.alert("UPI/Debit card", "Pay Online", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel is pressed"),
                    },
                    {
                      text: "OK",
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="black"
              />
            )}

            <Text>UPI / Credit or Debit Card</Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && selectedOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              padding: 8,
              backgroundColor: "white",
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Tern on auto deliveries
              </Text>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Shipping to {} sneha</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Item
              </Text>
              <Text style={{ fontSize: 16, color: "gray" }}>₹ {total}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                Delivery
              </Text>
              <Text style={{ fontSize: 16, color: "gray" }}>₹0</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Order Total
              </Text>
              <Text
                style={{ fontSize: 17, color: "#C60C30", fontWeight: "bold" }}
              >
                ₹ {total}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              padding: 8,
              borderColor: "#D0D0D0",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>
            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              Pay on delivery (Cash)
            </Text>
          </View>

          <Pressable
            onPress={OrderPlacer}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
