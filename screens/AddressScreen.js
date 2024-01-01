import axios from 'axios';

import { 
  useContext, 
  useEffect, 
  useState 
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { jwtDecode } from 'jwt-decode';

import { UserType } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressScreen = () => {
  
  const [ name, setName ] = useState('');
  const [ street, setStreet ] = useState('');
  const [ houseNo, setHouseNo ] = useState('');
  const [ mobileNo, setMobileNo ] = useState('');
  const [ landmark, setLandmark ] = useState('');
  const [ postalCode, setPostalCode ] = useState('');

  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken')
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

    }
     fetchUser();

  }, []);

  console.log(userId);

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      houseNo,
      street,
      landmark,
      postalCode
    };

    axios
      .post('http://localhost:8000/addresses', {userId, address})
      .then((response) => {
        Alert.alert('Success', 'Addresses added successfully');
        setName('');
        setStreet('');
        setHouseNo('');
        setLandmark('');
        setMobileNo('');
        setPostalCode('');

        setTimeout(() => {
          navigation.goBack();
          
        }, 500)
      }).catch((error) => {
        Alert.alert('Error', 'Failed to add address');
        console.log('Error', error);

      })
  };

  return (
    <ScrollView>
      <View style={{ height: 50, backgroundColor: '#00ced1' }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
          Add a new Address
        </Text>
        <TextInput
          style={{
            padding: 10,
            borderColor: '#d0d0d0',
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
          placeholderTextColor='gray'
          placeholder='Your new address'
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Full name (First and last name)
          </Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholderTextColor='gray'
            placeholder='Enter your name'
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Your phone number
          </Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholderTextColor='gray'
            placeholder='Phone Number'
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Flat, House No, Building, Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholderTextColor='gray'
            placeholder='Your house number'
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Area, Street, Sector, Village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholderTextColor='gray'
            placeholder='Street'
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>LandMark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholderTextColor='gray'
            placeholder='Eg newar appolo hospital'
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Pincode</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholderTextColor='gray'
            placeholder='Enter pincode'
          />
        </View>

        <Pressable 
          onPress={handleAddAddress}
          style={styles.button}
        >
          <Text style={{ fontWeight: 'bold' }}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffc72c',
    padding: 19,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
