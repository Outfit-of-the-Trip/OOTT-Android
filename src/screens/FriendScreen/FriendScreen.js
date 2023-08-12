import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import {IconButton, Avatar} from 'react-native-paper';
import {FriendsList} from '../../constants/FriendList';
import avatar from '../../assets/images/avatar.png';

const FriendScreen = () => {
  const navigation = useNavigation();

  const [friendName, setFriendName] = useState('');
  const [findFriendInfo, setFindFriendInfo] = useState({});
  const [editedFriendsList, setEditedFriendsList] = useState([...FriendsList]);
  const handleFriendName = name => {
    setFriendName(name);
  };

  const Backbutton = () => {
    navigation.goBack();
  };
  const moveFriendInfo = () => {
    navigation.navigate('FriendInfoScreen', {userData: findFriendInfo});
  };

  const findFriends = () => {
    try {
      const friendInfo = FriendsList.filter(item => item.id === friendName);
      setFindFriendInfo(...friendInfo);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFriends = () => {
    try {
      const deleteFriend = FriendsList.filter(item => item.id !== friendName);
      setEditedFriendsList(...deleteFriend);
      console.log(editedFriendsList);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(editedFriendsList);
    console.log(friendName);
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.InputContainer}>
        <IconButton
          style={styles.backbutton}
          onPress={Backbutton}
          name="account-arrow-left-outline"
          size={20}
        />
        <TextInput
          style={styles.InputBox}
          onChangeText={handleFriendName}
          placeholder="이름을 입력하세요"
        />
        <View style={styles.deleteFindFriends}>
          <Button onPress={findFriends} title="친구 찾기" />
        </View>
      </View>
      <Text style={styles.searchName}>찾는 친구 이름:&nbsp;{friendName}</Text>
      {/* friendName이 있으면 검색해서 나온 친구의 이름을 보여주고 
        아니라면 배열에 저장되어 있는 모든 친구의 정보를 보여주고,
        만약 삭제 버튼을 누르면 filter 함수를 통해 그 유저의 정보만 삭제한
        새로운 배열을 만들어서 editedFriendsList에 저장하고 화면에 바로 앞에서
        나온 변수의 데이터를 보여준다.
      */}
      {friendName ? (
        <View style={styles.personRowContainer}>
          <View style={styles.personColumnContainer}>
            <Avatar.Image size={30} source={avatar} />
            <Text>{findFriendInfo.name}</Text>
          </View>
          <View style={styles.personColumnContainer}>
            <Text>ID: {findFriendInfo.id}&nbsp;&nbsp;</Text>
            <Text>나이: {findFriendInfo.age}&nbsp;&nbsp;</Text>
          </View>
          <View style={styles.personColumnContainer}>
            <Text>관심 분야: {findFriendInfo.favorite}&nbsp;&nbsp;</Text>
            <Text>성별: {findFriendInfo.gender}&nbsp;&nbsp;</Text>
          </View>
          <View style={styles.friendDeleteButton}>
            <Button onPress={deleteFriends} title="친구 삭제"></Button>
            <Button onPress={moveFriendInfo} title="정보 보기"></Button>
          </View>
        </View>
      ) : (
        editedFriendsList.map((item, index) => (
          <View key={index} style={styles.personRowContainer}>
            <View style={styles.personColumnContainer}>
              <Avatar.Image size={30} source={avatar} />
              <Text>{item.name}</Text>
            </View>
            <View style={styles.personColumnContainer}>
              <Text>ID: {item.id}</Text>
              <Text>나이: {item.age}</Text>
            </View>
            <View style={styles.personColumnContainer}>
              <Text>관심 분야: {item.favorite}</Text>
              <Text>성별: {item.gender}</Text>
            </View>
            <View style={styles.friendDeleteButton}>
              <Button onPress={deleteFriends} title="친구 삭제"></Button>
            </View>
          </View>
        ))
      )}
    </SafeAreaView>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
  backbutton: {
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
    fontSize: 20,
  },
  personRowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  personColumnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  friendDeleteButton: {
    justifyContent: 'center',
  },
  deleteFindFriends: {
    justifyContent: 'center',
  },
});
