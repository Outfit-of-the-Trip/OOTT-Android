import React, { useEffect } from 'react'
import { SlickTabBarNavigator, DotSize } from 'rn-slick-bottom-tabs';
import {Image} from 'react-native';

import MainScreen from '../../screens/MainScreen/MainScreen';
import TravelScreen from '../../screens/PhotozoneScreen/PhotozoneScreen';
import OOTTScreen from '../../screens/OOTTScreen/OOTTScreen';
import FriendScreen from '../../screens/FriendScreen/FriendScreen';
import MypageScreen from '../../screens/MypageScreen/MypageScreen';
import RecomendSceen from '../../screens/OOTTScreen/RecomendSceen/RecomendSceen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tabs = SlickTabBarNavigator()

const TabBarIcon = (props) => {

    return (
        <Icon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.tintColor}
        />
    )
}

export default () => (
    <Tabs.Navigator backBehavior='history'
                    screenOptions={{
                        animation: 'slide_from_right'
                    }}
                    initialRouteName="MainScreen"
                    tabBarOptions={{
                    labelStyle: {fontSize: 14, marginTop: 2, fontWeight: 'bold'},
                                           activeTintColor: "#7A28CB",
                                           inactiveTintColor: "#9e9e9e",
                                           activeBackgroundColor: "#e5cfff",
                                           activeTabColor:'#7A28CB'
                    }}
                    appearance={{
                        dotSize:DotSize.MEDIUM,
                        dotCornerRadius:10
                    }}

    >
        <Tabs.Screen
            name="Home"
            component={MainScreen}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="home"
                    />
                ),

            }}
        />

        <Tabs.Screen
            name="Travel"
            component={TravelScreen}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="person"
                    />
                ),
            }}
        />

        <Tabs.Screen
            name="OOTT"
            component={RecomendSceen}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="rocket"
                    />
                ),
            }}
        />

        <Tabs.Screen
            name="Friends"
            component={FriendScreen}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="people"
                    />
                ),
            }}
        />

        <Tabs.Screen
                name="Mypage"
                component={MypageScreen}
                options={{
                    tabBarIcon: ({focused, color}) => (
                        <TabBarIcon
                            focused={focused}
                            tintColor={color}
                            name="person"
                        />
                    ),
                }}
            />

    </Tabs.Navigator>
)


