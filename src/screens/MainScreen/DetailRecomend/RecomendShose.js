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

import airplaneimg from '../../../assets/images/DetailRecomendairplane.png'
import ex from '../../../assets/images/recomend2.png'
  

const RecomendShose = () => {
    const width = useWindowDimensions().width; //기기 폭 값

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
                                <TouchableOpacity>
                                    <Text style={style.categorytext}>상의</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={style.categorytext}>하의</Text>
                                 </TouchableOpacity>
                        </View>
                        </View>
                    <View
                        style={style.secondcontainer}>
                            <View
                                style={{flex:1}}>
                                <Text style={style.datetext}>2023.07.19</Text>
                                <Text style={style.datetext}>성욱님을 위한 추천 상의</Text>
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
                    <Image source={ex}/>
                    <Image source={ex}/>
                    <Image source={ex}/>
                    <Image source={ex}/>
                    <Image source={ex}/>
                </ScrollView>
                </View>
                <View
                    style={{flex:0.3,alignItems:'center'}}>
                    <Text style={{fontFamily:'오뮤_다예쁨체',fontSize:32,color:'black'}}>추천 상의와 비슷한 옷장 속 옷들</Text>
               </View>
               <View
                    style={{flex:1}}>
                    <ScrollView horizontal={true}>
                    <Image source={ex}/>
                    <Image source={ex}/>
                    <Image source={ex}/>
                    <Image source={ex}/>
                    <Image source={ex}/>
                </ScrollView>
                </View>
            </View>
            
        </SafeAreaView>
    )

}

export default RecomendShose

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
    }
})