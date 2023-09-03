import {
    View,
    Button,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
import React, {  useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import axios from 'axios';

const RecomendOutter = () => {
    const navigation = useNavigation();
    const width = useWindowDimensions().width; //기기 폭 값
    const [traveldate, settraveldate] = useState(); //여행 날짜
    const [usrname, setusrname] = useState(); //사용자 이름
    
    useEffect(() => { //사용자 친구 데이터
        axios.get('http://10.0.2.2:8000/api/travel/getMyTravelInfo?userId=a')
          .then(function (response) {
            console.log(response.data[0].travlDate);
            var data = String(response.data[0].travlDate);
            var input = data.substring(0,10)
            settraveldate(input)
          })
          .catch(function (err) {
            console.log(err);
          });
      }, []);

      useEffect(() => { //사용자 데이터 
        axios.get('http://10.0.2.2:8000/api/users/getUserInfo?userId=admin')
          .then(function (response) {
            console.log(response.data.usrId);
            setusrname(response.data.usrId);
           //setusrprofile(response.data.usrProfileURL) 프로필 사진
    
          })
          .catch(function (err) {
            console.log(err);
          });
      }, []);

    const gotoBottom = () => {
        return navigation.navigate('RecomendBottom')
    }
    return(
        <SafeAreaView
            style={style.container}>
            <View
                style={{flex:0.2,marginHorizontal:width-(width-15)}}>
                    <View
                        style={style.firsttextcontainer}>
                            <View style={{flexDirection:'row'}}>
                                    <Text style={style.traveldatetext}>{traveldate}</Text>
                                    <Text style={style.traveldatetext}> to Mongol</Text>
                            </View> 
                        </View>
                    </View>
                <View
                    style={[style.cardcontainer,{marginHorizontal:width-(width-15)}]}>
                      <View style={{flex:0.1}}>
                            <Text style={style.cardtextcontainer}>
                                {usrname}님에게 추천하는 코디
                            </Text>
                        </View>
                <View
                    style={{flex:1}}>
                    <FlatList
                        data={RecomendGarmet}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item,index}) =>(
                            <View
                                style={style.cardimagecontainer}>
                                <Image
                                source={item.img}
                                style={[style.cardimg,{marginHorizontal: width-(width-15)}]}/>
                            </View>)}
                        horizontal={true}/>
                    </View>
                        <View style={{flex:0.2,flexDirection:"row",width:"100%",justifyContent:"center"}}>
                            <TouchableOpacity>
                                <Text
                                    style={style.categorytext}>
                                    #낮은 가격순
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={style.categorytext}>
                                     #높은 가격순
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={style.categorytext}>
                                    #선호 스타일순
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={style.categorytext}>
                                    #선호 브랜드순
                                </Text>
                            </TouchableOpacity>
                        </View>
                </View>
               <View
                    style={[style.cardcontainer,{marginHorizontal:width-(width-15)}]}>
                    <View
                        style={{flex:0.1}}>
                        <Text style={style.cardtextcontainer}>
                            옷장속에 있는 유사한 코디
                        </Text>
                    </View>
                    <View
                    style={{flex:1}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={RecomendGarmet}
                        renderItem={({item,index}) =>(
                            <View
                                style={style.cardimagecontainer}>
                                <Image
                                source={item.img}
                                style={[style.cardimg,{marginHorizontal: width-(width-15)}]}/>
                            </View>)}
                        horizontal={true}/>
                    </View>
                </View>
            <View
                style={[style.bottomcontainer,{marginHorizontal: width-(width-15)}]}>
                <TouchableOpacity
                    onPress={gotoBottom}>
                 <Text
                    style={style.bottomtext}>하의 -{'>'} </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

export default RecomendOutter

const style = StyleSheet.create({
    container:{
        flex:5,
        backgroundColor:"white"
    },
    showimg:{
        width:'100%',
        height:'90%',
        resizeMode:'contain',
      },
    firsttextcontainer:{
        flex:0.8,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center"
    },
    cardcontainer:{
        flex:1,alignItems: 'center',
        justifyContent: 'center',
        elevation:10,
        backgroundColor:"white",
        borderRadius:10,
        borderWidth:2,
        borderColor:'white',
        marginBottom:"3%",
    },
    cardtextcontainer:{
        fontFamily:'오뮤_다예쁨체',
        fontSize:24,
        color:"black"
    },  
    cardimagecontainer:{
        flex: 1, 
        alignItems: 'center', justifyContent: 'center'
    },
    cardimg:{
        resizeMode: 'contain',
        height:"100%"
    },
    traveldatetext:{
        fontSize:24,
        color:'#4949E8',
        fontFamily:'오뮤_다예쁨체',
      },
    categorytext:{
        fontFamily:'오뮤_다예쁨체',
        fontSize:16,
    },
    secondcontainer:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        zIndex:1,
    },
    datetext:{
        fontSize:24,
        color:'black',
        fontFamily:'오뮤_다예쁨체',
    },
    sortcategorycontainer:{
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:2,
        borderRadius:4,
        padding:4,
        elevation:20
    },
    sortcategorytext:{
        fontSize:16,
        color:'black',
        fontFamily:'오뮤_다예쁨체'
    },
    bottomcontainer:{
        flex:0.2,
        justifyContent:"center",
        alignItems:"flex-end"
    },
    bottomtext:{
        fontFamily:"오뮤_다예쁨체",
        fontSize:24,
        color:"#4949E8"
    }
})