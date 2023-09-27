import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';

import Closet from './Components/Closet';

const renderScene = SceneMap({
  first: Closet,
  second: Closet,
  third: Closet,
  fourth: Closet,
});

function ClosetScreen() {
  const witdh = Dimensions.get('window');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: '아우터' },
    { key: 'second', title: '상의' },
    { key: 'third', title: '하의' },
    { key: 'fourth', title: '신발' },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const handleAddPhoto = async () => {
    const cameraPermission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const storagePermission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });

    // 카메라 및 스토리지 권한 확인
    const cameraStatus = await check(cameraPermission);
    const storageStatus = await check(storagePermission);

    if (cameraStatus === RESULTS.GRANTED && storageStatus === RESULTS.GRANTED) {
      // 사용자에게 사진 촬영 또는 갤러리 선택 옵션을 제공
      const options = ['사진 촬영', '갤러리에서 선택', '취소'];
      const cancelButtonIndex = 2;

      // 액션 시트 표시
      ActionSheet.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            // "사진 촬영" 선택
            ImagePicker.openCamera({
              mediaType: 'photo',
            })
              .then((image) => {
                const newImages = [...selectedImages, image.path];
                setSelectedImages(newImages);
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (buttonIndex === 1) {
            // "갤러리에서 선택" 선택
            ImagePicker.openPicker({
              mediaType: 'photo',
            })
              .then((image) => {
                const newImages = [...selectedImages, image.path];
                setSelectedImages(newImages);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      );
    } else {
      // 권한 요청
      const cameraRequest = request(cameraPermission);
      const storageRequest = request(storagePermission);

      Promise.all([cameraRequest, storageRequest])
        .then(([cameraResult, storageResult]) => {
          if (cameraResult === RESULTS.GRANTED && storageResult === RESULTS.GRANTED) {
            // 권한이 승인됨
            // 이미지 피커 사용 코드 추가
          } else {
            // 사용자가 권한을 부여하지 않았거나 권한 요청이 실패한 경우
            // 사용자에게 권한이 필요하다는 알림을 표시하거나 다른 조치를 취할 수 있음
          }
        });
    }
  };

  return (
    <View style={styles.rootContainer}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: witdh }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'black' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: 'black' }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

});

export default ClosetScreen;