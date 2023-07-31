import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import MainScreen from "../screens/MainScreen/MainScreen";
import TravelScreen from "../screens/PhotozoneScreen/PhotozoneScreen"
import OOTTScreen from '../screens/OOTTScreen/OOTTScreen';
import FriendScreen from '../screens/FriendScreen/FriendScreen';
import MypageScreen from '../screens/MypageScreen/MypageScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = (props: any) => {
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel:false,
        }}>
        <Tab.Screen 
        name="홈" 
        component={MainScreen}
        options={{
            tabBarIcon: ({focused}) =>
              !focused ? (
                <Image
                  source={require('../assets/images/home.png')}
                />
              ) : (
                <Image
                  source={require('../assets/images/home.png')}
                />
              ),
          }} />
        <Tab.Screen name="포토존"
         component={TravelScreen}
         options={{
            tabBarIcon: ({focused}) =>
              !focused ? (
                <Image
                  source={require('../assets/images/photozone.png')}
                />
              ) : (
                <Image
                  source={require('../assets/images/photozone.png')}
                />
              ),
          }}
          />
        <Tab.Screen name="OOTT"
         component={OOTTScreen} 
         options={{
            tabBarShowLabel:false,
            tabBarIcon: ({focused}) =>
              !focused ? (
                <Image
                  source={require('../assets/images/bottomtablogo.png')}
                />
              ) : (
                <Image
                  source={require('../assets/images/bottomtablogo.png')}
                />
              ),
          }}
         />
        <Tab.Screen name="친구" 
        component={FriendScreen} 
        options={{
            tabBarIcon: ({focused}) =>
              !focused ? (
                <Image
                  source={require('../assets/images/friends.png')}
                />
              ) : (
                <Image
                  source={require('../assets/images/friends.png')}
                />
              ),
          }}
        />
        <Tab.Screen name="마이페이지"
         component={MypageScreen} 
         options={{
            tabBarIcon: ({focused}) =>
              !focused ? (
                <Image
                  source={require('../assets/images/mypage.png')}
                />
              ) : (
                <Image
                  source={require('../assets/images/mypage.png')}
                />
              ),
          }}
         />
      </Tab.Navigator>
    )
}

export default BottomTabs;