import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Alert
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const DetailModal = (props) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          styles = {styles.image}
          source={{ uri: props.image }}
        />
      </View>

      <View style={styles.textContainer}>
        <Text>{props.title}</Text>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex :1,
    paddingTop: 200,
  },
  imageContainer: {
    flex : 1
  },
  image: {
    width: '100%',
    height: 500,
  },
  textContainer: {
    flex: 1
  }

})

export default DetailModal
