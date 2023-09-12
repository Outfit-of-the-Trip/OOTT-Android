import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, TouchableOpacity} from 'react-native';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import MainScreen from '../../screens/MainScreen/MainScreen';
import Recomend from '../../screens/MainScreen/Recomend/Recomend';
import DetailRecomend from '../../screens/MainScreen/DetailRecomend/DetailRecomend';
import FriendsLook from '../../screens/MainScreen/FriendsLook/FriendsLook';
import {AuthContext} from '../../utils/Auth';

import BottomTabs from './BottomTabNavigation';
import Toplogo from '../../assets/images/toplogo.png'
import Settings from '../../assets/images/settings.png'

import TravelPlace from '../../screens/OOTTScreen/TravelPlace/TravelPlace';
import TravelFriends from '../../screens/OOTTScreen/TravelFriends/TravelFriends';
import TravelCategory from '../../screens/OOTTScreen/TravelCategory/TravelCategory';
import RecomendSceen from '../../screens/OOTTScreen/RecomendSceen/RecomendSceen';

const Stack = createNativeStackNavigator();

const mainLogo = () => {
  return <Image style={{width: 72, height: 54}} source={Toplogo} />;
};
const settingsLogo = () => {
  return (
    <TouchableOpacity>
      <Image
        style={{width: 40, height: 40, marginRight: 5}}
        source={Settings}
      />
    </TouchableOpacity>
  );
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
          headerRight: settingsLogo,
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
              name="DetailRecomend"
              component={DetailRecomend}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="FriendsLook"
              component={FriendsLook}
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
              name="RecomendSceen"
              component={RecomendSceen}
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
