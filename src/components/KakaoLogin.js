import React from 'react';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import {
    StyleSheet,
    Image,
    TouchableOpacity
  } from 'react-native';

const Login = () => {
    return (
        <TouchableOpacity onPress={() => login()}>
            <Image
                sytle={styles.KakaoLoginButton}
                source={require('images/kakao.png')}
            />
        </TouchableOpacity>

    );
  }
  
  const login = () => {
    KakaoLogin.login().then((result) => {
        console.log("Login Success", JSON.stringify(result));
        getProfile();
    }).catch((error) => {
        if (error.code === 'E_CANCELLED_OPERATION') {
            console.log("Login Cancel", error.message);
        } else {
            console.log(`Login Fail(code:${error.code})`, error.message);
        }
    });
  };

const getProfile = () => {
    KakaoLogin.getProfile().then((result) => {
        console.log("GetProfile Success", JSON.stringify(result));
    }).catch((error) => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message);
    });
};

const styles = StyleSheet.create({
    KakaoLoginButton:{
        resizeMode: "contain",
    },
      
})

export default Login;