import React, {useContext, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext,  } from '../../utils/Auth';
import axios from 'axios';
import { backendURL } from '../../constants/url';
import { NativeBaseProvider, Pressable, HamburgerIcon, Menu, Box } from "native-base";
import ClosetScreen from './ClosetScreen/ClosetScreen';
import KeywordScreen from './KeywordScreen';


import {
  View, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Image,
  Button,
} from 'react-native';


const MypageScreen = () => {

  const navigation = useNavigation();

  const gotoTravelPlace = () => {
    return navigation.navigate('KeywordScreen');
  };

  const {userInfo} = useContext(AuthContext);
  const {logout} = useContext(AuthContext);

  const MenuSlide = () => {  
    return(
      <Box h="10%" w="10%" alignItems="flex-start">
      <Menu w="170" trigger={triggerProps => {
        return <Pressable {...triggerProps}>
                <HamburgerIcon size={30}/>
              </Pressable>;
      }}>
          <Menu.Item onPress={gotoTravelPlace}>패션 키워드 설정</Menu.Item>
          <Menu.Item onPress={()=>console.log("아바타")}>아바타 설정</Menu.Item>
          <Menu.Item onPress={logout}>로그아웃</Menu.Item>
        </Menu>
        </Box>
    )
  }

  return (
    <NativeBaseProvider>
      <View style={styles.rootContainer}>
        
        <View style={styles.menuContainer}>
            <MenuSlide />
        </View>
       

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


        <View style={styles.closetContainer}>
          <ClosetScreen/>
        </View>


        </View>
    </NativeBaseProvider>
    
   

  );
};

const styles = StyleSheet.create({
  rootContainer:{
    backgroundColor: "white",
    flex:1,
  },

  menuContainer:{
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  profileContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  closetContainer: {
    flex: 8,
  },

  menuButton: {
    margin: 10,
    backgroundColor: "skyblue"
  },

  ModalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  porfImgContainer: {
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
    flex: 1.3,
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
    fontWeight: 'bold',
  },
  usrvalues: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9F81F7',
  },
  profContent: {
    fontSize: 18, // 버튼 텍스트 크기
    fontWeight: '900',
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
