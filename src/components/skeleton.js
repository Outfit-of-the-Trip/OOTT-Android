import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const SkeletonUI = () => {
  return (
    <View style={styles.SkeletonUiRowContainer}>
      <View style={styles.personColumnContainer}>
        <View style={styles.AvatarCircle} />
        <Text style={styles.textSkeleton}></Text>
      </View>
      <View style={styles.personColumnContainer}>
        <View style={styles.userId} />
        <View style={styles.userAge} />
      </View>
      <View style={styles.personColumnContainer}>
        <View style={styles.Interests} />
        <View style={styles.gender} />
      </View>
      <View style={styles.buttonSkeleton} />
    </View>
  );
};

export default SkeletonUI;
const styles = StyleSheet.create({
  SkeletonUiRowContainer: {
    margin: 5,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personColumnContainer: {
    margin: 9,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  AvatarCircle: {
    width: 30,
    height: 30,
    backgroundColor: '#D8D8D8',
    borderRadius: 20,
    justifyContent: 'center',
  },
  textSkeleton: {
    marginTop: 5,
    width: 30,
    height: 15,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
  },
  userId: {
    backgroundColor: '#E6E6E6',
    width: 40,
    height: 15,
    marginBottom: 5,
    borderRadius: 5,
  },
  userAge: {
    backgroundColor: '#E6E6E6',
    width: 45,
    height: 15,
    borderRadius: 5,
  },

  Interests: {
    backgroundColor: '#E6E6E6',
    width: 65,
    height: 15,
    marginBottom: 5,
    borderRadius: 5,
  },
  gender: {
    backgroundColor: '#E6E6E6',
    width: 45,
    height: 15,
    borderRadius: 5,
  },
  buttonSkeleton: {
    width: 95,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#E6E6E6',
    margin: 5,
  },
});
