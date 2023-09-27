import { useWindowDimensions } from 'react-native';
import ex from '../assets/images/recomend3.png'
import recomendOOTT from '../assets/images/recomendOOTT.png';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView
  } from 'react-native';

const EmptyScreen = () => { //여행일정 아무것도 추가 안되어있을때 화면 , 컴포넌트로 빼기
  const width = useWindowDimensions().width; //기기 폭 값
    return (
      <View style={[styles.container,{marginHorizontal:width-(width-10)}]}>
        <View
          style={styles.firstcontainer}>
          <Text style={styles.firstcontainertext}>성욱님을 위한 코디 추천</Text>
        </View>
        <View
          style={{flex:2}}>
              <ScrollView horizontal={true}style={{flexDirection:'row'}}>
                <View
                  style={{marginRight:10}}>
                  <Image source={ex}/>
                  <Text style={styles.recomendhashtagtext}>#캐주얼</Text>
                </View>
                <View
                  style={{marginRight:10}}>
                  <Image source={ex}/>
                  <Text style={styles.recomendhashtagtext}>#시티보이</Text>
                </View>
                <View
                  style={{marginRight:10}}>
                  <Image source={ex}/>
                  <Text style={styles.recomendhashtagtext}>#아메카지</Text>
                </View>
                <View
                  style={{marginRight:10}}>
                  <Image source={ex}/>
                  <Text style={styles.recomendhashtagtext}>#미니멀</Text>
                </View>
                <View
                  style={{marginRight:10}}>
                  <Image source={ex}/>
                  <Text style={styles.recomendhashtagtext}>#ㅁㅁㅁ</Text>
                </View>
              </ScrollView>
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


export default EmptyScreen
