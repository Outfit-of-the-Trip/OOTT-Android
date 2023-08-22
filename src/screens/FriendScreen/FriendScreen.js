import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {IconButton, Avatar} from 'react-native-paper';
import {FriendsList} from '../../constants/FriendList';
import avatar from '../../assets/images/avatar.png';
import axios from 'axios';

const FriendScreen = () => {
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
  const friendsInfo = FriendsList.filter(item => {
    if (item.id === friendName) {
      return item;
    }
  });
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
          // 'http://10.0.2.2:3000/api/test/getFriendsTable',
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
    <SafeAreaView>
      <View style={styles.InputContainer}>
        <TouchableOpacity>
          <Text style={styles.backbutton} onPress={Backbutton} size={20}>
            &lt;
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.InputBox}
          onChangeText={handleFriendName}
          placeholder="이름을 입력하세요"
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
          <Text style={styles.Loading}>친구 찾는 중...</Text>
        </View>
      ) : (
        // friendsInfo.map((item, index) => (
        //   <View key={index} style={styles.personRowContainer}>
        //     <View style={styles.personColumnContainer}>
        //       <Avatar.Image size={30} source={avatar} />
        //       <Text>{item.name}</Text>
        //     </View>
        //     <View style={styles.personColumnContainer}>
        //       <Text>ID: {item.id}</Text>
        //       <Text>나이: {item.age}</Text>
        //     </View>
        //     <View style={styles.personColumnContainer}>
        //       <Text>관심 분야: {item.favorite}</Text>
        //       <Text>성별: {item.gender}</Text>
        //     </View>
        //     <View style={styles.friendDeleteButton}>
        //       <Button onPress={moveFriendInfo} title="정보 보기" />
        //     </View>
        //   </View>
        // ))
        friendsinfo.map((item, i) => (
          <View key={i} style={styles.personRowContainer}>
            <View style={styles.personColumnContainer}>
              <Avatar.Image size={30} source={avatar} />
              <Text style={styles.userId}>{item.usrId}</Text>
            </View>
            <View style={styles.personColumnContainer}>
              <Text>ID: {item.usrId}</Text>
              <Text>나이: {item.usrAge}</Text>
            </View>
            <View style={styles.personColumnContainer}>
              <Text>관심 분야:</Text>
              <Text>성별: {item.usrGender}</Text>
            </View>
            <View style={styles.friendDeleteButton}>
              <Button onPress={moveFriendInfo} title="정보 보기" />
            </View>
          </View>
        ))
        // friendsinfo.map((item, i) => (
        //   <View key={i}>
        //     <Text>{item.usrId}</Text>
        //   </View>
        // ))
      )}
    </SafeAreaView>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  backbutton: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    alignItems: 'center',
    width: 25,
    height: 30,
  },
  InputContainer: {
    flexDirection: 'row',
    width: 'auto',
  },
  InputBox: {
    alignItems: 'center',
    width: 300,
  },
  searchName: {
    fontFamily: '오뮤_다예쁨체',
    fontSize: 24,
  },
  Loading: {
    margin: 5,
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
  },
  personRowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  personColumnContainer: {
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userId: {
    textAlign: 'center',
  },
  friendDeleteButton: {
    justifyContent: 'center',
  },
  deleteFindFriends: {
    justifyContent: 'center',
  },
});
