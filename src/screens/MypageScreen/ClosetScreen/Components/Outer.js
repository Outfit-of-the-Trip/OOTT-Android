import React from 'react-native';

import {View, FlatList, StyleSheet, Image} from 'react-native';

const Outer = ({imgData}) => {
  const renderImage = ({item, index}) => {
    return (
      <View style={styles.listStyle}>
        <Image
          source={{uri: 'data:image/png;base64,' + item}}
          style={{width: 130, height: 130}}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <FlatList
          numColumns={3}
          data={imgData}
          renderItem={renderImage}></FlatList>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStyle: {
    backgroundColor: '#f0f0f0',
    margin: 2,
  },
});

export default Outer;
