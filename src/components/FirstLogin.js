import { useWindowDimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import recomendOOTT from '../assets/images/recomendOOTT.png';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';

const FirstLogin = () => { 
  const width = useWindowDimensions().width; //기기 폭 값
  const navigation = useNavigation(); // 

  const gotoOOTT = () =>{
    return navigation.navigate('OOTTScreen')
  }
    return (
      <View
          style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <View
              style={{flex:0.5,justifyContent:'center'}}>
              <Image 
                style={{resizeMode:'center',marginHorizontal:width-20}}
                source={recomendOOTT}/>
            </View>
            <View
              style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
              <Text
                style={styles.fontblack}>환영합니다 ! 처음 로그인하시네요</Text>
              <Text
              style={styles.fontblack}>기본 정보를 등록하시고 OOTT를 사용하세요!</Text>
                <TouchableOpacity
                    onPress={gotoOOTT}>
                  <Text
                    style={styles.fontmove}>이동하기</Text>
                </TouchableOpacity>
              </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    container:{
      flex:4,
      marginTop:50
    },
    firstcontainer:{
      alignItems:'center',
      flex:2
    },
    firstcontainertext:{
      fontFamily:'오뮤_다예쁨체',
      fontSize:24,
      color:'black'
    },
    recomendhashtagtext:{
      fontFamily:'오뮤_다예쁨체',
      fontSize:16,
      color:'black'
    },
    fontblack:{
      fontFamily:'오뮤_다예쁨체',
      fontSize:24,
      color:'black'
    },
    fontmove:{
      fontFamily:'오뮤_다예쁨체',
      fontSize:20,
      color:'#4949E8'
    }

  })


export default FirstLogin
