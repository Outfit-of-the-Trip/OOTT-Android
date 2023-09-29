import React, {useContext,useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import axios from 'axios';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import MainScreen from '../../screens/MainScreen/MainScreen';
import Recomend from '../../screens/MainScreen/Recomend/Recomend';
import IsFirstLoginScreen from '../../screens/IsFirstLoginScreen/IsFirstLoginScreen'
import RecomendDetail from '../../screens/OOTTScreen/RecomendSceen/RecomendDetail';
import FriendsLook from '../../screens/MainScreen/FriendsLook/FriendsLook';
import ShoppingList from '../../screens/MainScreen/ShoppingList/ShoppingList';
// import FriendInfoScreen from '../../screens/FriendScreen/FriendInfoScreen';
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
import RecomendSceen from '../../screens/OOTTScreen/RecomendSceen/RecomendSceen';

import Bottomtab from './BottomTabTest';
import { login } from '@react-native-seoul/kakao-login';

const Stack = createNativeStackNavigator();

const mainLogo = () => {
  return <Image style={{width: 100, height: 54}} source={Toplogo} />;
};
const Navigation = () => {
  const [isfirstlogin,setfirstlogin] = useState();
  // Auth 에서 받은 userInfo 값
  const {userInfo} = useContext(AuthContext);
  useEffect(() =>{
    requestGet();
  },[]);

  const requestGet = async () =>{
    try{
      const response = await axios.get(`http://10.0.2.2:3000/api/users/getUserInfo?userId=${userInfo.nickname}`)
      setfirstlogin(response.data.usrCreateAt)
      console.log("새로운",response.data.usrCreateAt)
    }catch(e){
      console.error(e)
    }
  }

/*   useEffect(() => { //사용자 데이터 
    axios.get(`http://10.0.2.2:3000/api/users/getUserInfo?userId=${userInfo.nickname}`)
      .then(function (response) {
        setfirstlogin(response.data.usrCreateAt)
        data = response.data.usrCreateAt
        console.log("ㄷㅇㅌ",data)
        console.log("왜안먹어",isfirstlogin);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []); */

  // 삼항연산자 사용. 만약 userInfo.id의 값이 존재한다면 MainScreen 랜더링
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade_from_bottom',
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          headerTitle: mainLogo,
        }}>
        {userInfo.id ? (
          <>
          {isfirstlogin === null ? (
          <>
          <Stack.Screen
              name="IsFirstLoginScreen"
              component={IsFirstLoginScreen}
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
              name="Recomend"
              component={Recomend}
              options={{headerShown: true}}
            />

            <Stack.Screen
              name="RecomendDetail"
              component={RecomendDetail}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="FriendsLook"
              component={FriendsLook}
              options={{headerShown: true}}
            />
            <Stack.Screen name="ShoppingList" component={ShoppingList} />
            <Stack.Screen
              name="RecomendSceen"
              component={RecomendSceen}
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
            </> ) : (
             <>
             <Stack.Screen
               name="Root"
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
              name="Recomend"
              component={Recomend}
              options={{headerShown: true}}
            />

            <Stack.Screen
              name="RecomendDetail"
              component={RecomendDetail}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="FriendsLook"
              component={FriendsLook}
              options={{headerShown: true}}
            />
            <Stack.Screen name="ShoppingList" component={ShoppingList} />
            <Stack.Screen
              name="RecomendSceen"
              component={RecomendSceen}
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
            </>)}
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
