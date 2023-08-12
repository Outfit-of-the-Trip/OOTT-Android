import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, TouchableOpacity} from 'react-native';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import MainScreen from '../../screens/MainScreen/MainScreen';
import Recomend from '../../screens/MainScreen/Recomend/Recomend';
import DetailRecomend from '../../screens/MainScreen/DetailRecomend/DetailRecomend';
import FriendInfoScreen from '../../screens/FriendScreen/FriendInfoScreen';
import {AuthContext} from '../../utils/Auth';

import BottomTabs from './BottomTabNavigation';
import Toplogo from '../../assets/images/toplogo.png';
import Settings from '../../assets/images/settings.png';

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
        {/* {userInfo.id ? (
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
          </>
        ) : (
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        )} */}
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
          name="FriendInfoScreen"
          component={FriendInfoScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
