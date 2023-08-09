import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity} from 'react-native';

import MainScreen from '../screens/MainScreen/MainScreen';
import TravelScreen from '../screens/PhotozoneScreen/PhotozoneScreen';
import OOTTScreen from '../screens/OOTTScreen/OOTTScreen';
import FriendScreen from '../screens/FriendScreen/FriendScreen';
import MypageScreen from '../screens/MypageScreen/MypageScreen';

import Toplogo from '../assets/images/toplogo.png';
import Settings from '../assets/images/settings.png';
const Tab = createBottomTabNavigator();

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
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerTitle: mainLogo,
        headerRight: settingsLogo,
      }}>
      <Tab.Screen
        name="홈"
        component={MainScreen}
        options={{
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Image source={require('../assets/images/uhome.png')} />
            ) : (
              <Image source={require('../assets/images/home.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="포토존"
        component={TravelScreen}
        options={{
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Image source={require('../assets/images/uphotozone.png')} />
            ) : (
              <Image source={require('../assets/images/photozone.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="OOTT"
        component={OOTTScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Image source={require('../assets/images/bottomlogo.png')} />
            ) : (
              <Image source={require('../assets/images/bottomlogo.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="친구"
        component={FriendScreen}
        options={{
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Image source={require('../assets/images/ufriends.png')} />
            ) : (
              <Image source={require('../assets/images/friends.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MypageScreen}
        options={{
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Image source={require('../assets/images/umypage.png')} />
            ) : (
              <Image source={require('../assets/images/mypage.png')} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
