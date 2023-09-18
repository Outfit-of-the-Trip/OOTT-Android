import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ProfileImg from '../../assets/images/profileImg.png';

const MypageScreen = () => {
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

  return (
    <View style={{flex: 3}}>
      <View style={styles.profileContainer}>
        <View style={styles.porfImgContainer}>
          <Image style={styles.profileImage} source={ProfileImg} />
        </View>
        <View style={styles.profileList}>
          <View style={styles.name}>
            <Text style={styles.text}>이름</Text>
            <Text style={styles.profContent}>양준민</Text>
          </View>
          <View style={styles.nickname}>
            <Text style={styles.text}>닉네임</Text>
            <Text style={styles.profContent}>user2</Text>
          </View>
          <View style={styles.keyword}>
            <Text style={styles.text}>선호하는 패션 키워드</Text>
            <Text style={styles.profContent}>와이드 키치</Text>
          </View>
        </View>
      </View>
      <View style={styles.all}>
        <TouchableOpacity onPress={gotoAbataScreen} style={styles.abataBtn}>
          <Text style={styles.btnText}>아바타 설정하기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={gotoKeywordScreen} style={styles.keywordBtn}>
          <Text style={styles.btnText}>패션 키워드 설정하기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={gotoClosetScreen} style={styles.closetBtn}>
          <Text style={styles.btnText}>옷장 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              '오픈 라이센스',
              '이거 쓰고 저거 쓰고 이것저것 스고 다섯서어어어ㅓ어어어',
              [{text: '확인', onPress: () => console.log('OK')}],
            )
          }
          style={styles.closetBtn}>
          <Text style={styles.btnText}>라이센스</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('My title', 'My msg', [
              {text: 'Yes', onPress: () => console.log('Yes')},
              {text: 'No', onPress: () => console.log('No')},
            ])
          }
          style={styles.logoutBtn}>
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
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  profileList: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  name: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  nickname: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  keyword: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  profContent: {
    fontSize: 18, // 버튼 텍스트 크기
    fontWeight: '900',
  },
  all: {
    backgroundColor: '#FFFFFF',
    flex: 1.8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  abataBtn: {
    backgroundColor: '#FFFFFF', // 버튼 배경색
    paddingVertical: 10,
    paddingHorizontal: 95,
    borderRadius: 20, // 버튼 테두리 둥글기
    borderWidth: 1.4, // 버튼 테두리 두께
    borderColor: '#007AFF', // 버튼 테두리 색상
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 6, // 그림자 둥글기
    elevation: 6, // Android의 그림자 효과
    margin: 10,
  },
  keywordBtn: {
    backgroundColor: '#FFFFFF', // 버튼 배경색
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 20, // 버튼 테두리 둥글기
    borderWidth: 1.4, // 버튼 테두리 두께
    borderColor: '#007AFF', // 버튼 테두리 색상
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 6, // 그림자 둥글기
    elevation: 6, // Android의 그림자 효과
    margin: 10,
  },
  closetBtn: {
    backgroundColor: '#FFFFFF', // 버튼 배경색
    paddingVertical: 10,
    paddingHorizontal: 120,
    borderRadius: 20, // 버튼 테두리 둥글기
    borderWidth: 1.4, // 버튼 테두리 두께
    borderColor: '#007AFF', // 버튼 테두리 색상
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 6, // 그림자 둥글기
    elevation: 6, // Android의 그림자 효과
    margin: 10,
  },
  logoutBtn: {
    backgroundColor: '#FFFFFF', // 버튼 배경색
    paddingVertical: 10,
    paddingHorizontal: 123,
    borderRadius: 20, // 버튼 테두리 둥글기
    borderWidth: 1.4, // 버튼 테두리 두께
    borderColor: '#007AFF', // 버튼 테두리 색상
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 6, // 그림자 둥글기
    elevation: 6, // Android의 그림자 효과
    margin: 10,
  },
  btnText: {
    color: '#007AFF', // 버튼 텍스트 색상
    fontSize: 22, // 버튼 텍스트 크기
    fontWeight: '400',
  },
});

export default MypageScreen;
