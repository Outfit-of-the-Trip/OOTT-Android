import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Avatars from '../../assets/images/avatar.png';
import {Avatar, Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
const WhoDoYouGoWith = () => {
  const navigation = useNavigation();

  const {params: Data} = useRoute();

  const [stackedDate, setStackedDate] = useState({
    days: Data.days,
    place: Data.place,
  });
  const [checkingbutton, setCheckingButton] = useState('');
  const [myFriendsList, setMyFriendsList] = useState([]);

  const goToPurposeOfTravel = () => {
    navigation.navigate('PurposOfTravel', stackedDate);
  };
  useEffect(() => {
    const getFriendList = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:3000/api/friends/myFriends?userId=a',
        );
        setMyFriendsList(response.data);
        console.log(myFriendsList);
      } catch (e) {
        console.log(e);
      }
    };
    getFriendList();
  }, []);

  // const deleteFriend = async item => {
  //   axios
  //     .post('http://10.0.2.2:3000/api/friends/deleteFriend', {
  //       requestUserID: 'a',
  //       responseUserID: `${item.usrId}`,
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // };

  const selectFriendWithTravel = Friend => {
    console.log(Friend.usrId);
    setStackedDate({
      ...stackedDate,
      FriendName: Friend.usrId,
    });
    console.log(stackedDate);
  };
  return (
    <SafeAreaView style={styles.allContainer}>
      <ScrollView style={styles.scroll}>
        {myFriendsList.length === 0 ? (
          <Text>데이터 가져오는 중...</Text>
        ) : (
          myFriendsList.myFriends.map((item, i) => (
            <View key={i} style={styles.FriendsListRow}>
              <View style={styles.FriendsListColumn}>
                <Avatar.Image size={40} source={Avatars} />
                <Text style={styles.FriendsName}>{item.usrId}</Text>
              </View>
              <View style={styles.FriendsListColumn}>
                <Text style={styles.FashionTaste}> #캐주얼 #스트릿</Text>
              </View>
              <View>
                <View style={styles.FriendsListColumn}>
                  <Text style={styles.FriendsInfo}>나이:{item.usrAge}</Text>
                  <Text style={styles.FriendsInfo}>성별:{item.usrGender}</Text>
                </View>
                <LinearGradient
                  style={styles.deleteButtonContainer}
                  colors={['#e0c3fc', '#8ec5fc']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text
                    style={styles.deleteButton}
                    onPress={() => selectFriendWithTravel(item)}>
                    같이 가기
                  </Text>
                </LinearGradient>
              </View>
            </View>
          ))
        )}
        <View style={styles.nextButton}>
          <Button mode="outlined" onPress={goToPurposeOfTravel}>
            다음
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WhoDoYouGoWith;
const styles = StyleSheet.create({
  allContainer: {
    flexDirection: 'column',
  },
  scroll: {
    margin: 10,
  },
  FriendsListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 6,
  },
  FriendsListColumn: {
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  FashionTaste: {
    fontFamily: '오뮤_다예쁨체',
    fontSize: 23,
  },
  FriendsName: {
    textAlign: 'center',
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
  },
  FriendsInfo: {
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
  },
  deleteButtonContainer: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  deleteButton: {
    padding: 5,
    fontFamily: '오뮤_다예쁨체',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  nextButton: {
    position: 'relative',
    marginTop: 5,
  },
});
