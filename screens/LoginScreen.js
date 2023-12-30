import { useEffect, useState } from 'react';

import { 
  SafeAreaView, 
  StyleSheet, 
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert
} from 'react-native';

import { 
  MaterialIcons, 
  AntDesign
} from '@expo/vector-icons';

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          navigation.replace('Main');
        }
      } catch (error) {
        console.log('error message', err);
      }
    };

    checkLoginStatus();
  }, [])

  const handleLogin = () => {
    const user = {
      email: email,
      password: password
    }
    
    axios
      .post('http://localhost:8000/login', user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login error", "Invalid Email");
        console.log(error);
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <MaterialIcons name='shopping-bag' size={30} color="#900"/>
        <Text style={{fontSize: 30}}>BloobCommerce</Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center'}}>
          <Text style={styles.subtitle}>Login In to your Account</Text>
        </View>

        <View style={{marginTop: 70}}>
          <View style={styles.input}>
            <MaterialIcons 
              style={{ marginLeft: 8}}
              name='email' 
              size={24} 
              color='gray'
            />
            <TextInput 
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color: 'gray', marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }}
              placeholder='enter your Email'
            />
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <View style={styles.input}>
            <AntDesign 
              style={{ marginLeft: 8}}
              name='lock1' 
              size={24} 
              color='gray'
            />
            <TextInput 
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{ color: 'gray', marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }}
              placeholder='enter your Password'
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12}}>
          <Text>Keep me logged in</Text>

          <Text style={{ color: '#007fff', fontWeight: '500'}}>Forgot Password</Text>
        </View>

        <View style={{marginTop: 70}}>
          <Pressable 
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold'}}>Login</Text>
          </Pressable>

          <Pressable 
            onPress={() => navigation.navigate('Register')}
            style={{ marginTop: 25}}
          >
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  title: {
    width: 150,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#041e42'
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#d0d0d0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30
  },
  button: {
    width: 200,
    backgroundColor: '#febe10',
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15
  }
});