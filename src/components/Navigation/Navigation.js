import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, TouchableOpacity} from 'react-native';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import MainScreen from '../../screens/MainScreen/MainScreen';
import Recomend from '../../screens/MainScreen/Recomend/Recomend';
import RecomendTop from '../../screens/MainScreen/DetailRecomend/RecomendTop';
import RecomendBottom from '../../screens/MainScreen/DetailRecomend/RecomendBottom';
import RecomendShose from '../../screens/MainScreen/DetailRecomend/RecomendShose';
import RecomendOutter from '../../screens/MainScreen/DetailRecomend/RecomendOutter';
import FriendsLook from '../../screens/MainScreen/FriendsLook/FriendsLook';
import ShoppingList from '../../screens/MainScreen/ShoppingList/ShoppingList';
import FriendInfoScreen from '../../screens/FriendScreen/FriendInfoScreen';
import WhereToGo from '../../screens/OOTTScreen/WhereToGo';
import WhoDoYouGoWith from '../../screens/OOTTScreen/WhoDoYouGoWith';
import PurposOfTravel from '../../screens/OOTTScreen/PurposOfTravel';
import OOTTScreen from '../../screens/OOTTScreen/OOTTScreen';

import {AuthContext} from '../../utils/Auth';

import BottomTabs from './BottomTabNavigation';
import Toplogo from '../../assets/images/toplogo.png';

import TravelPlace from '../../screens/OOTTScreen/TravelPlace/TravelPlace';
import TravelFriends from '../../screens/OOTTScreen/TravelFriends/TravelFriends';
import TravelCategory from '../../screens/OOTTScreen/TravelCategory/TravelCategory';
import RecomendSceen from '../../screens/OOTTScreen/RecomendSceen/RecomendSceen';

const Stack = createNativeStackNavigator();

const mainLogo = () => {
  return <Image style={{width: 72, height: 54}} source={Toplogo} />;
};
const Navigation = () => {
  // Auth 에서 받은 userInfo 값
  const {userInfo} = useContext(AuthContext);

  // 삼항연산자 사용. 만약 userInfo.id의 값이 존재한다면 MainScreen 랜더링
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{

          animation:'fade_from_bottom',
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          headerTitle: mainLogo,
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
              name="OOTTScreen"
              component={OOTTScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Recomend"
              component={Recomend}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="RecomendOutter"
              component={RecomendOutter}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="RecomendTop"
              component={RecomendTop}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="RecomendBottom"
              component={RecomendBottom}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="RecomendShose"
              component={RecomendShose}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="FriendInfoScreen"
              component={FriendInfoScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="WhereToGo"
              component={WhereToGo}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="WhoDoYouGoWith"
              component={WhoDoYouGoWith}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="PurposOfTravel"
              component={PurposOfTravel}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="FriendsLook"
              component={FriendsLook}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="ShoppingList"
              component={ShoppingList}
            />
            <Stack.Screen
              name='RecomendSceen'
              component={RecomendSceen}
              options={{headerShown:true}}
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
