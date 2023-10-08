import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import {Avatar} from 'react-native-paper';
import {AuthContext} from '../../utils/Auth';
import Glass from '../../assets/images/glass.png';
import {backendURL} from '../../constants/url';
import {testURL} from '../../constants/url';

const FriendScreen = () => {
  const {userInfo} = useContext(AuthContext);

  const [friendName, setFriendName] = useState('');
  const [findFriendInfo, setFindFriendInfo] = useState([]);
  const [friendTravleInfo, setFriendTravleInfo] = useState([]);
  const [myfriends, setMyFriends] = useState([]);

  //친구 추가
  const addingFriend = async friend => {
    try {
      const response = await axios.post(
        backendURL + '/api/friends/addFriends',
        {
          reqUser: `${userInfo.nickname}`,
          resUser: `${friend.usrId}`,
        },
      );
      console.log(response.data);
    } catch (e) {
      console.log('Friends Request: ', e);
    }
  };

  //모든 유저 데이터 가져오기
  useEffect(() => {
    const getFriendInfo = async () => {
      try {
        const response = await axios.get(testURL + '/api/test/getUserTable');
        setFindFriendInfo(response.data);
      } catch (e) {
        console.log('all User: ', e);
      }
    };
    getFriendInfo();
  }, []);

  // 내 친구 리스트
  useEffect(() => {
    axios
      .get(testURL + `/api/friends/myFriends?userId=${userInfo.nickname}`)
      .then(res => {
        setMyFriends(res.data);
      })
      .catch(e => console.log('Friends error: ', e));
  }, []);

  // 여행 계획 가져오기
  useEffect(() => {
    const getMyTravelInfo = async () => {
      const response = await axios.get(testURL + `/api/test/getTravelTable`);
      setFriendTravleInfo(response.data);
    };
    getMyTravelInfo();
  }, []);

  // 친구 여행 기록 가져오기
  const countTravle = friendTravleInfo.filter(
    item => friendName === item.usrId,
  ).length;

  //친구 이름 가져오기
  const findFriendName = name => {
    setFriendName(name);
  };

  //친구 이름 검색
  const foundFriend = findFriendInfo.filter(item => {
    if (item.usrId === friendName) {
      // console.log(item);
      return item;
    }
  });

  return (
    <SafeAreaView style={styles.allContainer}>
      <View style={styles.InputContainer}>
        <TextInput style={styles.InputBox} onChangeText={findFriendName} />
        <Image style={styles.searchImg} source={Glass} />
      </View>
      {friendName.length === 0
        ? myfriends.map((item, i) => (
            <View key={i} style={styles.personRowContainer}>
              <ScrollView>
                <View style={styles.row}>
                  <View style={styles.personColumnContainer}>
                    <Avatar.Image
                      size={50}
                      source={{uri: item.usrProfileURL}}
                      style={styles.avatarContainer}
                    />
                  </View>
                  <View style={styles.personColumnContainer}>
                    <Text style={styles.textfont}>{item.myFriend}</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          ))
        : foundFriend.map((item, i) => (
            <ScrollView key={i}>
              <View style={styles.personRowContainer}>
                <View style={styles.row}>
                  <View style={styles.personColumnContainer}>
                    <Avatar.Image
                      size={50}
                      source={{uri: item.usrProfileURL}}
                      style={styles.avatarContainer}
                    />
                  </View>
                  <View style={styles.personColumnContainer}>
                    <Text style={styles.textfont}>&nbsp;{item.usrId}</Text>
                    <Text style={styles.textfont}>
                      {countTravle} Travle Plan
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.plusButtonContainer}
                  onPress={() => addingFriend(item)}>
                  <Text style={styles.plusButton}>+</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ))}
    </SafeAreaView>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  allContainer: {
    height: '100%',
  },
  upperPart: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nickname: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: '오뮤_다예쁨체',
    fontSize: 25,
  },
  fashionItem: {
    marginTop: 10,
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
  },
  //
  plusButtonContainer: {
    justifyContent: 'center',
  },
  plusButton: {
    width: 40,
    textAlign: 'center',
    fontSize: 25,
    color: '#FFFFFF',
    backgroundColor: '#9F81F7',
    borderRadius: 60,
  },
  InputContainer: {
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderBottomWidth: 2,
    borderColor: 'gray',
    margin: 3,
    backgroundColor: '#FFFFFF',
  },
  InputBox: {
    alignItems: 'center',
    width: '80%',
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
  },
  searchImg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginRight: 5,
  },
  thumbnail: {
    width: '20%',
    height: '20%',
  },
  contour: {
    borderRightWidth: 1,
    fontSize: 24,
    marginRight: 10,
    borderColor: '#7401DF',
  },

  searchName: {
    margin: 5,
    fontFamily: '오뮤_다예쁨체',
    fontSize: 24,
    color: 'black',
  },

  personRowContainer: {
    alignSelf: 'center',
    width: '90%',
    margin: 5,
    padding: 4,
    borderRadius: 10,
    flexDirection: 'row',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    borderColor: 'gray',
    backgroundColor: '#F2F2F2',
  },
  personColumnContainer: {
    margin: 9,
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: '오뮤_다예쁨체',
  },
  row: {
    flexDirection: 'row',
  },
  avatarContainer: {
    borderRadius: 30,
    borderColor: 'undefined',
  },
  userId: {
    textAlign: 'center',
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
    width: 50,
    color: 'black',
  },
  textfont: {
    fontFamily: '오뮤_다예쁨체',
    fontSize: 22,
    color: '#000000',
    marginTop: 8,
  },
  addingButton: {
    margin: 3,
    borderColor: '#9F81F7',
    color: '#000000',
    borderWidth: 1.7,
    fontSize: 15,
    borderRadius: 10,
  },
  whitePage: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
