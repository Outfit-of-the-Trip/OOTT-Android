import React, {useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { recommendDetailStates, userInfoState, dateState, searchState, reasonState, friendsState, categoryState } from '../../../states/atoms';
import axios from 'axios';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SplashVideo from '../../../components/SplashVideo';
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import Swiper from 'react-native-swiper'
import base64 from 'base-64';
import { backendURL } from '../../../constants/url';

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Button,
    Image
} from 'react-native';



const RecommendScreen = () => {

    const navigation = useNavigation();

    const gotoDetail = (detail) => {
      return navigation.navigate('RecommendDetail', { date: selectedDate, place: place, detail: detail });
    };

    const gotoFriendsScreen = (date) =>{
        return navigation.navigate('FriendsLook',{date : date})
    }
    const width = useWindowDimensions().width; //기기 폭 값
    
    const BaseURL = backendURL

    const place = useRecoilValue(searchState);
    const date = useRecoilValue(dateState);
    const reason = useRecoilValue(reasonState);
    const friend = useRecoilValue(friendsState);
    const category = useRecoilValue(categoryState);
    const userInfo = useRecoilValue(userInfoState);

    const [recommendClothes, setRecommendClothes] = useRecoilState(recommendDetailStates)
    const [test, setTest] = useState(null)

    const [isLoding, setIsLoding] = useState(true);

    const travelData = {
        "userId": userInfo.nickname,
        "gender": userInfo.gender,
        "place": place,
        "date": date,
        "reason": reason,
        "friend": friend,
        "category": category,
    };
    

    useEffect(() => {
        const getRecommendedDate= async () => {
            axios.post(BaseURL+'/api/recommend/getRecommend', travelData)
            .then(function (res) {
                setIsLoding(false)
                const Data = JSON.parse(base64.decode(res.data));
                setRecommendClothes(Data)
                setSelectedDate(Data[0].date)
                setClothes(Data[0].clothes)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        getRecommendedDate()
    }, [])

    const [selectedDate, setSelectedDate] = useState(0);
    const [clothes, setClothes] = useState([])
    const [selectIndex, setSelectIndex] = useState(0);

    useEffect(() => {
        if (recommendClothes && selectIndex >= 0 && selectIndex < recommendClothes.length) {
            setClothes(recommendClothes[selectIndex].clothes);
        }
    }, [selectIndex, recommendClothes]);



    const [coordi, setCoordi] = useState([])


    return(
        <View style={styles.rootContainer}>
            {isLoding ? (<SplashVideo />) : (
                <>

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Today's look to {place}</Text>
            </View>


            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Select Date</Text>
            </View>


            <View style={styles.buttonContainer}>
                <View style={styles.flalistContainer}>
                    <FlatList
                        horizontal
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={recommendClothes}
                        renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems:"center",
                                width:140,
                                height:32,
                                marginHorizontal: 8,
                                borderRadius: 20,
                                backgroundColor: selectedDate === item.date ? 'blue' : 'white',
                            }}
                            onPress={() => {
                                setSelectIndex(index)
                                setSelectedDate(item.date)
                            }}
                        >
                            <Text 
                                style={{ 
                                    fontSize: 17,
                                    fontWeight: "500",
                                    color: selectedDate === item.date ? 'white' : 'grey' 
                                }}>
                            {item.date}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.date}
                    />
                </View>
            </View>


            <View style={styles.clothesContainer}>
                <Swiper 
                    style={styles.wrapper} 
                    horizontal={true} 
                    activeDotColor="blue"
                >   
                {clothes && clothes.map((item, index) =>(
                    
                        <View style={styles.imageContainer} key={index}>
                            
                                <TouchableOpacity onPress={()=>{gotoDetail(item.outter.detail)}}>
                                    <Image
                                        style={styles.outter}
                                        source={{uri: item.outter.img}}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>{gotoDetail(item.top.detail)}}>
                                    <Image
                                        style={styles.top}
                                        source={{uri: item.top.img}}
                                    />
                                </TouchableOpacity>
                                

                                <TouchableOpacity onPress={()=>{gotoDetail(item.bottom.detail)}}>
                                    <Image
                                        style={styles.bottom}
                                        source={{uri: item.bottom.img}}
                                    />
                                </TouchableOpacity>


                                <TouchableOpacity onPress={()=>{gotoDetail(item.shoes.detail)}}>
                                    <Image
                                        style={styles.shoes}
                                        source={{uri: item.shoes.img}}
                                    />
                                </TouchableOpacity>
                        

                        </View>
                    ))}
                </Swiper>
            </View>
            </>
          )}
        </View>



    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    headerContainer:{
        flex: 1,
        justifyContent: "center",
    },
    titleContainer: {
        flex: 0.5,
        justifyContent: "space-between",
        flexDirection:'row'
    },
    buttonContainer:{
        flex: 1,
        justifyContent: "center",
    },
    flalistContainer:{
        justifyContent: "center",
    },
    clothesContainer:{
        flex: 7,
    },
    imageContainer:{
        flex:1,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#f0f0f0"
    },




    headerText:{
        fontSize: 23,
        marginLeft: 10,
        color: "black",
        fontWeight: "bold"
    },    
    titleText:{
        fontSize: 22,
        marginLeft: 10,
        color: "black",
    },


    outter:{
        position: "absolute",
        top: 30,
        bottom: 0,
        left: 2,
        right:0,

        width: 230,
        height: 270,
    },

    top:{
        position: "absolute",
        top: 30,
        bottom: 0,
        left: 180,
        right:0,

        width: 230,
        height: 230,
    },

    bottom:{
        position: "absolute",
        top: 230,
        bottom: 0,
        left: 180,
        right:0,

        width: 230,
        height: 230,
    },

    shoes:{
        position: "absolute",
        top: 350,
        bottom: 0,
        left: 60,
        right:0,

        width: 130,
        height: 90,
    },
   
})

export default RecommendScreen