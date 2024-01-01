import axios from "axios";
import { 
  useState, 
  useEffect, 
  useContext, 
  useCallback 
} from "react";

import {
  View,
  Text,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { 
  Entypo, 
  Ionicons, 
  AntDesign, 
  MaterialIcons 
} from "@expo/vector-icons";

import ImgNot from "../assets/images/cat-notebook1.webp";

import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { UserType } from "../context/UserContext";
import ProductItem from "../components/ProductItem";

import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: ImgNot,
      name: "Home",
    },
    {
      id: "1",
      image: ImgNot,
      name: "Home",
    },
    {
      id: "2",
      image: ImgNot,
      name: "Home",
    },
    {
      id: "3",
      image: ImgNot,
      name: "Home",
    },
    {
      id: "4",
      image: ImgNot,
      name: "Home",
    },
    {
      id: "5",
      image: ImgNot,
      name: "Home",
    },
    {
      id: "6",
      image: ImgNot,
      name: "Home",
    },
    {
      id: "7",
      image: ImgNot,
      name: "Home",
    },
    {
      id: "8",
      image: ImgNot,
      name: "Home",
    },
  ];

  const deals = [
    {
      id: "0",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image: ImgNot,
      carouselImages: [ImgNot, ImgNot, ImgNot, ImgNot],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "1",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image: ImgNot,
      carouselImages: [ImgNot, ImgNot, ImgNot, ImgNot],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "2",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image: ImgNot,
      carouselImages: [ImgNot, ImgNot, ImgNot, ImgNot],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "3",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image: ImgNot,
      carouselImages: [ImgNot, ImgNot, ImgNot, ImgNot],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
  ];

  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC,",
      offer: "33% off",
      oldPrice: 7500,
      price: 4500,
      image: ImgNot,
      carouselImages: [ImgNot, ImgNot, ImgNot, ImgNot],
      color: "Azul Ocean",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC,",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image: ImgNot,
      carouselImages: [ImgNot, ImgNot, ImgNot, ImgNot],
      color: "Azul Ocean",
      size: "Normal",
    },
    {
      id: "2",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC,",
      offer: "45% off",
      oldPrice: 7500,
      price: 4500,
      image: ImgNot,
      carouselImages: [ImgNot, ImgNot, ImgNot, ImgNot],
      color: "Azul Ocean",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC,",
      offer: "76% off",
      oldPrice: 7500,
      price: 4500,
      image: ImgNot,
      carouselImages: [ImgNot, ImgNot, ImgNot, ImgNot],
      color: "Azul Ocean",
      size: "Normal",
    },
  ];

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "men's clothing", value: "men's clothing" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  const [ selectedAddresses, setSelectedAddresses] = useState('');

  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  console.log(userId);

  // API Fake Store
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);

  // get addresses userId
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

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

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Header />

          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.containerLocation}>
              <Ionicons name="location-outline" size={22} color="black" />
              <Pressable>
                {selectedAddresses ? (
                  <Text>
                    Deliver to {selectedAddresses?.name} - {selectedAddresses?.street}
                  </Text>
                ) : (
                  <Text>
                    Adicione um endereço de entrega
                  </Text>
                )}
              </Pressable>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={22}
                color="black"
              />
            </View>
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Carousel />

          <Text style={styles.titleSection}>Ternding deals of the week</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 200, height: 200, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text style={styles.borderSection} />

          <Text style={styles.titleSection}>Today's Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View style={styles.buttonOffer}>
                  <Text style={styles.titleOffer}>Upto {item?.offer}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.borderSection} />
          <View
            style={{
              marginHorizontal: 10,
              width: "45%",
              marginTop: 20,
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#b7b7b7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Choose category"
              placeholderStyle={styles.placeholderStyle}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem key={index} item={item} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your location
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabity and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addressess */}
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedAddresses(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: '#d0d0d0',
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor: selectedAddresses === item ? '#fbceb1' : 'white'
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
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: 'center'}}
                >
                  {item?.houseNo}, {item?.landmark}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: 'center'}}
                >
                  {item?.street}, {item?.postalCode}
                </Text>
              </Pressable>
            ))}


            <Pressable
              onPress={() => {
                navigation.navigate("Address");
                setModalVisible(false);
              }}
              style={styles.buttonModal}
            >
              <Text style={styles.textBtnModal}>
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use my current location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: "white",
  },
  containerLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    backgroundColor: "#AFEEEE",
  },
  titleSection: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  borderSection: {
    height: 1,
    borderColor: "#d0d0d0",
    borderWidth: 2,
    marginTop: 15,
  },
  buttonOffer: {
    backgroundColor: "#e31837",
    paddingVertical: 5,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,
  },
  titleOffer: {
    textAlign: "center",
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  buttonModal: {
    width: 140,
    height: 140,
    borderColor: "#d0d0d0",
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtnModal: {
    textAlign: "center",
    color: "#0066b2",
    fontWeight: "500",
  },
});
