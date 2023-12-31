import { 
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';
import { 
  MaterialCommunityIcons,
  AntDesign,
  Ionicons
} from '@expo/vector-icons';

import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const height = (width * 100) / 100;

  return (
    <ScrollView
      style={{ marginTop: 45, flex: 1, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
    >
      <Header/>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground 
            key={index}
            source={{uri: item}}
            style={{ width, height, marginTop: 25, resizeMode: 'contain'}}  
          >
            <View style={{ padding: 20, flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
              <View style={styles.containerOffer}>
                <Text style={styles.labelOffer}>20% off</Text>
              </View>
              
              <View style={styles.containerShare}>
                <MaterialCommunityIcons name="share-variant" size={24} color="black"/>
              </View>
            </View>
            <View style={styles.containerHeart}>
              <AntDesign name="hearto" size={24} color="black"/>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10}}>
        <Text style={{ fontSize: 15, fontWeight: '500'}}>{route?.params?.title}</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 6}}>R$ {route?.params?.price}</Text>
      </View>

      <Text style={{ height: 1, borderColor: '#d0d0d0', borderWidth: 1}}/>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold'}}>{route?.params?.color}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold'}}>{route?.params?.size}</Text>
      </View>

      <Text style={{ height: 1, borderColor: '#d0d0d0', borderWidth: 1}}/>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5}}>Total: {route.params.price}</Text>
        <Text style={{ color: '#00ced1'}}>Free deivery Tomorrow by 3 PM. Order ithin 10hrs 30 mins</Text>
        <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center', gap: 5}}>
          <Ionicons name="location" size={24} color="black"/>
          <Text style={{ fontSize: 15, fontWeight: '600' }}>Deliver To Sujan - Bagalore 560016</Text>
        </View>
      </View>

      <Text style={{ color: 'green', marginHorizontal: 10, fontWeight: '500'}}>IN Stock</Text>
      <Pressable style={{ backgroundColor: '#ffc72c', padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
        <Text>Add to cart</Text>
      </Pressable>
      
      <Pressable
        style={{
          backgroundColor: '#ffac1c',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10
        }}
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  )
}

export default ProductInfoScreen

const styles = StyleSheet.create({
  containerOffer: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#c60c30', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  labelOffer: {
    color: 'white', 
    textAlign: 'center', 
    fontWeight: '600', 
    fontSize: 12
  },
  containerShare: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#e0e0e0', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  containerHeart: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#e0e0e0', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 'auto',
    marginLeft: 10,
    marginBottom: 20
  },
});