import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
  } from 'react-native';
import { useEffect,useState } from 'react';
import { useWindowDimensions } from 'react-native';
import EmptyScreen from './EmptyScreen';
import EmptyImg from '../assets/images/emptyImg.png'
import more from '../assets/images/more.png'
import recomend1 from '../assets/images/recomend1.png'
import recomend2 from '../assets/images/recomend2.png'
import recomend3 from '../assets/images/recomend3.png'
import recomend4 from '../assets/images/recomend4.png'
import axios from 'axios';


const Showlog = (trea) =>{
    const width = useWindowDimensions().width; //기기 넓이
    const [data, setData] = useState([]);
    useEffect(() => { //여행정보 데이터
        axios.get('http://10.0.2.2:3000/api/travel/getMyTravelInfo?userId=정성욱')
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
        <View>
         <FlatList
           data={data}
           nestedScrollEnabled={true}
           renderItem={({ item,index }) => (
             <View key={index} style={styles.recomendconatiner}>
             <ImageBackground
                source={recomend1}
                style={{ width: "100%", height: "100%" ,justifyContent:"flex-end",flex:1}}
                resizeMode='cover'>
                <View
                    style={{alignItems:"flex-end"}}>
                <TouchableOpacity onPress={() => gotoRecomend(item)}>
                 <Image source={more} />
                </TouchableOpacity>
                </View>
                <View style={[styles.viewcontainer,{marginHorizontal:width-(width-10),marginBottom:width-(width-10)}]}>
                    <Text style={styles.datetext}>{translate(item.travlDate)} to {item.travlPlace}</Text>
                    <Text style={styles.tagtext}>태그</Text>
                </View>
            </ImageBackground>   
             <View
                style={{flex:2,flexDirection:"row",justifyContent:'space-between'}}>
                <View
                    style={{flex:1,justifyContent:"center"}}>
                    <Image
                        source={recomend2}
                        resizeMode='cover'/>
                </View>
                <View
                    style={{flex:1}}>
                    <Image 
                        source={recomend3}/>
                    <Image
                        source={recomend4}/>

                </View>
             </View>
           </View>
             )}
           />
           </View>);
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
    borderWidth:2,
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
    fontSize: 24,
    fontFamily: 'SCDream5',
  },
})
 export default Showlog