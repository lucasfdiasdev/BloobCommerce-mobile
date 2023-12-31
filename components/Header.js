import { 
  Pressable, 
  StyleSheet, 
  TextInput, 
  View 
} from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';

const Header = () => {
  return (
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
  )
};

export default Header;

const styles = StyleSheet.create({
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
});