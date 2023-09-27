import {
    View,
    Button,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
  } from 'react-native';
import React, {  useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RecomendGarmet } from '../../../../constants/RecomendGarmet';

const RecomendBottom = () => {
    const navigation = useNavigation();
    const width = useWindowDimensions().width; //기기 폭 값
    const height = useWindowDimensions().height; //기기 높이 값
    const {params: data} = useRoute(); //여행 데이터 받아오기
    const traveldate = String(data.travlDate).substring(0,10); //날짜 글자 필터링
    const gotoShose = () => {
        navigation.navigate('RecomendShose',data)
    }
  
    return(
        <SafeAreaView
            style={style.container}>
            <View
                style={{flex:0.2,marginHorizontal:width-(width-15),marginVertical:height-(height-10)}}>
                <Text
                    style={style.toptext}>
                Customized OOTT
                </Text>
                <Text
                    style={style.toptext}>
                that reflects your preference
                </Text>
            </View>
            <View
                style={{flex:0.2,marginHorizontal:width-(width-15)}}>
                    <View
                        style={style.firsttextcontainer}>
                                    <Text style={style.traveldatetext}>{traveldate}</Text>
                                    <Text style={style.traveldatetext}> to {data.travlPlace}</Text>
                        </View>
                    </View>
                <ScrollView
                    style={{flex:2.5}}>    
                    <View style={{flex:0.1,marginHorizontal:width-(width-20)}}>
                            <Text style={style.cardtextcontainer}>
                                AI Recommendation
                            </Text>
                        </View>
                <View
                    style={[style.cardcontainer,{marginHorizontal:width-(width-15)}]}>
                <View
                    style={{height:200}}>
                    <FlatList
                        data={RecomendGarmet}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item,index}) =>(
                            <View
                                style={style.cardimagecontainer}>
                            <View
                                style={{flex:1}}>
                            <View
                                style={{justifyContent:'flex-start',zIndex:5,alignItems:'flex-start'}}>
                                <Image
                                source={item.img}
                                style={[style.cardimg,{marginHorizontal: width-(width-10)}]}/>
                            </View>
                            <View
                                style={{backgroundColor:'red',marginHorizontal: width-(width-10)}}>
                                <Text>#hip #Street</Text>
                                <Text>제품명</Text>
                            </View>
                            </View>
                            </View>)}
                        horizontal={true}/>
                    </View>
                </View> 
                <View
                    style={{flex:0.1,marginHorizontal:width-(width-20)}}>
                    <Text style={style.cardtextcontainer}>
                         옷장속에 있는 유사한 하의
                    </Text>
                    </View>
               <View
                    style={[style.cardcontainer,{marginHorizontal:width-(width-15)}]}>
                   
                    <View
                    style={{height:200}}>
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
                </ScrollView>
            <View
                style={[style.bottomcontainer,{marginHorizontal: width-(width-15)}]}>
                <TouchableOpacity
                    onPress={gotoShose}>
                 <Text
                    style={style.bottomtext}>신발 -{'>'} </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

export default RecomendBottom

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
    toptext:{
        color:'black',
        fontSize:24
    }, 
    firsttextcontainer:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:"flex-start",
        alignItems:"center",
        borderRadius:3,
        borderWidth:10,
        borderColor:'white',
        elevation:5,
    },
    cardcontainer:{
        flex:1.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor:"white",
        marginBottom:"3%",
        backgroundColor:'blue'
    },
    cardtextcontainer:{
        fontFamily:'오뮤_다예쁨체',
        fontSize:24,
        color:"black"
    },  
    cardimagecontainer:{
        flex: 1, 
        alignItems: 'flex-start', 
        justifyContent: 'center',
        elevation:1,
        borderRadius:5,
        shadowColor:'white',
        width:"20%",
        zIndex:1
    },
    cardimg:{
        resizeMode: 'contain',
        height:"80%",
        backgroundColor:"red"
    },
    traveldatetext:{
        fontSize:24,
        color:'grey',
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