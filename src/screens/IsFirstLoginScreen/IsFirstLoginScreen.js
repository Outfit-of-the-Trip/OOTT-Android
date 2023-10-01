import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import firstimge from '../../assets/images/isfirstlogin.jpg'
import { Button } from 'react-native-paper';

const IsFirstLoginScreen = () => {

    const navigation = useNavigation();
    
    const gotoSetFavorite = () => {
        navigation.navigate('FirstSetting');
      };

  return (
    <View style={styles.container}>
      <ImageBackground
      source={firstimge}
      style={{ width: "100%", height: "100%" ,justifyContent:"flex-end"}}
      blurRadius={5}
      resizeMode='cover'>
      <View style={styles.header}>
      </View>
      <View
        style={{backgroundColor:"red",}}>
      </View>
      <View style={styles.landing}>
        <Text
          style={{color:'white',fontFamily:'SCDream8',fontSize:50}}>FIND
        </Text>
        <Text
          style={{color:'white',fontFamily:'SCDream9',fontSize:20}}>your
        </Text>
        <Text
          style={{color:'white',fontFamily:'SCDream8',fontSize:50}}>FASHION
        </Text>
        <View
          style={{marginTop:20,alignItems:"center",justifyContent:"center"}}>
        <Text
          style={{color:'white',fontFamily:'SCDream4'}}>사용자 맞춤형 여행코디 추천
        </Text>
        <Text
          style={{color:'white',fontFamily:'SCDream4'}}>당신의 코디를 찾아보세요
        </Text>
        </View>
      </View>

      <View style={styles.kakaoLogin}>
        <Button
          mode='outlined'
          onPress={gotoSetFavorite}
          textColor='white'
          labelStyle={{fontFamily:'SCDream4',fontSize:15}}
          style={{marginTop:50,
            borderStyle: 'solid',
            borderwidth:10,
            borderColor:'white',
            paddingHorizontal:50,
            borderRadius: 5,}}>Start OOTT</Button>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 0,
  },

  header: {
    flex: 0.5,
  },

  landing: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    paddingLeft:10
  },

  kakaoLogin: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flext-start'
  },

  tinyLogo: {
    resizeMode: 'contain',
    width: 300,
    height: 300,
  },

  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },

  text: {
    color: '#09020A',
    fontWeight: 'bold',
    fontSize: 30,
  },

  KakaoLoginButton: {
    resizeMode: 'contain',
  },
});

export default IsFirstLoginScreen;
