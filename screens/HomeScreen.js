import { 
  Image,
  Platform, 
  Pressable, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View 
} from 'react-native';
import { 
  AntDesign, 
  Feather, 
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';

import ImgNot from '../assets/images/cat-notebook1.webp';

import Carousel from '../components/Carousel';

const HomeScreen = () => {


  const list = [
    {
      id: "0",
      image: ImgNot,
      name: "Home"
    },
    {
      id: "1",
      image: ImgNot,
      name: "Home"
    },
    {
      id: "2",
      image: ImgNot,
      name: "Home"
    },
    {
      id: "3",
      image: ImgNot,
      name: "Home"
    },
    {
      id: "4",
      image: ImgNot,
      name: "Home"
    },
    {
      id: "5",
      image: ImgNot,
      name: "Home"
    },
    {
      id: "6",
      image: ImgNot,
      name: "Home"
    },
    {
      id: "7",
      image: ImgNot,
      name: "Home"
    },
    {
      id: "8",
      image: ImgNot,
      name: "Home"
    },
  ];

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView>
        <View
          style={styles.header}
        >
          <Pressable
            style={styles.inputSearch}
          >
            <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black"/>
            <TextInput placeholder='Search' placeholderTextColor="gray"/>
          </Pressable>

          <Feather name="mic" size={24} color="black"/>
        </View>

        <View>
          <Pressable
            style={styles.containerLocation}
          >

            <Ionicons name="location-outline" size={24} color="black"/>
            <Text style={{ fontSize: 13, fontWeight: '500'}}>Deliver to Sujan - Bangalores</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black"/>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {list.map((item, index) => (
            <Pressable
              key={index}
              style={{ 
                margin: 10, 
                justifyContent: 'center', 
                alignItems: 'center'
              }}
            >
              <Image
                style={{ width: 50, height: 50, resizeMode: 'contain'}}
                source={{uri: item.image}}
              />
              <Text style={{ 
                textAlign: 'center', 
                fontSize: 12, 
                fontWeight: '500', 
                marginTop: 5}}
              >
                {item?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <Carousel/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#00ced1',
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center'
  },
  inputSearch: {
    flexDirection: " row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 38,
    flex: 1
  },
  containerLocation: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 5,
    padding: 10,
    backgroundColor: '#AFEEEE',
  }
});