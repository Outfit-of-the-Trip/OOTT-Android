import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, TouchableOpacity} from 'react-native';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import MainScreen from '../../screens/MainScreen/MainScreen';
import Recomend from '../../screens/MainScreen/Recomend/Recomend';
import RecomendTop from '../../screens/MainScreen/DetailRecomend/RecomendTop';
import RecomendBottom from '../../screens/MainScreen/DetailRecomend/RecomendBottom';
import RecomendShose from '../../screens/MainScreen/DetailRecomend/RecomendShose';
import RecomendOutter from '../../screens/MainScreen/DetailRecomend/RecomendOutter';
import FriendsLook from '../../screens/MainScreen/FriendsLook/FriendsLook';
import ShoppingList from '../../screens/MainScreen/ShoppingList/ShoppingList';
import {AuthContext} from '../../utils/Auth';
import KeywordScreen from 'D:/RN/OOTT-Android/src/screens/MypageScreen/KeywordScreen.js';
import ClosetScreen from 'D:/RN/OOTT-Android/src/screens/MypageScreen/ClosetScreen.js';
import AbataScreen from 'D:/RN/OOTT-Android/src/screens/MypageScreen/AbataScreen.js';

import BottomTabs from './BottomTabNavigation';
import Toplogo from '../../assets/images/toplogo.png'

const Stack = createNativeStackNavigator();

const mainLogo = () => {
  return <Image style={{width: 72, height: 54}} source={Toplogo} />;
};

const Navigation = () => {
  // Auth 에서 받은 userInfo 값
  const {userInfo} = useContext(AuthContext);

  // 삼항연산자 사용. 만약 userInfo.id의 값이 존재한다면 MainScreen 랜더링
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{

          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          headerTitle: mainLogo,
        }}>
        {userInfo.id ? (
          <>
            <Stack.Screen
              name="bottomTab"
              component={BottomTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Recomend"
              component={Recomend}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="RecomendOutter"
              component={RecomendOutter}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="RecomendTop"
              component={RecomendTop}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="RecomendBottom"
              component={RecomendBottom}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="RecomendShose"
              component={RecomendShose}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="FriendsLook"
              component={FriendsLook}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="ShoppingList"
              component={ShoppingList}
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
