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

import { Avatar, Divider } from '@rneui/themed';
import {AuthContext} from '../../utils/Auth';
import Glass from '../../assets/images/glass.png';
import {backendURL} from '../../constants/url';

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
    } catch (e) {
      console.log('Friends Request: ', e);
    }
  };

  //모든 유저 데이터 가져오기
  useEffect(() => {
    const getFriendInfo = async () => {
      try {
        const response = await axios.get(backendURL + '/api/test/getUserTable');
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
      .get(backendURL + `/api/friends/myFriends?userId=${userInfo.nickname}`)
      .then(res => {setMyFriends(res.data)})
      .catch(e => console.log('Friends error: ', e));
  }, []);

  // 여행 계획 가져오기
  useEffect(() => {
    const getMyTravelInfo = async () => {
      const response = await axios.get(backendURL + `/api/test/getTravelTable`);
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
      return item;
    }
  });

  return (
    <View style={styles.allContainer}>

      <View style={styles.InputContainer}>
        <TextInput style={styles.InputBox} onChangeText={findFriendName} />
        <Image style={styles.searchImg} source={Glass} />
      </View>
      <ScrollView>

      {friendName.length === 0
        ? myfriends.map((item, i) => (
            <View key={i} style={styles.personRowContainer}>
                  <View style={styles.personColumnContainer}>
                    <Avatar size={50} rounded source={{uri: item.usrProfileURL}} />
                  </View>
                  <View style={{flex: 2, justifyContent: 'center', marginLeft: 10,}}>
                    <Text style={styles.textfont}>{item.myFriend}</Text>
                    <Text style={{fontSize: 15}}>8 recommended</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.plusButtonContainer}
                    onPress={()=>console.log(123)}>
                    {/* <Text style={styles.plusButton}>-</Text> */}
                  </TouchableOpacity>
            </View>
          ))
        : foundFriend.map((item, i) => (
            <View key={i} style={styles.personRowContainer}>
              <View style={styles.personColumnContainer}>
                <Avatar size={50} rounded source={{uri: item.usrProfileURL}} />
              </View>
              <View style={{flex: 2, justifyContent: 'center', marginLeft: 10,}}>
                <Text style={styles.textfont}>{item.myFriend}</Text>
                <Text style={{fontSize: 15}}>8 recommended</Text>
              </View>
              <TouchableOpacity
                style={styles.plusButtonContainer}
                onPress={() => addingFriend(item)}>
                <Text style={styles.plusButton}>+</Text>
              </TouchableOpacity>
            </View>

          ))}
      </ScrollView>

    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  allContainer: {
    height: '100%',
    backgroundColor: 'white'
  },

  nickname: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 25,
  },
  fashionItem: {
    marginTop: 10,
    fontSize: 20,
  },
  plusButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  plusButton: {
    width: 30,
    height: 30,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    backgroundColor: '#a3a3c4',
    borderRadius: 100,
  },
  InputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  InputBox: {
    alignItems: 'center',
    fontSize: 17,
  },
  searchImg: {
    width: 30,
    height: 30,
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
    fontSize: 24,
    color: 'black',
  },

  personRowContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },

  personColumnContainer: {
    flex: 1,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },

  userId: {
    textAlign: 'center',
    fontSize: 20,
    width: 50,
    color: 'black',
  },
  textfont: {
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
