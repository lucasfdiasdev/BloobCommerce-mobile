import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddressScreen from '../screens/AddressScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddLocationScreen from '../screens/AddLocationScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const StackNavigation = () => {

  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: {colo: '#008e97'},
            headerShown: false,
            tabBarIcon: ({ focused}) => 
            focused ? (
              <Entypo name="home" size={24} color="#008e97" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            )
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: {colo: '#008e97'},
            headerShown: false,
            tabBarIcon: ({ focused}) => 
            focused ? (
              <Ionicons name="person" size={24} color="#008e97" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            )
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: {colo: '#008e97'},
            headerShown: false,
            tabBarIcon: ({ focused}) => 
            focused ? (
              <AntDesign name="shoppingcart" size={24} color="#008e97" />
            ) : (
              <AntDesign name="shoppingcart" size={24} color="black" />

            )
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name="Main" 
          component={BottomTabs} 
          options={{ headerShown: false}}
        />

        <Stack.Screen 
          name="Info" 
          component={ProductInfoScreen} 
          options={{ headerShown: false}}
        />

        <Stack.Screen 
          name="Address"
          component={AddLocationScreen} 
          options={{ headerShown: false}}
        />

        <Stack.Screen 
          name="Add"
          component={AddressScreen} 
          options={{ headerShown: false}}
        />

        <Stack.Screen 
          name="Confirmation"
          component={ConfirmationScreen} 
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation;