import React, {useCallback, useRef, useMemo, useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text, Image} from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import DetailModal from './DetailModal';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const TravelScreen = () => {
  const [markerData, setMarkerData] = useState({
    address: '',
    image: '',
    latlng: {
      lat: 0,
      lng: 0,
    },
    phonenumber: '',
    title: '',
  });

  const handleOnMessage = e => {
    const parsedData = JSON.parse(e.nativeEvent.data);
    setMarkerData(parsedData.data);
    handleSnapPress(0);
  };

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['40%', '100%'], []);

  const handleSheetChange = useCallback((index) => {
    // console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index, {animationDuration: 100});
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <WebView
          javaScriptEnabled={true}
          style={styles.webview}
          source={{ uri: 'http://localhost:3000/photozone' }}
          onMessage={handleOnMessage}
        />
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose={true}>
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}>
            <DetailModal data={markerData} />
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 3,
    backgroundColor: '#eee',
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});

export default TravelScreen;
