import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import axios from 'axios';
import { backendURL } from '../../constants/url';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import MainScreen from '../../screens/MainScreen/MainScreen';
import IsFirstLoginScreen from '../../screens/IsFirstLoginScreen/IsFirstLoginScreen';
import RecommendDetail from '../../screens/OOTTScreen/RecomendSceen/RecommendDetail';
import FriendsLook from '../../screens/MainScreen/FriendsLook/FriendsLook';
import ShoppingList from '../../screens/MainScreen/ShoppingList/ShoppingList';
import FirstSetting from '../../screens/FirstSetting/FirstSetting';
import OOTTScreen from '../../screens/OOTTScreen/OOTTScreen';
import MypageScreen from '../../screens/MypageScreen/MypageScreen';

import {AuthContext} from '../../utils/Auth';
import KeywordScreen from '../../screens/MypageScreen/KeywordScreen';
import ClosetScreen from '../../screens/MypageScreen/ClosetScreen/ClosetScreen';
import AbataScreen from '../../screens/MypageScreen/AbataScreen';
import Toplogo from '../../assets/images/toplogo.png';
import Rest from '../../assets/images/rest.jpg';

import TravelPlace from '../../screens/OOTTScreen/TravelPlace/TravelPlace';
import TravelFriends from '../../screens/OOTTScreen/TravelFriends/TravelFriends';
import TravelCategory from '../../screens/OOTTScreen/TravelCategory/TravelCategory';
import RecommendScreen from '../../screens/OOTTScreen/RecomendSceen/RecommendScreen';

import TravelDetailScreen from '../../screens/MainScreen/TravelDetailScreen';

import Bottomtab from './BottomTab';
import {login} from '@react-native-seoul/kakao-login';

const Stack = createNativeStackNavigator();

const mainLogo = () => {
  return <Image style={{width: 100, height: 54}} source={Toplogo} />;
};
const Navigation = () => {
  const [isfirstlogin, setfirstlogin] = useState(false);
  // Auth 에서 받은 userInfo 값
  const {userInfo} = useContext(AuthContext);

  useEffect(() => {
    //사용자 데이터
    axios.get(backendURL+`/api/users/getUserInfo?userId=`+userInfo.nickname)
      .then(function (response) {
        setfirstlogin(() => {
          let data = response.data.usrCreateAt;
          if (data == null) {
            return true;
          } else {
            return false;
          }
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [isfirstlogin]);

  // 삼항연산자 사용. 만약 userInfo.id의 값이 존재한다면 MainScreen 랜더링
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade_from_bottom',
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          headerTitle: mainLogo,
          contentStyle: {borderBottomColor: 'white'},
        }}>
        {userInfo.id ? (
          <>
            {isfirstlogin ? (
              <>
                <Stack.Screen
                  name="Bottomtab"
                  component={Bottomtab}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="MainScreen"
                  component={MainScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="TravelDetailScreen"
                  component={TravelDetailScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="OOTTScreen"
                  component={OOTTScreen}
                  options={{headerShown: true}}
                />

                <Stack.Screen
                  name="RecommendDetail"
                  component={RecommendDetail}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="FriendsLook"
                  component={FriendsLook}
                  options={{headerShown: true}}
                />
                <Stack.Screen name="ShoppingList" component={ShoppingList} />
                <Stack.Screen
                  name="RecommendScreen"
                  component={RecommendScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="TravelPlace"
                  component={TravelPlace}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="TravelFriends"
                  component={TravelFriends}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="TravelCategory"
                  component={TravelCategory}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="KeywordScreen"
                  component={KeywordScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="ClosetScreen"
                  component={ClosetScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="AbataScreen"
                  component={AbataScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="MypageScreen"
                  component={MypageScreen}
                  options={{headerShown: true}}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="IsFirstLoginScreen"
                  component={IsFirstLoginScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="FirstSetting"
                  component={FirstSetting}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Bottomtab"
                  component={Bottomtab}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="MainScreen"
                  component={MainScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="OOTTScreen"
                  component={OOTTScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="RecommendDetail"
                  component={RecommendDetail}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="FriendsLook"
                  component={FriendsLook}
                  options={{headerShown: true}}
                />
                <Stack.Screen name="ShoppingList" component={ShoppingList} />
                <Stack.Screen
                  name="RecommendScreen"
                  component={RecommendScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="TravelPlace"
                  component={TravelPlace}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="TravelFriends"
                  component={TravelFriends}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="TravelCategory"
                  component={TravelCategory}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="KeywordScreen"
                  component={KeywordScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="ClosetScreen"
                  component={ClosetScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="AbataScreen"
                  component={AbataScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="MypageScreen"
                  component={MypageScreen}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name="TravelDetailScreen"
                  component={TravelDetailScreen}
                  options={{headerShown: true}}
                />
                
              </>
            )}
          </>
        ) : (
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;