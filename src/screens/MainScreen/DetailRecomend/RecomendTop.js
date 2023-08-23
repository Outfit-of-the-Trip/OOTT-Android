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
import { useWindowDimensions } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import React, {useState,useEffect} from 'react';
import airplaneimg from '../../../assets/images/DetailRecomendairplane.png'
import ex from '../../../assets/images/recomend2.png'
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
  

const RecomendTop = () => {
    const width = useWindowDimensions().width; //기기 폭 값
    const height = useWindowDimensions().height //기기 길이 값
    const navigation = useNavigation();
    const [usrname, setusrname] = useState();

    const recomendGarmet = RecomendGarmet.map((ele,i) =>{
        return(
          <Image
          key={i}
          source={ele.img}
          style={[style.showimg,{width:width-20}]}/>
        )
      },[RecomendGarmet])

    useEffect(() => { //사용자 데이터 
        axios.get('http://10.0.2.2:8000/api/users/getUserInfo?userId=admin')
          .then(function (response) {
            console.log(response.data.usrId);
            setusrname(response.data.usrId);
           // setusrprofile(response.data.usrProfileURL) 프로필 사진
    
          })
          .catch(function (err) {
            console.log(err);
          });
      }, []);


    const gotoRecomendBottom = (() =>{
        return navigation.navigate('RecomendBottom')
      }) 

      const gotoRecomendShose = (() =>{
        return navigation.navigate('RecomendShose')
      }) 

    return(
        <SafeAreaView
            style={[style.container,{marginHorizontal:width-(width-20)}]}>
            <View
                style={{flex:1,position:'relative'}}>
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
                                <TouchableOpacity
                                    onPress={gotoRecomendBottom}>
                                    <Text style={style.categorytext}>하의</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={gotoRecomendShose}>
                                    <Text style={style.categorytext}>신발</Text>
                                 </TouchableOpacity>
                        </View>
                        </View>
                    <View
                        style={style.secondcontainer}>
                            <View
                                style={{flex:1}}>
                                <Text style={style.datetext}>2023.07.19</Text>
                                <Text style={style.datetext}>{usrname}님을 위한 추천 상의</Text>
                            </View>
                            <View
                                style={{zIndex:20}}>
                                <ScrollView >
                                    <Collapse>
                                        <CollapseHeader>
                                            <View
                                                style={style.sortcategorycontainer}>
                                                <Text style={style.sortcategorytext}>낮은 가격순    </Text>
                                            </View>
                                        </CollapseHeader>
                                        <CollapseBody>
                                            <View
                                                style={style.sortcategorycontainer}>
                                                <Text style={style.sortcategorytext}>높은 가격순</Text>
                                            </View>
                                            <View
                                                style={style.sortcategorycontainer}>
                                                <Text style={style.sortcategorytext}>선호 스타일순</Text>
                                            </View>
                                            <View
                                                style={style.sortcategorycontainer}>
                                                <Text style={style.sortcategorytext}>선호 브랜드순</Text>
                                            </View>
                                        </CollapseBody>
                                    </Collapse>
                                </ScrollView>
                            </View>
                    </View>
                <View
                    style={{flex:1}}>
                <ScrollView horizontal={true}>
                   {recomendGarmet}
                </ScrollView>
                </View>
                <View
                    style={{flex:0.2,alignItems:'center'}}>
                    <Text style={{fontFamily:'오뮤_다예쁨체',fontSize:32,color:'black'}}>추천 상의와 비슷한 옷장 속 옷들</Text>
               </View>
               <View
                    style={{flex:1,marginBottom:height-(height-20)}}>
                    <ScrollView horizontal={true}>
                    {recomendGarmet}
                </ScrollView>
                </View>
            </View>
            
        </SafeAreaView>
    )

}

export default RecomendTop

const style = StyleSheet.create({
    container:{
        flex:5,
    },
    fistcontainer:{
        flex:0.3,
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
        fontSize:32,
        color:'#4949E8',
        fontFamily:'오뮤_다예쁨체',
    },
    secondcontainer:{
        flex:0.3,
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
    showimg:{
        width:'100%',
        height:'100%',
        resizeMode:'contain',
      },
})