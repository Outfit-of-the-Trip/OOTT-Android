import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {SheetProvider, SheetManager} from 'react-native-actions-sheet';
import {useRecoilState, useRecoilValue} from 'recoil';
import {searchState, dateState, reasonState} from '../../states/atoms';
import Icon from 'react-native-vector-icons/MaterialIcons';

import './sheet';

import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

const OOTTScreen = () => {
  const navigation = useNavigation();

  const gotoTravelPlace = () => {
    return navigation.navigate('TravelPlace');
  };
  const gotoTravelFriends = () => {
    return navigation.navigate('TravelFriends');
  };

  const place = useRecoilValue(searchState);
  const date = useRecoilValue(dateState);
  const firstDate = date[0];
  const lastDate = date[date.length - 1];
  const [reason, setReason] = useRecoilState(reasonState);

  const [isLoding, setIsLoding] = useState(null);

  const [popData] = useState([
    '배낭여행',
    '레저여행',
    '캠핑',
    '엠티',
    '호캉스',
    '핫플레이스',
    '인생샷',
    '출장',
    '워크숍',
    '학회',
  ]);

  const buttonColor = place && firstDate && reason ? 'black' : 'grey';

  const getTravelDate = () => {
    SheetManager.show('CalendarSheet');
  };

  const renderButton = ({item}) => {
    const isSelected = reason == item;
    const backgroundColor = isSelected ? 'skyblue' : '#fbfbfb';

    return (
      <TouchableOpacity
        onPress={() => setReason(item)}
        style={{
          margin: 4,
          backgroundColor: backgroundColor,
          borderRadius: 20,
        }}>
        <Text
          style={{
            color: 'black',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 15,
            marginRight: 15,
            fontSize: 17,
            fontWeight: 'normal',
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SheetProvider>
      <View style={styles.rootContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>당신의 여행정보를{'\n'}입력해주세요</Text>
        </View>

        <View style={styles.dateContainer}>
          <View style={styles.place}>
            <TouchableOpacity
              onPress={getTravelDate}
              style={{
                margin: 10,
                borderWidth: 1,
                borderColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: 100,
              }}>
              <View style={styles.placeContainer}>
                <View style={styles.iconContainer}>
                  <Icon
                    name="calendar-month"
                    size={30}
                    color={firstDate ? 'black' : 'grey'}
                  />
                </View>

                <View style={styles.wheretogo}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      fontWeight: 'normal',
                    }}>
                    {firstDate
                      ? firstDate + ' ~ ' + lastDate
                      : ' 날짜를 선택해주세요'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBarContainer}>
          <View style={styles.place}>
            <TouchableOpacity
              onPress={gotoTravelPlace}
              style={{
                margin: 10,
                borderWidth: 1,
                borderColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderRadius: 100,
              }}>
              <View style={styles.placeContainer}>
                <View style={styles.iconContainer}>
                  <Icon
                    name="travel-explore"
                    size={30}
                    color={place ? 'black' : 'grey'}
                  />
                </View>
                <View style={styles.wheretogo}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      fontWeight: 'normal',
                    }}>
                    {place ? place : '어디로 떠나시나요?'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.reasonContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>왜 가나요?</Text>
          </View>

          <View style={styles.buttonGroup}>
            <FlatList
              numColumns={4}
              keyExtractor={item => item}
              data={popData}
              renderItem={renderButton}></FlatList>
          </View>
        </View>

        <View style={styles.nextButton}>
          <TouchableOpacity
            disabled={place && firstDate && reason ? false : true}
            onPress={gotoTravelFriends}
            style={{
              margin: 10,
              backgroundColor: buttonColor,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                justifyContent: 'center',
                marginTop: 5,
                marginBottom: 5,
                fontSize: 17,
                fontWeight: 'normal',
              }}>
              선택
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SheetProvider>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  dateContainer: {
    flex: 2,
  },
  searchBarContainer: {
    flex: 1.5,
    marginTop: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  reasonContainer: {
    flex: 6,
    margin: 15,
    marginTop: '15%',
  },

  nextButton: {
    flex: 2,
    justifyContent: 'center',
    margin: 10,
  },

  textContainer: {
    flex: 1,
  },
  buttonGroup: {
    flex: 3,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  place: {
    flex: 1,
  },
  wheretogo: {
    flex: 4,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  header: {
    fontSize: 25,
    color: 'black',
    margin: 20,
    fontWeight: 'bold',
  },
});

export default OOTTScreen;
