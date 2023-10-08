import React, {useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { recommendDetailStates, userInfoState, dateState, searchState, reasonState, friendsState, categoryState } from '../../../states/atoms';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SplashVideo from '../../../components/SplashVideo';

import Swiper from 'react-native-swiper'
import base64 from 'base-64';
import { backendURL } from '../../../constants/url';
import { WithLocalSvg } from 'react-native-svg';
import circle from './heartSvg/circle.svg'
import heartWhite from './heartSvg/heartWhite.svg'
import heartSelect from './heartSvg/heartSelect.svg'
import Icon from 'react-native-vector-icons/FontAwesome5';


import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
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
    

    const [place, setPlace] = useRecoilState(searchState);
    const [date, setDate] = useRecoilState(dateState);
    const [reason, setReason] = useRecoilState(reasonState);
    const [friend, setFreind] = useRecoilState(friendsState);
    const [category, setCategory] = useRecoilState(categoryState);
    const [userInfo] = useRecoilState(userInfoState);

    const [recommendClothes, setRecommendClothes] = useState(recommendDetailStates)
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


    const sendTravelData = async () => {
        
        axios.post(backendURL+'/api/travel/addTravelInfo', {
            usrId: userInfo.nickname,
            travlDate: date,
            travlFriends: friend,
            travlPlace: place,
            travlCategory: category,
            travlReason: reason,
            coordi: coordi
        })
        .then(function (res) {
            if(res.data.success) {
                setPlace("")
                setDate([])
                setReason("")
                setFreind([])
                setCategory("")
                endOOTT()
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const endOOTT = () => {
        return navigation.navigate('MainScreen')
    }
    

    useEffect(() => {
        const getRecommendedDate= async () => {
            axios.post(backendURL+'/api/recommend/getRecommend', travelData)
            .then(function (res) {
                console.log('rerender')
                setIsLoding(false)
                const Data = JSON.parse(base64.decode(res.data));
                setRecommendClothes(Data)
                setSelectedDate(Data[0].date)
                setClothes(Data[0].clothes)
                setCoordi(
                    Data.map(item => ({
                        date: item.date,
                        clothes: {}
                    }))
                )
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        getRecommendedDate()
    }, [])

    const [selectedDate, setSelectedDate] = useState(0);
    const [selectIndex, setSelectIndex] = useState(0);

    const [clothes, setClothes] = useState([])

    useEffect(() => {
        if (recommendClothes && selectIndex >= 0 && selectIndex < recommendClothes.length) {
            setClothes(recommendClothes[selectIndex].clothes);
        }
    }, [selectIndex]);


    const [coordi, setCoordi] = useState([
        {
            date:null,
            index:null,
            clothes:{}
        }
    ])

    const selectCoordi = (date, index, outer, top, bottom, shoes) => {
        const copy = [...coordi];
        copy[date].index = index
        copy[date].clothes.outer = outer
        copy[date].clothes.top = top
        copy[date].clothes.bottom = bottom
        copy[date].clothes.shoes = shoes
        setCoordi(copy)
    }

    useEffect(()=>{
        console.log(coordi)
    }, [coordi])

    const HeartClick = (props) => {
        return (
            <TouchableOpacity onPress={()=>{selectCoordi(props.selectedDate, props.index, props.outer, props.top, props.bottom, props.shoes)}}>
                <View style={{ position: 'relative' }}>
                    <WithLocalSvg width={35} height={35} fill="#000000" asset={circle} />
                    <View style={{ position: 'absolute', top: 8, left: 5.7 }}>
                        <WithLocalSvg width={23} height={23} fill="#000000" asset={props.isClicked} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    return(
        <View style={styles.rootContainer}>
            {isLoding && clothes ? (<SplashVideo />) : (
            <>

            <View style={styles.header}>

                <View style={{flex: 7}}>

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Today's look to {place}</Text>
                    </View>


                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Select Date</Text>
                    </View>
                </View>

                <View style={{flex: 2}}>
                    <TouchableOpacity 
                        style={{flex: 1.5, justifyContent: "center", alignItems:"center", marginTop: 20 }}
                        disabled={coordi.filter(item => 'index' in item).length == recommendClothes.length? false : true}
                        onPress={sendTravelData}
                    >
                        <Icon
                            name="check-circle"
                            size={35}
                            color={coordi.filter(item => 'index' in item).length == recommendClothes.length? 'black' : 'grey'}
                        />
                        <Text style={{
                            fontWeight: "bold",
                            color: coordi.filter(item => 'index' in item).length == recommendClothes.length ? 'black' : 'grey'
                        }}>선택 완료</Text>
                    </TouchableOpacity>
                    
                </View>
                
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
                            <View style={{flex: 1, margin:5, alignItems:"flex-end"}}>
                                <HeartClick
                                    isClicked = {
                                        coordi[selectIndex].date == selectedDate && coordi[selectIndex].index == index
                                        ?  heartSelect : heartWhite
                                    }
                                    selectedDate={selectIndex}
                                    index={index}
                                    outer={item.outter.img}
                                    top={item.top.img}
                                    bottom={item.bottom.img}
                                    shoes={item.shoes.img}
                                />
                            </View>
                            
                            <View style={{flex: 12}}>
                                <TouchableOpacity onPress={()=>{gotoDetail(item.outter.detail)}}>
                                    <Image
                                        style={styles.outer} 
                                        source={{uri: item.outter.img}}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity 

                                    onPress={()=>{gotoDetail(item.top.detail)}}
                                >
                                    <Image
                                        style={styles.top} 
                                        source={{uri: item.top.img}}
                                    />
                                </TouchableOpacity>
                                

                                <TouchableOpacity 
                                    onPress={()=>{gotoDetail(item.bottom.detail)}}
                                >
                                    <Image
                                        style={styles.bottom}
                                        source={{uri: item.bottom.img}}
                                    />
                                </TouchableOpacity>


                                <TouchableOpacity 
                                    onPress={()=>{gotoDetail(item.shoes.detail)}}
                                >
                                    <Image
                                        style={styles.shoes}
                                        source={{uri: item.shoes.img}}
                                    />
                                </TouchableOpacity>

                            </View>
                        

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
    header:{
        flex: 1,
        justifyContent: "center",
        flexDirection: "row"
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




    outer:{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right:0,

        width: 250,
        height: 300,
    },
    top:{
        position: "absolute",
        top: 20,
        bottom: 0,
        left: 190,
        right: 0,

        width: 200,
        height: 190,
    },
    bottom:{
        position: "absolute",
        top: 200,
        bottom: 0,
        left: 180,
        right:0,

        width: 230,
        height: 230,
    },
    shoes:{
        position: "absolute",
        top: 310,
        bottom: 0,
        left: 40,
        right:0,

        width: 100,
        height: 100,
    },
   
})

export default RecommendScreen