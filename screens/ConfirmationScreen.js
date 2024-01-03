import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { UserType } from "../context/UserContext";

import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  useEffect(() => {
    fetchAddresses();
  });

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(addresses, "Addresses");

  const [selectedAddresses, setSelectedAddresses] = useState("");
  const [options, setOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

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
            <View
              key={index}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {" "}
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

          <Pressable>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "#d0d0d0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
              >
                {selectedAddresses && selectedAddresses._id === item?._id ? (
                  <FontAwesome5 name="dot-circle" size={24} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedAddresses(item)}
                    name="circle"
                    size={24}
                    color="gray"
                  />
                )}

                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.houseNo}, {item?.landmark}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {item?.street}, {item?.postalCode}
                  </Text>
                  <Text>India, Bangalore</Text>
                  <Text>Phone No: {item?.mobileNo}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 10,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "#f5f5f5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#d0d0d0",
                      }}
                    >
                      <Text>Edit</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#f5f5f5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#d0d0d0",
                      }}
                    >
                      <Text>Remove</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#f5f5f5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 5,
                        borderWidth: 0.9,
                        borderColor: "#d0d0d0",
                      }}
                    >
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>
                  <View>
                    {selectedAddresses &&
                      selectedAddresses._id === item?._id && (
                        <Pressable
                          onPress={() => setCurrentStep(1)}
                          style={{
                            backgroundColor: "#008397",
                            padding: 10,
                            borderRadius: 7,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                          }}
                        >
                          <Text style={{ textAlign: "center", color: "white" }}>
                            Deliver to this Address
                          </Text>
                        </Pressable>
                      )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Choose your Delivery Options
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            {options ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setOptions(!options)}
                name="circle"
                size={24}
                color="gray"
              />
            )}
            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Tomorrow by 10pm
              </Text>{" "}
              - FREE delivery with your prime membership
            </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue shipping</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select your payment Method
          </Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={24}
                color="gray"
              />
            )}
            <Text>Cash on Delivery</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("card")}
                name="circle"
                size={24}
                color="gray"
              />
            )}
            <Text>UPI / Credit or debit card </Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "boleto" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("boleto")}
                name="circle"
                size={24}
                color="gray"
              />
            )}
            <Text>Boleto</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "pix" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("card")}
                name="circle"
                size={24}
                color="gray"
              />
            )}
            <Text>PIX</Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue shipping</Text>
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
              backgroundColor: "white",
              padding: 8,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Turn on auto deliveries
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
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Shipping to {selectedAddresses?.name}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray'}}>Delivery</Text>
              <Text style={{ color: 'gray', fontSize: 16}}>R$ {total}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray'}}>Items</Text>
              <Text style={{ color: 'gray', fontSize: 16}}>R$ {total}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray'}}>Delivery</Text>
              <Text style={{ color: 'gray', fontSize: 16}}>R$ 0</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray'}}>Order Total</Text>
              <Text style={{ color: '#c60c30', fontSize: 17, fontWeight: 'bold'}}>R$ {total}</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10
            }}
          >
            <Text style={{ fontSize: 16, color: 'gray'}}>Pay with</Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 7 }}>Pay on delivery</Text>

          <Pressable
            onPress={() => setCurrentStep(4)}
            style={{
              backgroundColor: "#ffc72c",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue shipping</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
