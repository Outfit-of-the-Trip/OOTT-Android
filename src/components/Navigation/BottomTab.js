import React from 'react';
import {SlickTabBarNavigator, DotSize} from 'rn-slick-bottom-tabs';

import MainScreen from '../../screens/MainScreen/MainScreen';
import TravelScreen from '../../screens/PhotozoneScreen/PhotozoneScreen';
import OOTTScreen from '../../screens/OOTTScreen/OOTTScreen';
import MypageScreen from '../../screens/MypageScreen/MypageScreen';
import FriendSelectScreen from '../../screens/FriendScreen/FriendSelectScreen';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Tabs = SlickTabBarNavigator();

const TabBarIcon = props => {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.tintColor}
    />
  );
};

export default () => (
  <Tabs.Navigator
    backBehavior="history"
    screenOptions={{
      animation: 'slide_from_right',
    }}
    initialRouteName="MainScreen"
    tabBarOptions={{
      labelStyle: {fontSize: 14, marginTop: 2, fontWeight: 'bold'},
      activeTintColor: '#7A28CB',
      inactiveTintColor: '#9e9e9e',
      activeBackgroundColor: '#e5cfff',
      activeTabColor: '#7A28CB',
    }}
    appearance={{
      dotSize: DotSize.MEDIUM,
      dotCornerRadius: 10,
    }}>
    <Tabs.Screen
      name="Home"
      component={MainScreen}
      options={{
        tabBarIcon: ({focused, color}) => (
          <TabBarIcon focused={focused} tintColor={color} name="home" />
        ),
      }}
    />

    <Tabs.Screen
      name="Travel"
      component={TravelScreen}
      options={{
        tabBarIcon: ({focused, color}) => (
          <TabBarIcon focused={focused} tintColor={color} name="airplanemode-on" />
        ),
      }}
    />

    <Tabs.Screen
      name="OOTT"
      component={OOTTScreen}
      options={{
        tabBarIcon: ({focused, color}) => (
          <TabBarIcon focused={focused} tintColor={color} name="rocket" />
        ),
      }}
    />

    <Tabs.Screen
      name="Friend"
      component={FriendSelectScreen}
      options={{
        tabBarIcon: ({focused, color}) => (
          <TabBarIcon focused={focused} tintColor={color} name="people" />
        ),
      }}
    />

    <Tabs.Screen
      name="Mypage"
      component={MypageScreen}
      options={{
        tabBarIcon: ({focused, color}) => (
          <TabBarIcon focused={focused} tintColor={color} name="person" />
        ),
      }}
    />
  </Tabs.Navigator>
);
