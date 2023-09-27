import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {Avatar} from 'react-native-paper';
import {AuthContext} from '../../utils/Auth';
import FamilyTravle from '../../assets/images/familytravel.jpg';
import EmptyImg from '../../assets/images/emptyImg.png';
import MyPage from '../../assets/images/mypage.png';
const FriendScreen = () => {
  // await AsyncStorage.getItem('userInfo') 현재 로그인한 계정의 데이터를 가져올 수 있음.
  const {userInfo} = useContext(AuthContext);
  // console.log(userInfo);

  const [friendName, setFriendName] = useState('');
  const [findFriendInfo, setFindFriendInfo] = useState([]);

  //친구 추가
  const addingFriend = async () => {
    console.log(userInfo.nickname);
    console.log(friendName.usrId);
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/api/friends/addFriends',
        {
          reqUser: `${userInfo.nickname}`,
          resUser: `${friendName.usrId}`,
        },
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //위 화면으로 데이터 가져오기
  const dataUpFnc = data => {
    setFriendName(data);
  };
  useEffect(() => {
    // console.log(friendName);
  }, []);

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

  //모든 유저 데이터 가져오기
  useEffect(() => {
    const getFriendInfo = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:3000/api/test/getUserTable',
        );
        setFindFriendInfo(response.data);
        // console.log(findFriendInfo);
      } catch (e) {
        console.log(e);
      }
    };
    getFriendInfo();
  }, []);

  return (
    <SafeAreaView style={styles.allContainer}>
      {friendName.length === 0 ? (
        <View>
          <ImageBackground source={EmptyImg} style={styles.upperPart}>
            <Text style={styles.nickname}>친구 이름</Text>
            <Avatar.Image size={120} source={MyPage} />
            <Text style={styles.fashionItem}>친구 스타일</Text>
          </ImageBackground>
          <TouchableOpacity style={styles.plusButtonContainer}>
            <Text style={styles.plusButton}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <ImageBackground source={FamilyTravle} style={styles.upperPart}>
            <Text style={styles.nickname}>{friendName.usrId}</Text>
            <Avatar.Image size={120} source={{uri: friendName.usrProfileURL}} />
            <Text style={styles.fashionItem}>{friendName.usrStyle1}</Text>
          </ImageBackground>
          <TouchableOpacity
            style={styles.plusButtonContainer}
            onPress={addingFriend}>
            <Text style={styles.plusButton}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.FriendsList}>
        {findFriendInfo.map((item, i) => (
          <TouchableOpacity key={i} onPress={() => dataUpFnc(item)}>
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
                  <Text style={styles.textfont}>ID : &nbsp;{item.usrId}</Text>
                  <Text style={styles.textfont}>
                    나이 : &nbsp;{item.usrAge}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  plusButtonContainer: {
    alignItems: 'flex-end',
  },
  plusButton: {
    bottom: 20,
    marginRight: 20,
    width: 50,
    textAlign: 'center',
    fontSize: 35,
    color: '#FFFFFF',
    backgroundColor: '#9F81F7',
    borderRadius: 60,
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
    alignSelf: 'center',
    width: '85%',
    margin: 5,
    padding: 4,
    marginTop: 5,
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
