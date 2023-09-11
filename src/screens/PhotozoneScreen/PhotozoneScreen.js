import React from 'react'
import axios from 'axios'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const TravelScreen = () => {
  
  axios.get('http://10.0.2.2:3000/api/users/getUserInfo?userId=admin')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function(err){
    console.log(err)
  })

  return (
    <Text>Travel Screen</Text>
  )
}

export default TravelScreen