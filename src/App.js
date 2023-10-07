import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import Navigation from './components/Navigation/Navigation';
import {AuthProvider} from './utils/Auth';
import SplashScreen from 'react-native-splash-screen';


const App = () => {

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e.message);
    }
  });

  return (
    <AuthProvider>
      <StatusBar/>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
