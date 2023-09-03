import React, {useState, useEffect} from 'react'
import { SearchBar, Icon } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';

const OOTTScreen = () => {
  const navigation = useNavigation();

  const gotoRecomend = () => {
    return navigation.navigate('Recomend');
  };

  const [search, setSearch] = useState("")
  const updateSearch = (search) => {
    setSearch(search)
  }

  const Test = () => {
    return(
      <Text>12312</Text>
    )
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.searchContainer}>
        <SearchBar
          platform="android"
          placeholder= "도시 또는 여행지"
          onChangeText={updateSearch}
          value={search}
          onSubmitEditing={()=>{console.log(search)}}  
        />
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.title}>내 여행 정보</Text>
      </View>

      <View style={styles.popularContainer}>
        <Text style={styles.title} >인기 검색</Text>
       
        <View style={styles.popularContent}>

          <TouchableOpacity
	          activeOpacity={0.8} 
            style={styles.poppular}
            // onPress={setSearch("경기도 이천")}
          >
            <View style={styles.popularPhoto}>
              <Image
                style={styles.popularImage}
                source = {{uri :"https://content.presspage.com/uploads/685/1920_icheon-edenparadisehotel.jpg?10000" }}
              />
            </View>
            <View style={styles.popularPlace}>
              <View style={styles.popularRegin}>
                <Text style={styles.content}>경기도 이천</Text>
              </View>
              <View style={styles.popularDes}>
                <Text>호텔 · 국내</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.test}></View>
        </View>
      </View>

      <View style={styles.footer}>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  footer:{
    flex: 4
  },

  searchContainer:{
    flex: 2,
  },
  historyContainer:{
    flex: 3,
  },
  popularContainer:{
    flex: 3,
  },
  
  title:{
    fontSize: 17,
    color: 'black',
    marginLeft: 20,
    fontWeight: "bold",
  },
  content:{
    color: 'black',
    fontWeight: "bold",
  },
  popularContent:{
    flex:1
  },
  test:{
    flex:1
  },

  poppular:{
    flex:1.7,
    flexDirection: 'row',
    margin: 20,
  },
  popularPhoto:{
    flex:1,
  },  
  popularPlace:{
    flex: 5.5,
    margin: 10,
  },
  popularRegin:{
    flex:1,
  },
  popularDes:{
    flex:1,
  },
  popularImage: {
    marginTop: 10,
    marginLeft: 3,
    width: 40,
    height: 40,
    borderRadius: 300,

  },
});

export default OOTTScreen
