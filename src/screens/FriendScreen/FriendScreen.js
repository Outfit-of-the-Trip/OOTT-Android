import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

import {Avatar, Button} from 'react-native-paper';
import {AuthContext} from '../../utils/Auth';
import Glass from '../../assets/images/glass.png';

const FriendScreen = () => {
  // await AsyncStorage.getItem('userInfo') 현재 로그인한 계정의 데이터를 가져올 수 있음.
  const {userInfo} = useContext(AuthContext);
  console.log(userInfo);

  const [friendName, setFriendName] = useState('');
  const [findFriendInfo, setFindFriendInfo] = useState([]);

  //친구 이름 받아오기
  const handleFriendName = name => {
    setFriendName(name);
  };

  //친구 추가
  const addingFriend = async username => {
    console.log(userInfo.nickname);
    console.log(username.usrId);
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/api/friends/addFriends',
        {
          reqUser: `${userInfo.nickname}`,
          resUser: `${username.usrId}`,
        },
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //친구 삭제
  const deletingFriend = async username => {
    console.log(userInfo.nickname);
    console.log(username.usrId);
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/api/friends/deleteFriend',
        {
          reqUser: `${userInfo.nickname}`,
          resUser: `${username.usrId}`,
        },
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //친구 검색 함수
  const friendsinfo = findFriendInfo.filter(item => {
    if (item.usrId === friendName) {
      console.log(item.usrId);
      return item;
    }
  });

  //모든 유저 데이터 가져오기
  useEffect(() => {
    const getFriendInfo = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:3000/api/test/getUserTable',
        );
        setFindFriendInfo(response.data);
        console.log(findFriendInfo);
      } catch (e) {
        console.log(e);
      }
    };
    getFriendInfo();
  }, []);

  return (
    <SafeAreaView style={styles.allContainer}>
      <View style={styles.InputContainer}>
        <Image style={styles.searchImg} source={Glass} />
        <Text style={styles.contour}></Text>
        <TextInput
          style={styles.InputBox}
          onChangeText={handleFriendName}
          placeholder="이름을 입력하세요"
          placeholderTextColor="black"
        />
      </View>
      <ScrollView>
        {friendName.length === 0 ? (
          <View></View>
        ) : (
          friendsinfo.map((item, i) => {
            let userIds;
            if (item.usrId.length > 5) {
              userIds = item.usrId.slice(0, 4) + '..';
            }
            return (
              <View key={i} style={styles.personRowContainer}>
                <View style={styles.row}>
                  <View style={styles.personColumnContainer}>
                    <Avatar.Image
                      size={50}
                      source={{uri: item.usrProfileURL}}
                      style={styles.avatarContainer}
                    />
                    <Text style={styles.userId}>
                      {item.usrId.length > 5 ? userIds : item.usrId}
                    </Text>
                  </View>
                  <View style={styles.personColumnContainer}>
                    <Text style={styles.textfont}>ID : &nbsp;{item.usrId}</Text>
                    <Text style={styles.textfont}>
                      나이 : &nbsp;{item.usrAge}
                    </Text>
                  </View>
                </View>
                <View style={styles.friendDeleteButton}>
                  <Button
                    onPress={() => addingFriend(item)}
                    mode="contained"
                    style={styles.addingButton}>
                    친구 추가
                  </Button>
                  <Button
                    onPress={() => deletingFriend(item)}
                    mode="contained-tonal"
                    style={styles.addingButton}>
                    친구 삭제
                  </Button>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  allContainer: {
    backgroundColor: '#E6E6E6',
    height: '100%',
  },
  InputContainer: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9F81F7',
    margin: 5,
    backgroundColor: '#FFFFFF',
  },
  searchImg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRightWidth: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  contour: {
    borderRightWidth: 1,
    fontSize: 24,
    marginRight: 10,
    borderColor: '#7401DF',
  },
  InputBox: {
    alignItems: 'center',
    width: '80%',
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
    color: '#000000',
  },
  searchName: {
    margin: 5,
    fontFamily: '오뮤_다예쁨체',
    fontSize: 24,
    color: 'black',
  },
  personRowContainer: {
    margin: 5,
    padding: 4,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 2,
    justifyContent: 'space-between',
    borderColor: '#9F81F7',
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
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  userId: {
    textAlign: 'center',
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
    width: 50,
    color: 'black',
  },
  friendDeleteButton: {
    justifyContent: 'space-between',
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
});
