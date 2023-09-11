import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Avatar, Button} from 'react-native-paper';
import {FriendsList} from '../../constants/FriendList';
import {AuthContext} from '../../utils/Auth';
import SkeletonUI from '../../components/skeleton';

import Backbuttons from '../../assets/images/backbuttonpng.png';
import avatar from '../../assets/images/avatar.png';

const FriendScreen = () => {
  const {userInfo} = useContext(AuthContext);
  const navigation = useNavigation();

  const [friendName, setFriendName] = useState('');
  const [findFriendInfo, setFindFriendInfo] = useState([]);

  //친구 이름 받아오기
  const handleFriendName = name => {
    setFriendName(name);
  };

  //페이지 이동 네비게이션
  const Backbutton = () => {
    navigation.goBack();
  };
  const moveFriendInfo = () => {
    navigation.navigate('FriendInfoScreen', friendName);
  };

  //친구 검색 함수
  const friendsinfo = findFriendInfo.filter(item => {
    if (item.usrId === friendName) {
      console.log(item.usrId);
      return item;
    }
  });
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
  useEffect(() => {
    console.log(userInfo);
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.InputContainer}>
        <TouchableOpacity onPress={Backbutton}>
          <Image style={styles.backbutton} source={Backbuttons} />
        </TouchableOpacity>
        <Text style={styles.contour}></Text>
        <TextInput
          style={styles.InputBox}
          onChangeText={handleFriendName}
          placeholder="이름을 입력하세요"
          placeholderTextColor="black"
        />
      </View>
      {}
      <Text style={styles.searchName}>
        찾는 친구 이름:&nbsp;&nbsp;{friendName}
      </Text>
      {/* friendName이 있으면 검색해서 나온 친구의 이름을 보여주고 
        아니라면 배열에 저장되어 있는 모든 친구의 정보를 보여주고,
        만약 삭제 버튼을 누르면 filter 함수를 통해 그 유저의 정보만 삭제한
        새로운 배열을 만들어서 editedFriendsList에 저장하고 화면에 바로 앞에서
        나온 변수의 데이터를 보여준다.
      */}
      {friendName.length === 0 ? (
        <View>
          <SkeletonUI />
          <SkeletonUI />
          <SkeletonUI />
          <SkeletonUI />
        </View>
      ) : (
        friendsinfo.map((item, i) => (
          <View key={i} style={styles.personRowContainer}>
            <View style={styles.personColumnContainer}>
              <Avatar.Image size={30} source={avatar} />
              <Text style={styles.userId}>{item.usrId}</Text>
            </View>
            <View style={styles.personColumnContainer}>
              <Text style={styles.textfont}>ID : {item.usrId}</Text>
              <Text style={styles.textfont}>나이 : {item.usrAge}</Text>
            </View>
            <View style={styles.personColumnContainer}>
              <Text style={styles.textfont}>관심 분야 :</Text>
              <Text style={styles.textfont}>성별 : {item.usrGender}</Text>
            </View>
            <View style={styles.friendDeleteButton}>
              <Button
                onPress={moveFriendInfo}
                mode="outlined"
                style={styles.textfont}>
                정보 보기
              </Button>
            </View>
          </View>
        ))
      )}
    </SafeAreaView>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  InputContainer: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#5F04B4',
    margin: 5,
  },
  backbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    borderRightWidth: 5,
    marginRight: 5,
  },
  contour: {
    borderRightWidth: 1,
    fontSize: 40,
    marginRight: 10,
    borderColor: '#7401DF',
  },
  InputBox: {
    alignItems: 'center',
    width: '80%',
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
    color: 'black',
  },
  searchName: {
    margin: 5,
    fontFamily: '오뮤_다예쁨체',
    fontSize: 24,
    color: 'black',
  },
  Loading: {
    margin: 5,
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
  },
  personRowContainer: {
    margin: 5,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  personColumnContainer: {
    margin: 9,
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: '오뮤_다예쁨체',
  },
  userId: {
    textAlign: 'center',
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
    width: 30,
  },
  friendDeleteButton: {
    justifyContent: 'center',
  },
  textfont: {
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
  },
  deleteFindFriends: {
    justifyContent: 'center',
  },
});
