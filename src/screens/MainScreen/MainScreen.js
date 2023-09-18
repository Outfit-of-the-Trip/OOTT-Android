import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useWindowDimensions} from 'react-native';
import {Avatar} from '@rneui/themed';
import axios from 'axios';
import more from '../../assets/images/more.png';
import {AuthContext} from '../../utils/Auth';
import {BlurView} from '@react-native-community/blur';

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import EmptyScreen from '../../components/EmptyScreen';
import recomendOOTT from '../../assets/images/recomendOOTT.png';

const MainScreen = () => {
  const {userInfo} = useContext(AuthContext);
  const navigation = useNavigation();
  const width = useWindowDimensions().width; //기기 넓이

  const [data, setData] = useState([]);
  const [travelea, settravelea] = useState(); //등록된 여행 개수
  const [friend, setfriend] = useState();
  const [dbUsrname, setDbUsrname] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [friendsInfo, setFriendsInfo] = useState([]);

  const gotoRecomend = travledata => {
    navigation.navigate('Recomend', travledata, userInfo);
  };
  const gotoFrineds = () => {
    return navigation.navigate('친구');
  };
  const gotoOOTT = () => {
    return navigation.navigate('OOTTScreen');
  };

  const translate = item => {
    // 날짜 정리 메서드
    var data = String(item);
    var input = data.substring(0, 10);
    return input;
  };

  const RecomendModal = isvisible => {
    return (
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <BlurView
          style={{zIndex: 5, flex: 1}}
          blurType="light" // Change blurType as needed (light, dark, extra light)
          blurAmount={5}>
          <View
            style={{
              zIndex: 10,
              flex: 1,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={recomendOOTT} />
            <Text>환영합니다 ! 처음 로그인하시네요</Text>
            <Text>기본 정보를 등록하시고 OOTT를 사용하세요!</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>이동하기</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    );
  };

  const closeModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    //사용자 친구 데이터
    axios
      .get('http://10.0.2.2:3000/api/friends/myFriends?userId=a')
      .then(function (response) {
        setfriend(response.data.length);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    //사용자 데이터
    axios
      .get(`http://10.0.2.2:3000/api/test/getUserTable`)
      .then(function (response) {
        setDbUsrname(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  // 유저가 테이블에 포함되어 있는지 확인하는 로직
  useEffect(() => {
    axios
      .get('http://10.0.2.2:3000/api/test/getUserTable')
      .then(function (response) {
        setFriendsInfo(response.data);
        const getUserData = friendsInfo.filter(
          item => item.profile_nickname === userInfo.nickname,
        );
        console.log(friendsInfo);
        console.log(getUserData.length);
        if (getUserData.length < 1) {
          setIsModalVisible(true);
        } else {
          setIsModalVisible(false);
        }
      })
      .catch(function (e) {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    //여행정보 데이터
    axios
      .get('http://10.0.2.2:3000/api/travel/getMyTravelInfo?userId=a')
      .then(function (response) {
        settravelea(response.data.length);
        setData(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const Showlog = () => {
    if (travelea > 0) {
      return (
        <View>
          <FlatList
            data={data}
            renderItem={({item, index}) => (
              <View key={index} style={styles.recomendconatiner}>
                <View style={styles.recotopcontainer}>
                  <View
                    style={[
                      styles.viewcontainer,
                      {
                        marginHorizontal: width - (width - 10),
                        marginBottom: width - (width - 10),
                      },
                    ]}>
                    <Text style={styles.datetext}>
                      {translate(item.travlDate)} to {item.travlPlace}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => gotoRecomend(item)}>
                    <Image source={more} />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.viewcontainer,
                    {marginHorizontal: width - (width - 10)},
                  ]}>
                  <Text style={styles.tagtext}>태그</Text>
                </View>
              </View>
            )}
          />
        </View>
      );
    } else {
      return <EmptyScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RecomendModal isvisible={isModalVisible} />
      <View style={styles.profile}>
        <View style={styles.profileimgconatiner}>
          <Avatar
            size={80}
            rounded
            source={{
              uri: userInfo.profileImageUrl,
            }}
          />
          <Text style={styles.profileimgename}>{userInfo.nickname}</Text>
        </View>
        <View style={styles.profileinfoconatiner}>
          <View style={styles.profiletextcontainer}>
            <Text style={styles.profilebigtext}>{travelea}</Text>
            <Text style={styles.profiletext}>mylog</Text>
          </View>
          <View style={styles.profiletextcontainer}>
            <TouchableOpacity onPress={gotoFrineds}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.profilebigtext}>{friend}</Text>
                <Text style={styles.profiletext}>Friend</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomline} />
      <View style={{flex: 4.6}}>
        <Showlog />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  profileimgename: {
    color: 'black',
    fontSize: 24,
    fontFamily: '오뮤_다예쁨체',
  },
  profileimgconatiner: {
    flex: 0.5,
    alignItems: 'center',
  },
  recomendconatiner: {
    flex: 1,
    marginTop: '3%',
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  viewcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  friends: {
    flex: 1,
    marginTop: 30,
  },
  profileImgae: {
    flex: 1,
    resizeMode: 'contain',
  },
  profileinfoconatiner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profiletextcontainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  recoimgae: {
    flex: 1,
    resizeMode: 'contain',
  },
  recotopcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagtext: {
    color: 'black',
    fontSize: 24,
    fontFamily: '오뮤_다예쁨체',
  },
  datetext: {
    color: 'black',
    fontSize: 24,
    fontFamily: '오뮤_다예쁨체',
  },
  bottomline: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  profilebigtext: {
    color: 'black',
    fontSize: 32,
    fontFamily: '오뮤_다예쁨체',
  },
  profiletext: {
    color: 'black',
    fontSize: 24,
    fontFamily: '오뮤_다예쁨체',
  },
});

export default MainScreen;
