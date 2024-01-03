import axios from "axios";
import { 
  useState, 
  useEffect, 
  useContext, 
  useCallback
} from "react";

import { 
  Text, 
  View, 
  Pressable, 
  StyleSheet, 
  ScrollView 
} from "react-native";

import Header from "../components/Header";
import { UserType } from "../context/UserContext";

import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const AddLocationScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("Error", error);
    }
  };
  console.log("Addresses", addresses);

  // refresh the addresses when the component comes to the focus is basically when we navigate back  
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  )

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <Header />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#d0d0d0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        {/* all the added adresses */}
        <Pressable>
          {addresses?.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#d0d0d0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
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

              <View style={{
                flexDirection: 'row',
                alignItems: "center",
                gap: 10,
                marginTop: 10
              }}>
                <Pressable
                  style={{
                    backgroundColor: '#f5f5f5',
                    paddingHorizontal: 10,paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#d0d0d0'
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: '#f5f5f5',
                    paddingHorizontal: 10,paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#d0d0d0'
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: '#f5f5f5',
                    paddingHorizontal: 10,paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#d0d0d0'
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>

              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddLocationScreen;

const styles = StyleSheet.create({});
