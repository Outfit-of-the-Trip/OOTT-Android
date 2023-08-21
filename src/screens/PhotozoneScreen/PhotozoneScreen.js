import React, {useEffect} from 'react'
import { WebView } from 'react-native-webview'
import axios from 'axios';

import {
  View,
  Text
} from 'react-native';

const TravelScreen = () => { 
  return (
      <WebView source={{ uri: 'http://192.168.224.234:3000/' }} />
  )
}

export default TravelScreen
