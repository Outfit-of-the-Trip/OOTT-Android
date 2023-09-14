import React, {createContext, useState}  from 'react';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userInfoState } from '../states/atoms';
import { useSetRecoilState } from 'recoil';

// useContext 사용하여 상태를 전역변수처럼 사용
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});

  // login 기능 : Kakao API 사용 -> KakaoLogin.login()
  const login = async () => {
    KakaoLogin.login()
      .then(result => {
        console.log(result);
        getProfile();
      })
      .catch(error => {
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log('Login Cancel', error.message);
        } else {
          console.log(`Login Fail(code:${error.code})`, error.message);
        }
      });
  };

  // profile 가져오기 : KakaoLogin.getProfile()
  const getProfile = () => {
    KakaoLogin.getProfile()
      .then(result => {
        // UserInfo에 result값 저장. 이후 Navigation.js에서 로그인 여부 확인에 사용
        setUserInfo(result);
        // Local Storage에 유저 정보 저장
        AsyncStorage.setItem('userInfo', JSON.stringify(result));
      })
      .catch(error => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message);
      });
  };

  // logout 기능 : Local Storage에 유저 정보 삭제
  const logout = async () => {
    try {
      setUserInfo({});
      await AsyncStorage.removeItem('userInfo');
    } catch (e) {
      console.error(e.message);
    }
  };

  // login & logout 함수, userInfo 전역으로 사용가능하도록 return
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
