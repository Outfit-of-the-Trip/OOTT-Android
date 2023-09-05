import React, {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native';
import SearchBar from "react-native-dynamic-search-bar";
import axios from 'axios'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';


const OOTTScreen = () => {
  const navigation = useNavigation()

  const [search, setSearch] = useState("")
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState([
    '경기도 이천',
    '석촌 호수',
  ]);
  const [travelHistory, setTravelhHistory] = useState([]);
  const [isLoding, setIsLoding] = useState(null);


  const gotoTravelDetail = () => {
    return navigation.navigate('TravelDetail', {travelPlace: "경기도 이천"});
  };

  const getTravelData = () => {
    setIsLoding(true)
    axios.get('http://10.0.2.2:3001/api/travel/getMyTravelInfo?userId=a')
    .then(function (res) {
      setTravelhHistory(res.data);
      setIsLoding(false)
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  useEffect( () => {
   getTravelData()
  }, []);

  const renderSearchHistory = ({ item }) => {
    return(
      <TouchableOpacity 
      onPress={() => gotoTravelDetail}
      >
        <View style={styles.searcHistoryContainer}>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderTravelHistory = ({ item }) => {
    return(
      <TouchableOpacity 
        onPress={() => console.log(item.travlPlace)}
      >
        <View style={styles.searcHistoryContainer}>
          <Text>{item.travlPlace}</Text>
        </View>

      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.rootContainer} >

      <View style={styles.searchBarContainer}>
        <SearchBar
          style = {styles.searchBar}
          placeholder = "도시 · 장소 또는 관광지 입력"
          placeholderTextColor = "grey"
          onFocus = {() => setDropdownVisible(true)}
          onSearchPress = {() => Keyboard.dismiss()}
          onClearPress = {() => {
            setDropdownVisible(false)
            Keyboard.dismiss()
          }}
          onChangeText = {() => setSearch(search)}                     
        />

      </View>

      {isDropdownVisible ? (
        <View style={styles.flatListStyle}>
          <FlatList
            data={searchHistory}
            renderItem={renderSearchHistory}
            keyExtractor={(item) => item}
          />
        </View>
      ):( 
          <View style={styles.historyContainer}>
            <Text style={styles.title}>내 여행 정보</Text>
            <FlatList
              data={travelHistory}
              renderItem={renderTravelHistory}
            />
          </View>
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
    margin: 3,
  },

  searchBarContainer:{
    flex: 1,
    justifyContent: "center",
  },

  historyContainer:{
    flex: 8,
  },

  travelHistory: {
    flex:1
  },

  flatListStyle: {
    flex: 8,
  },

  searcHistoryContainer: {
    margin: 10,
  },
  
  title:{
    fontSize: 17,
    color: 'black',
    margin: 20,
    fontWeight: "bold",
  },

});

export default OOTTScreen
