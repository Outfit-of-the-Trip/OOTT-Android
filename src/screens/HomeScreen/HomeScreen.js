import React, {useContext} from 'react';
import {AuthContext} from '../../utils/Auth';
import { ImageBackground } from 'react-native';
import launch_screen from '../../assets/images/launch_screen_dark.png'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const HomeScreen = () => {
  const {login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground
      source={launch_screen}
      style={{ width: "100%", height: "100%" ,justifyContent:"flex-end"}}
      blurRadius={5}
      resizeMode='cover'>
      <View style={styles.header}>
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
        <TouchableOpacity onPress={() => login()}>
          <Image
            sytle={styles.KakaoLoginButton}
            source={require('../../assets/images/kakao.png')}
          />
        </TouchableOpacity>
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

export default HomeScreen;
