import React from "react";
import Video from 'react-native-video';
import { StyleSheet, View } from "react-native";

const splash = require('../assets/Loading/splash.mp4')

const SplashVideo = () => {
    return(
        <View style={styles.container}>
            <Video
                source={splash}
                style={styles.fullScreen}
                paused={false} // 재생/중지 여부
                resizeMode={"cover"} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
                repeat={true} // video가 끝나면 다시 재생할 지 여부
                onAnimatedValueUpdate={() => {}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    },
    fullScreen: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
});

export default SplashVideo

