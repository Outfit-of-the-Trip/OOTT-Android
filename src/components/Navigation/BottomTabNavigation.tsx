import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity} from 'react-native';

import MainScreen from '../../screens/MainScreen/MainScreen';
import TravelScreen from '../../screens/PhotozoneScreen/PhotozoneScreen';
import OOTTScreen from '../../screens/OOTTScreen/OOTTScreen';
import FriendScreen from '../../screens/FriendScreen/FriendScreen';
import MypageScreen from '../../screens/MypageScreen/MypageScreen';

import Toplogo from '../../assets/images/toplogo.png'
import Settings from '../../assets/images/Settings.png'
import home from '../../assets/images/home.png'
import uhome from '../../assets/images/uhome.png'
import photozone from '../../assets/images/photozone.png'
import uphotozone from '../../assets/images/uphotozone.png'
import friends from '../../assets/images/friends.png'
import ufriends from '../../assets/images/ufriends.png'
import mypage from '../../assets/images/mypage.png'
import umypage from '../../assets/images/umypage.png'
import bottomlogo from '../../assets/images/bottomlogo.png'

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
              <Image source={uhome} />
            ) : (
              <Image source={home} />
            ),
        }}
      />
      <Tab.Screen
        name="포토존"
        component={TravelScreen}
        options={{
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Image source={uphotozone} />
            ) : (
              <Image source={photozone} />
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
              <Image source={bottomlogo} />
            ) : (
              <Image source={bottomlogo} />
            ),
        }}
      />
      <Tab.Screen
        name="친구"
        component={FriendScreen}
        options={{
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Image source={ufriends} />
            ) : (
              <Image source={friends} />
            ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MypageScreen}
        options={{
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Image source={umypage} />
            ) : (
              <Image source={mypage} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
