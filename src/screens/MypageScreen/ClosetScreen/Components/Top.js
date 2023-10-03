import React from 'react';

import {View, FlatList, StyleSheet, Image} from 'react-native';

const Top = ({top, base}) => {
  const renderImage = ({item, index}) => {
    return (
      <View style={styles.listStyle}>
        <Image
          source={{uri: item}}
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
          keyExtractor={item => item}
          data={top}
          renderItem={renderImage}></FlatList>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    marginVertical: 10,
    marginRight: 15,
    alignItems: 'flex-end',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 2,
  },
});

export default Top;
