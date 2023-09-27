import React, {useState, useEffect, useRef} from 'react'
import {useNavigation} from '@react-navigation/native';
import SearchBar from "react-native-dynamic-search-bar";

import { useRecoilState, useResetRecoilState } from "recoil";
import { searchState } from '../../../states/atoms';


import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const TravelPlace = () => {

  const navigation = useNavigation()

  const [popData] = useState(["나트랑", "부산", "제주", "여수", "가평", "대구"])
  const [search, setSearch] = useRecoilState(searchState)

  const renderButton = ({ item }) => {
    return(
      <TouchableOpacity 
        onPress={()=>{
          setSearch(item)
          navigation.pop()
        }}
        style={{          
          margin: 4,
          backgroundColor: "#fbfbfb",
          borderRadius: 20,
        }}
      >
        <Text style={{
          color: "black",
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 10,
          marginRight: 10,
          fontSize: 15,
          fontWeight: 'normal'
        }}>{item}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.rootContainer} >

      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder = "도시 · 장소 또는 관광지 입력"
          placeholderTextColor = "grey"
          onSearchPress = { () =>{
            Keyboard.dismiss()
            navigation.pop()
          }}
          onClearPress = {() => {
            Keyboard.dismiss()
            navigation.pop()
            setSearch("")
          }}
          onChangeText = {(text) => {setSearch(text)}}                     
        />
      </View>


      <View style={styles.popContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>인기 검색</Text>
        </View>
        <View style={styles.buttonGroup}>
          <FlatList
              numColumns={4}
              keyExtractor={ (item)=> item}
              data={popData}
              renderItem={ renderButton }
          >
          </FlatList>
        </View>
      </View>


      <View style={styles.historyContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>최근 검색</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  searchBarContainer:{
    flex: 1,
    marginTop: 20,
  },
  popContainer:{
    flex: 2,
    marginLeft: 20,
    marginRight: 20
  },
  historyContainer:{
    flex: 6,
    marginLeft: 20,
    marginRight: 20

  },

  titleText:{
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  buttonGroup:{
    marginTop: 10,
    flexDirection: "row",
  },

});

export default TravelPlace
