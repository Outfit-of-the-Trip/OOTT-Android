import React from 'react';
import {StyleSheet, View} from 'react-native';

import SplashVideo from '../../components/SplashVideo';

const UnityView = () => {

  return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
            <SplashVideo />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },

});

export default UnityView;
