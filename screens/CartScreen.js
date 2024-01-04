import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { 
  cleanCart,
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity, 
} from "../redux/CartReducer";

import Header from "../components/Header";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  // Cart Reducer functions 
  const plusQuantity = (item) => {
    dispatch(incrementQuantity(item));
  }

  const minusQuantity = (item) => {
    dispatch(decrementQuantity(item));
  }

  const removeQuantity = (item) => {
    dispatch(removeFromCart(item))
  }

  const deleteItem = (item) => {
    dispatch(cleanCart(item));
  }

  const isCartEmpty = cart.length === 0;

  return (
    <View
      style={{
        marginTop: 55,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Header />
      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total} </Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI Details Available</Text>


      {isCartEmpty ? (
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{
            backgroundColor: "#ffc72c",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text>Continue comprando</Text>
        </Pressable>
        
      ) : (
        <Pressable
          onPress={() => navigation.navigate('Confirmation')}
          style={{
            backgroundColor: "#ffc72c",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text>Proceed to buy ({cart.length}) items</Text>
        </Pressable>
      )}

      <Text
        style={{
          height: 1,
          borderColor: "#d0d0d0",
          borderWidth: 1,
          marginTop: 16,
        }}
      />

      <ScrollView>
        <View style={{ marginHorizontal: 10 }}>
          {cart?.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderBottomColor: "#f0f0f0",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
              }}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Image
                    source={{ uri: item?.image }}
                    style={{
                      width: 140,
                      height: 140,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View>
                  <Text
                    numberOfLines={3}
                    style={{
                      width: 150,
                      marginTop: 10,
                    }}
                  >
                    {item?.title}
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                  >
                    R$ {item?.price}
                  </Text>
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={{
                      uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                    }}
                  />
                  <Text style={{ color: "green" }}>In Stock</Text>
                  
                </View>
              </Pressable>

              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  marginTop: 15
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 7,
                  }}
                >
                  {item?.quantity > 1 ? (
                    <Pressable
                      onPress={() => minusQuantity(item)}
                      style={{
                        backgroundColor: "#d8d8d8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <AntDesign name="minus" size={24} color="black" />
                    </Pressable>

                  ) : (
                    <Pressable
                      onPress={() => removeQuantity(item)}
                      style={{
                        backgroundColor: "#d8d8d8",
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}
                    >
                      <AntDesign name="minus" size={24} color="black" />
                    </Pressable>
                    )
                  }

                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                    }}
                  >
                    <Text>{item?.quantity}</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => plusQuantity(item)}
                    style={{
                      backgroundColor: "#d8d8d8",
                      padding: 7,
                      borderTopRightRadius: 6,
                      borderBottomRightRadius: 6,
                    }}
                  >
                    <AntDesign name="plus" size={24} color="black" />
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => removeQuantity(item)}
                  style={{  
                    backgroundColor: 'white',
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 5,
                    borderColor: '#c0c0c0',
                    borderWidth: 0.6
                  }}
                >
                  <Text>
                    Delete
                  </Text>
                </Pressable>

              </Pressable>

              <Pressable
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  gap: 10, 
                  marginBottom: 15 
                }}
              >
                <Pressable style={styles.containerButton}>
                  <Text>Save For Later</Text>
                </Pressable>

                <Pressable style={styles.containerButton}>
                  <Text>See More Like This</Text>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#c0c0c0',
    borderWidth: 0.6
  }
});
