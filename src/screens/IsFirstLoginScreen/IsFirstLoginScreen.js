import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import { ImageBackground,Button } from 'react-native';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import firstimge from '../../assets/images/isfirstlogin.jpg'


const IsFirstLoginScreen = () => {
    const navigation = useNavigation();
    const gotoSetFavorite = () => {
        navigation.navigate('Bottomtab');
      };
  return (
    <View style={styles.container}>
      <ImageBackground
      source={firstimge}
      style={{ width: "100%", height: "100%" ,justifyContent:"flex-end"}}
      blurRadius={5}
      resizeMode='cover'>
      <View style={styles.header}>
        <Text
          style={{color:'white',fontFamily:'Giants-Regular'}}>사용자 맞춤형 코디 추천</Text>
      </View>
      <View
        style={{backgroundColor:"red",}}>
      </View>
      <View style={styles.landing}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/images/logo.png')}
        />
        <Text
          style={{color:'white',fontFamily:'Giants-Bold'}}>OUTFIT OF THE TRAVEL</Text>
      </View>

      <View style={styles.kakaoLogin}>
        <Button
            title='Start OOTT'
            onPress={gotoSetFavorite}
            style={{borderColor:'white',elevation:10}}
            />
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 0,
    backgroundColor: 'white',
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
    justifyContent:'center'
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
