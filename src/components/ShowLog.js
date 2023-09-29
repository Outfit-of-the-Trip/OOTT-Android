import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
import { useEffect,useState,useContext } from 'react';
import {AuthContext} from '../utils/Auth';
import { useWindowDimensions } from 'react-native';
import EmptyScreen from './EmptyScreen';
import {useNavigation} from '@react-navigation/native';

import recomend1 from '../assets/images/recomend1.png'
import recomend2 from '../assets/images/recomend2.png'
import recomend3 from '../assets/images/recomend3.png'
import recomend4 from '../assets/images/recomend4.png'

import axios from 'axios';



const Showlog = (trea) =>{
    const width = useWindowDimensions().width; //기기 넓이
    const {userInfo} = useContext(AuthContext);
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const gotoRecomend = (data) => {
        navigation.navigate('Recomend',data,userInfo);
      };

    useEffect(() => { //여행정보 데이터
        axios.get(`http://10.0.2.2:3000/api/travel/getMyTravelInfo?userId=${userInfo.nickname}`)
          .then(function (response) {
            setData(response.data);
          })
          .catch(function (err) {
            console.log(err);
          });
      }, []);
    

      const translate = (item) =>{ // 날짜 정리 메서드
        var data = String(item);
        var input = data.substring(0,10);
        return input;
      }

    if(trea.tr>0){
     return(
         <FlatList
           data={data}
           nestedScrollEnabled={true}
           renderItem={({ item,index }) => (
             <View key={index} style={styles.recomendconatiner}>
      
             <View
                style={{flex:1,flexDirection:"row",justifyContent:'space-between'}}>
                <View
                    style={{flex:1,margin:5}}>
                    <Image
                        source={recomend2}
                        style={{width:'100%',margin:3,borderRadius:5}}
                        resizeMode='stretch'/>
                    <Image
                        source={recomend1}
                        style={{width:'100%',margin:3,borderRadius:5}}
                        />
                  </View>
                <View
                    style={{flex:1,margin:5}}>
                    <Image 
                        source={recomend3}
                        resizeMode='stretch'
                        style={{width:'100%',margin:3,borderRadius:5}}/>
                    <Image
                        source={recomend4}
                        resizeMode='stretch'
                        style={{width:'100%',margin:3,borderRadius:5}}/>

                </View>
             </View>
            <View
              style={{marginHorizontal:width-(width-10)}}>
              <Text style={styles.datetext}>{translate(item.travlDate)} to {item.travlPlace}</Text>
              <Text style={styles.tagtext}>태그</Text>
              <View
                style={{flexDirection:'row',justifyContent:"space-between"}}>
                <Text style={styles.tagtext}>제품명</Text>
                <TouchableOpacity
                  onPress={gotoRecomend}>
                <Text style={styles.tagtext}>더보기</Text>
                </TouchableOpacity>
              </View>
            </View>
           </View>
             )}
           />);
   }else{
     return <EmptyScreen/>
   }
 }

 const styles = StyleSheet.create({
 recotopcontainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },

 recomendconatiner: {
    flex: 2,
    marginTop: "3%",
    elevation:10,
    backgroundColor:"white",
    borderRadius:10,
    borderWidth:3,
    borderColor:'white',
  },
  viewcontainer:{
    justifyContent:'flex-start' ,
    alignItems: 'flex-start',
  },
  datetext: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'SCDream4',
  },
  tagtext: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'SCDream5',
  },
})
 export default Showlog