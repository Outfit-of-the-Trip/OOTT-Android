import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MainScreen from '../screens/MainScreen/MainScreen';
import { AuthContext } from '../utils/Auth';

import BottomTabs from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    // Auth 에서 받은 userInfo 값
    const {userInfo} = useContext(AuthContext);

    // 삼항연산자 사용. 만약 userInfo.id의 값이 존재한다면 MainScreen 랜더링
    return (
        <NavigationContainer>
            <Stack.Navigator>

            { userInfo.id ? (
                <>
                <Stack.Screen
                    name="bottomTab"
                    component={ BottomTabs }
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="MainScreen"
                    component={ MainScreen }
                    options={{headerShown: false}}
                />
                </>

            ):(
                <Stack.Screen 
                    name="HomeScreen" 
                    component={ HomeScreen } 
                    options={{headerShown: false}}
                />
                
            )}
                
            </Stack.Navigator>
           
            
        </NavigationContainer>
    );
};

export default Navigation;