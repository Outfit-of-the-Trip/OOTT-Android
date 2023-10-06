import { useWindowDimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import emptyImage from '../assets/images/emptyImage.png'
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView
  } from 'react-native';
import { Button } from 'react-native-paper';

const EmptyScreen = () => { //여행일정 아무것도 추가 안되어있을때 화면 , 컴포넌트로 빼기
  const width = useWindowDimensions().width; //기기 폭 값
  const navigation = useNavigation();
    return (
        <View
          style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <View
              style={{flex:0.6,justifyContent:'center',alignItems:'center'}}>
              <Image
                style={{width:300,height:300}}
                source={emptyImage}/>
                <Button
                  mode='outlined'
                  onPress={() => navigation.navigate('OOTTScreen')}
                  textColor='black'
                  labelStyle={{fontFamily:'SCDream5',fontSize:16}}
                  style={{
                    borderStyle: 'solid',
                    borderwidth:15,
                    paddingHorizontal:20,
                    borderRadius: 8,}}>Move for OOTT
                </Button>
            </View>
        </View>
    )  
}
  

  const styles = StyleSheet.create({
 
  })


export default EmptyScreen
