import React, {useEffect, useState} from 'react';
import axios from 'axios';


import {View, FlatList, StyleSheet, Image} from 'react-native';

const Bottom = ({imgData}) => {

  const renderImage = ({item, index}) => {
    return (
      <View style={styles.listStyle}>
        <Image
          source={{uri: "data:image/png;base64,"+item}}
          style={{width: 120, height: 120, borderRadius: 10, margin: 6}}
        />
      </View>
    );
  };


  return (
    <>
      <View style={styles.imageContainer}>
        <FlatList
          numColumns={3}
          // keyExtractor={item => item}
          data={imgData}
          renderItem={renderImage}></FlatList>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  listStyle:{
    backgroundColor: "#f0f0f0",
    margin: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 2,
  },
});

export default Bottom;