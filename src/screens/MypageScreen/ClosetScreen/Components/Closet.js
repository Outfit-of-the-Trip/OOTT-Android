import React, {useState} from 'react';
import {Platform, View, FlatList, StyleSheet, Image} from 'react-native';
import Gallery from './Gallery';
import {launchImageLibrary} from 'react-native-image-picker';

const Closet = () => {
  const [selectedImg, setSelectedImg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPkpg%2FbtssDKPHyNM%2FdBXdskD0UQZDdSQ7RJSBX0%2Fimg.png',
  ]);

  const renderImage = ({item, index}) => {
    return (
      <Image
        source={{uri: item}}
        style={{
          width: '32%',
          aspectRatio: 1,
          borderRadius: 10,
          marginHorizontal: 2,
        }}
      />
    );
  };

  //갤러리에서 사진 선택
  const onLaunchImageLibrary = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      includeBase64: Platform.OS === 'android',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        const ImgUri = response.assets[0].uri;
        setSelectedImg(ImgUri);
        if (selectedImg !== '') {
          setData(data => [...data, ImgUri]);
        }
      }
    });
  };

  //Modal Open
  const modalOpen = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
    }
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <FlatList
          numColumns={3}
          keyExtractor={item => item}
          data={data}
          renderItem={renderImage}></FlatList>
      </View>
      <Gallery
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
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
    margin: 3,
  },
});

export default Closet;
