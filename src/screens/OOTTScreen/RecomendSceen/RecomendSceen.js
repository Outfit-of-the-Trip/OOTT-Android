import React, {useState, useEffect, useRef } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { recommendDetailStates, userInfoState, dateState, searchState, reasonState, friendsState, categoryState } from '../../../states/atoms';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { testURL } from '../../../constants/url';
import { useWindowDimensions } from 'react-native';
import SplashVideo from '../../../components/SplashVideo';
import { RecomendGarmet } from '../../../constants/RecomendGarmet';

import Vertical from './Components/Vertical';

import { Dimensions } from 'react-native';
const { height: screenHeight } = Dimensions.get('window');


import {
    StyleSheet,
    View,
} from 'react-native';



const RecomendSceen = () => {

    
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
     
    }, [])
            

    return(
        <View style={styles.rootContainer}>
            {isLoding ? (<SplashVideo />) : 
            (
                <Vertical />
            )}
        </View>



    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    header:{
        flex: 1,
    },


    slide:{
        flex: 1,
    },

    textContainer:{
        flex:1,
    },
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
})

export default RecomendSceen