import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-crop-picker';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';

const OuterwearComponent = () => (
  <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <Text>아우터 내용</Text>
    {/* 아우터 아이템을 여기에 표시 */}
  </ScrollView>
);

const TopsComponent = () => (
  <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <Text>상의 내용</Text>
    {/* 상의 아이템을 여기에 표시 */}
  </ScrollView>
);

const BottomsComponent = () => (
  <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <Text>하의 내용</Text>
    {/* 하의 아이템을 여기에 표시 */}
  </ScrollView>
);

const FootwearComponent = () => (
  <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <Text>신발 내용</Text>
    {/* 신발 아이템을 여기에 표시 */}
  </ScrollView>
);

const renderScene = SceneMap({
  first: OuterwearComponent,
  second: TopsComponent,
  third: BottomsComponent,
  fourth: FootwearComponent,
});

function ClosetScreen() {
  const layout = Dimensions.get('window');

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
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    const storagePermission = Platform.select({
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>옷장</Text>
        <TouchableOpacity onPress={handleAddPhoto}>
          <Image
            source={require('D:/RN/OOTT-Android/src/assets/images/adc.png')} // 추가 아이콘 이미지
            style={styles.addPhotoIcon}
          />
        </TouchableOpacity>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene} // renderScene 함수를 전달
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#4949E8' }}
            style={{ backgroundColor: '#FFF' }}
            labelStyle={{ color: '#000' }}
          />
        )}
      />
      <ScrollView>
        {selectedImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    flex: 1,
  },
  addPhotoIcon: {
    width: 30,
    height: 30,
  },
  image: {
    width: '33.33%', // 한 열에 3개의 이미지가 나열되도록 설정
    aspectRatio: 1, // 이미지 비율 유지
    margin: 2, // 이미지 사이의 간격 설정
  },
});

export default ClosetScreen;
