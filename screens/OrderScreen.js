import { useEffect } from 'react';
import { 
  Text, 
  View,
  StyleSheet, 
  SafeAreaView, 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons'; 

const OrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 1300);

  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Order place</Text>
        <AntDesign name="checkcircleo" size={24} color="green" />
        <Text>Confirmation order</Text>
      </View>
    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})