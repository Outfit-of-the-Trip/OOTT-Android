import React, {useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { recommendDetailStates, userInfoState, dateState, searchState, reasonState, friendsState, categoryState } from '../../../states/atoms';
import axios from 'axios';
import { testURL } from '../../../constants/url';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SplashVideo from '../../../components/SplashVideo';
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import Swiper from 'react-native-swiper'


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

    
    const width = useWindowDimensions().width; //기기 폭 값
    
    const BaseURL = testURL

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
                setTest(res.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        getRecommendedDate()
        setRecommendClothes(RecomendGarmet)   
        setSelectedDate(RecomendGarmet[0].date)
        setClothes(RecomendGarmet[0].clothes)
     
    }, [])

    useEffect(()=>{
        setClothes(RecomendGarmet[selectIndex].clothes)
    }, selectedDate)

    const [selectedDate, setSelectedDate] = useState(null);
    const [clothes, setClothes] = useState([])
    const [selectIndex, setSelectIndex] = useState(0);

    return(
        <View style={styles.rootContainer}>
            {/* {isLoding ? (<SplashVideo />) : ( */}

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
                        data={RecomendGarmet}
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
                                setSelectedDate(item.date)
                                setSelectIndex(index)
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
                    activeDotColor="black"
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

           {/*  )} */}
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
        justifyContent: "center",
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
        left:20,
        right:0,

        width: 200,
        height: 250,
    },

    top:{
        position: "absolute",
        top: 30,
        bottom: 0,
        left: 190,
        right:0,

        width: 170,
        height: 170,
    },

    bottom:{
        position: "absolute",
        top: 190,
        bottom: 0,
        left: 150,
        right:0,

        width: 250,
        height: 250,
    },

    shoes:{
        position: "absolute",
        top:350,
        bottom: 0,
        left:70,
        right:0,

        width: 80,
        height: 80,
    },
   
})

export default RecommendScreen