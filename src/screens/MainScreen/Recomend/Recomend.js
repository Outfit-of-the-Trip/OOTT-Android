import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';

import {
  View,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';

const Recomend = () => {
  const navigation = useNavigation();
  const gotoMain = () => {
    return navigation.navigate('bottomTab');
  };

  return (
    <TouchableOpacity onPress={gotoMain}>
      <Text>back</Text>
    </TouchableOpacity>
  );
};

export default Recomend;
