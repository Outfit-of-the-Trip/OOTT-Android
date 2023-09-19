import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../utils/Auth';
import axios from 'axios';
import {Drawer} from 'react-native-paper';

const MypageScreen = () => {
  const {userInfo} = useContext(AuthContext);
  // console.log(userInfo);
  const [entireUserInfo, setEntireUserInfo] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState('');

  const navigation = useNavigation();

  const gotoKeywordScreen = () => {
    return navigation.navigate('KeywordScreen');
  };
  const gotoClosetScreen = () => {
    return navigation.navigate('ClosetScreen');
  };
  const gotoAbataScreen = () => {
    return navigation.navigate('AbataScreen');
  };

  useEffect(() => {
    const getallFriendInfo = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:3000/api/test/getUserTable',
        );
        setEntireUserInfo(response.data);
        const friendsData = entireUserInfo.filter(
          item => item.usrId === userInfo.nickname,
        );
        // console.log(friendsData);
      } catch (e) {
        console.log(e);
      }
    };
    getallFriendInfo();
  }, []);

  useEffect(() => {
    // console.log(entireUserInfo);
  }, []);

  return (
    <View style={{flex: 3}}>
      <Drawer.Section title="MyPage list">
        <Drawer.Item
          label="아바타 설정하기"
          active={active === '아바타 설정하기'}
          onPress={() => setActive('아바타 설정하기')}
          icon="account-supervisor"
        />
        <Drawer.Item
          label="패션 키워드 설정하기"
          active={active === '패션 키워드 설정하기'}
          onPress={() => setActive('패션 키워드 설정하기')}
        />
        <Drawer.Item
          label="로그아웃"
          active={active === '로그아웃'}
          onPress={() => setActive('로그아웃')}
        />
      </Drawer.Section>
      <View style={styles.profileContainer}>
        <View style={styles.porfImgContainer}>
          <Image
            style={styles.profileImage}
            source={{uri: userInfo.profileImageUrl}}
          />
        </View>
        <View style={styles.profileList}>
          <View style={styles.userProfileContainer}>
            <Text style={styles.category}>Name </Text>
            <Text style={styles.usrvalues}>{userInfo.nickname}</Text>
          </View>
          <View style={styles.userProfileContainer}>
            <Text style={styles.category}>이메일</Text>
            <Text style={styles.usrvalues}>{userInfo.email}</Text>
          </View>
          <View style={styles.userProfileContainer}>
            <Text style={styles.category}>선호 스타일</Text>
            <Text style={styles.usrvalues}>와이드 키치</Text>
          </View>
        </View>
      </View>
      <View style={styles.all}>
        <TouchableOpacity
          onPress={gotoAbataScreen}
          style={styles.buttonWithBackground}>
          <Text style={styles.btnText}>아바타 설정하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={gotoKeywordScreen}
          style={styles.buttonWithoutBackground}>
          <Text style={styles.btnTexts}>패션 키워드 설정하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={gotoClosetScreen}
          style={styles.buttonWithBackground}>
          <Text style={styles.btnText}>옷장 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWithoutBackground}>
          <Text style={styles.btnTexts}>라이센스</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWithBackground}>
          <Text style={styles.btnText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ModalScreen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  porfImgContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    flexDirection: 'row',
  },
  profileImage: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  profileList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  userProfileContainer: {
    paddingVertical: 5,
  },
  category: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
  },
  usrvalues: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#9F81F7',
  },
  profContent: {
    fontSize: 18, // 버튼 텍스트 크기
    fontWeight: '900',
  },
  all: {
    flex: 2.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonWithBackground: {
    width: '80%',
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.4,
    borderColor: '#7401DF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    margin: 10,
    backgroundColor: '#7401DF',
  },
  buttonWithoutBackground: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.4,
    borderColor: '#7401DF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    margin: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '400',
  },
  btnTexts: {
    textAlign: 'center',
    color: 'black',
    fontSize: 22,
    fontWeight: '400',
  },
});

export default MypageScreen;
