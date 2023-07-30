import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
            tabBarShowLabel: false,
        }}>
        <Tab.Screen name="Home" component={MainScreen} />
        <Tab.Screen name="Photozone" component={TravelScreen} />
        <Tab.Screen name="OOTT" component={OOTTScreen} />
        <Tab.Screen name="Friend" component={FriendScreen} />
        <Tab.Screen name="Mypage" component={MypageScreen} />
      </Tab.Navigator>
    )
}

export default BottomTabs;