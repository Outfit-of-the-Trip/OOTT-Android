import React from 'react'

import {     SlickTabBarNavigator, DotSize } from 'rn-slick-bottom-tabs';
import {Image} from 'react-native';

import {Ionicons as Icon} from '@expo/vector-icons'

import MainScreen from '../../screens/MainScreen/MainScreen';
import TravelScreen from '../../screens/PhotozoneScreen/PhotozoneScreen';
import OOTTScreen from '../../screens/OOTTScreen/OOTTScreen';
import FriendScreen from '../../screens/FriendScreen/FriendScreen';
import MypageScreen from '../../screens/MypageScreen/MypageScreen';

const Tabs = SlickTabBarNavigator()

const TabBarIcon = (props) => {

    return (
        // <Icon
        //     name={props.name}
        //     size={props.size ? props.size : 24}
        //     color={props.tintColor}
        // />
        <Image
            style={{width: 20, height: 20}}
            source = {{uri : "https://cdn-icons-png.flaticon.com/128/3917/3917032.png"}}
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
            name="MainScreen"
            component={MainScreen}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="home-sharp"
                    />
                ),

            }}
        />

        <Tabs.Screen
            name="TravelScreen"
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
            name="OOTTScreen"
            component={OOTTScreen}
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
            name="FriendScreen"
            component={FriendScreen}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="ios-notifications"
                    />
                ),
            }}
        />

        <Tabs.Screen
                name="MypageScreen"
                component={MypageScreen}
                options={{
                    tabBarIcon: ({focused, color}) => (
                        <TabBarIcon
                            focused={focused}
                            tintColor={color}
                            name="ios-notifications"
                        />
                    ),
                }}
            />

    </Tabs.Navigator>
)

//On your navigation index

//<Stack.Screen name="Root" component={BottomTab} options={{headerShown: true}}/>

