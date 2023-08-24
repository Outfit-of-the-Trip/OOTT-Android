import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Dimensions, Modal, Button } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const TravelScreen = () => {
  const [markerData, setMarkerData] = useState({});
  const [modal, setModal] = useState(true);

  const handleOnMessage = (e) => {
    const parsedData = JSON.parse(e.nativeEvent.data);
    setMarkerData(parsedData);
    console.log(parsedData.data); // 데이터 업데이트 이후에 출력
  };

  return (
    <View style={styles.container}>
      <WebView
        javaScriptEnabled={true}
        style={styles.webview}
        source={{ uri: 'http://localhost:3000' }}
        onMessage={handleOnMessage}
      />
      <Modal
            animationType={"slide"}
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                isModalVisible(!modal)
                console.log("modal appearance")
            }}
        ></Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
  modal:{
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,

  }
});

export default TravelScreen;
