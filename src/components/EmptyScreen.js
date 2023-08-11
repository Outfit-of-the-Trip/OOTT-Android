import emptyImg from '../assets/images/emptyImg.png'

import {
    View,
    StyleSheet,
    Text,
    Image,
  } from 'react-native';

const EmptyScreen = () => { //여행일정 아무것도 추가 안되어있을때 화면 , 컴포넌트로 빼기
    return (
      <View
        style={styles.container}>
        <Image source={emptyImg} style={styles.img}/>
        <Text style={styles.text}>여행 일정을 추가하세요</Text>
        </View>
    )
  }

  const styles = StyleSheet.create({
    container:{
        flex:2,
        alignItems:'center',
        marginTop:130
    },
    img:{
        flex:1,
        resizeMode:'contain' 
    },
    text:{
        color: 'black',
        fontSize: 16,
        fontFamily: 'ONE MOBILE OTF REGULAR', 
    }
  })


export default EmptyScreen