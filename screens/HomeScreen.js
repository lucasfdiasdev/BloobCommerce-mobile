import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ImgNot from "../assets/images/cat-notebook1.webp";

import Header from "../components/Header";
import Carousel from "../components/Carousel";
import ProductItem from "../components/ProductItem";

import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";

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
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  const navigation = useNavigation();

  const [products, setProducts] = useState([]);

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

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);

  console.log(cart);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />

        <View>
          <Pressable style={styles.containerLocation}>
            <Ionicons name="location-outline" size={24} color="black" />
            <Text style={{ fontSize: 13, fontWeight: "500" }}>
              Deliver to Sujan - Bangalores
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
        </View>

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
            // onChangeValue={onchange}
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
});
