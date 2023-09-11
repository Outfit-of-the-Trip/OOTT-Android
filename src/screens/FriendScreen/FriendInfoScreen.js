import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import avatar from '../../assets/images/avatar.png';
import {useRoute} from '@react-navigation/native';
const FriendInfoScreen = () => {
  const {data} = useRoute();
  return (
    <View>
      <View style={styles.profileContainer}>
        <Image style={styles.profile} source={avatar} />
        <Text></Text>
      </View>
    </View>
  );
};

export default FriendInfoScreen;

const styles = StyleSheet.create({
  profile: {
    width: 100,
    height: 100,
  },
  profileContainer: {
    flexDirection: 'column',
  },
});
