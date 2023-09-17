import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';

const places = [
  {KoreanName: '부산', EnglishName: 'boosan'},
  {KoreanName: '인천', EnglishName: 'incheon'},
  {KoreanName: '여수', EnglishName: 'yeosu'},
  {KoreanName: '속초', EnglishName: 'sockcho'},
  {KoreanName: '강릉', EnglishName: 'gangneung'},
  {KoreanName: '대천', EnglishName: 'daecheon'},
];
const WhereToGo = () => {
  const navigation = useNavigation();

  const {params: days} = useRoute();

  const [findPlace, setFindPlace] = useState('');
  const [stackedDate, setStackedDate] = useState({
    days: days,
  });
  const searchPlace = place => {
    setFindPlace(place.toLowerCase());
    setStackedDate({
      ...stackedDate,
      place: place,
    });
  };
  const matchValues = places.filter(item => {
    if (item.EnglishName === findPlace) {
      return item;
    }
  });

  const goToWithFriendsPage = () => {
    setStackedDate(...days);
    navigation.navigate('WhoDoYouGoWith', stackedDate);
  };
  return (
    <View style={styles.fullContainer}>
      <TextInput style={styles.searchContainer} onChangeText={searchPlace} />
      {matchValues.map((item, index) => (
        <Text
          key={index}
          style={styles.placeName}
          onPress={goToWithFriendsPage}>
          {item.KoreanName}
        </Text>
      ))}
    </View>
  );
};

export default WhereToGo;

const styles = StyleSheet.create({
  fullContainer: {
    alignItems: 'center',
  },
  searchContainer: {
    borderRadius: 5,
    backgroundColor: '#DCDCDC',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: 300,
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: '오뮤_다예쁨체',
  },
  placeName: {
    fontSize: 22,
    fontFamily: '오뮤_다예쁨체',
  },
});
