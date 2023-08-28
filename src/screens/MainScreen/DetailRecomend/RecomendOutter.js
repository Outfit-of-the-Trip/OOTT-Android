import {
    View,
    Button,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
import React, {  useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Card, } from 'react-native-paper';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import airplaneimg from '../../../assets/images/DetailRecomendairplane.png'
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import ex from '../../../assets/images/recomend2.png'

const RecomendOutter = () => {
    const width = useWindowDimensions().width; //기기 폭 값
    const height = useWindowDimensions().height; //기기 높이 값
    const scrollRef = useRef(); 
    return(
        <SafeAreaView
            style={[style.container,{marginHorizontal:width-(width-15)}]}>
            <View
                style={{flex:0.3}}>
                    <View
                        style={style.fistcontainer}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image source={airplaneimg}/>
                                <View
                                    style={{marginLeft:10}}>
                                    <Text style={style.traveldatetext}>2023.07.19~2023.07.23</Text>
                                    <Text style={style.traveldatetext}> to Mongol</Text>
                                </View>
                            </View> 
                            <View>
                                <TouchableOpacity>
                                    <Text style={style.categorytext}>#상의</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={style.categorytext}>#하의</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={style.categorytext}>#신발</Text>
                                </TouchableOpacity>    
                                                                  
                            </View>
                        </View>
                    </View>
                <View
                    style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
                    <Card   
                        style={{width:'100%',height:'100%'}}>
                    <Card.Title titleStyle={{fontSize:24, fontFamily:'오뮤_다예쁨체'}} title = "성욱님을 위한 추천 아우터"/>
                    <Card.Content
                        style={{height:250,backgroundColor:'blue'}}>
                        <SwiperFlatList
                        showPagination
                        paginationActiveColor='black'
                        paginationStyleItem={{height:10,width:10}}
                        data={RecomendGarmet}
                        ref={scrollRef}
                        renderItem={({item,index}) =>(
                        <View
                            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                            source={item.img}
                            style={{resizeMode: 'contain', width:300,marginHorizontal: width-(width-15), height: 200,backgroundColor:"red"}}/>
                        </View>
                        )}/>
                    </Card.Content>
                    <Card.Actions>
                        <View style={{flexDirection:"row",width:"100%",justifyContent:"center"}}>
                            <TouchableOpacity>
                                <Text
                                    style={{fontFamily:'오뮤_다예쁨체',fontSize:16}}>
                                    #낮은 가격순
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={{fontFamily:'오뮤_다예쁨체',fontSize:16}}>
                                     #높은 가격순
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={{fontFamily:'오뮤_다예쁨체',fontSize:16}}>
                                    #선호 스타일순
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={{fontFamily:'오뮤_다예쁨체',fontSize:16}}>
                                    #선호 브랜드순
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Card.Actions>
                </Card>
                </View>
               <View
                    style={{flex:1,justifyContent:"center"}}>
                    <Card>
                    <Card.Title titleStyle={{fontSize:24, fontFamily:'오뮤_다예쁨체'}} title = "추천 아우터와 비슷한 옷장 속 옷들"/>
                    <Card.Content >
                        <ScrollView horizontal={true}>
                            <Image style={{flex:1,height:200,width:200}} source={ex}/>
                            <Image style={{flex:1,height:200,width:200}} source={ex}/>
                            <Image style={{flex:1,height:200,width:200}} source={ex}/>
                            <Image style={{flex:1,height:200,width:200}} source={ex}/>
                            <Image style={{flex:1,height:200,width:200}} source={ex}/>
                        </ScrollView>
                    </Card.Content>
                </Card>
                </View>
            
        </SafeAreaView>
    )

}

export default RecomendOutter

const style = StyleSheet.create({
    container:{
        flex:5,
    },
    showimg:{
        width:'100%',
        height:'90%',
        resizeMode:'contain',
      },
    fistcontainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    traveldatetext:{
        fontSize:24,
        color:'#4949E8',
        fontFamily:'오뮤_다예쁨체',
      },
    categorytext:{
        fontSize:24,
        color:'grey',
        fontFamily:'오뮤_다예쁨체',
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
    }
})