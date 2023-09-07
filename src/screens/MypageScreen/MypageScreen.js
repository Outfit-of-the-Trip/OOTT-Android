import React, {useEffect} from 'react'
import axios from 'axios';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';

const MypageScreen = () => {
  useEffect( () =>{
    axios.post(
      'http://10.0.2.2:3001/api/travel/addTravelInfo',
      {
        usrId: 'a',
        travlDate: '2023-08-23',
        travlFriends: '@a@b@c',
      },
    );
  })
  
  return (
    <Text>Mypage Screen</Text>
  )
}

export default MypageScreen
