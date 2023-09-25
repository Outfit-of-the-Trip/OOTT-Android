import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';

import Goodheartfilled from '../../assets/images/goodheartfilled-240.png';
import Goodheart from '../../assets/images/goodheart.png';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from '@rneui/themed';
import {AuthContext} from '../../utils/Auth';
import {useWindowDimensions} from 'react-native';
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { isUserFirstLogin } from '../../states/atoms';


const layouts = [
  {
    keyword: 'formal',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'dandy',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'casual',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'street',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'sporty',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'vintage',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'modern',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'feminine',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'minimalism',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'Amekazi',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: 'classic',
    images: [
      'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
];


const KeywordScreen = () => {
  const [isFirstLogin,setIsFirstLogin] = useRecoilState(isUserFirstLogin)
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Add this state
  const [likedKeywords, setLikedKeywords] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [input,setInput] = useState([
    {
      id:1,
      userStyle : 'null'
     },
     {
      id:2,
      userStyle : 'null'
     },
     {
      id:3,
      userStyle : 'null'
     },
    ]);
  const {userInfo} = useContext(AuthContext);
  const width = useWindowDimensions().width; //기기 넓이

  const setUserInfo = async () =>{ //유저 정보 post
    if(isFirstLogin!==false){ //처음 로그인이라면 
    try{const response = await axios.post('http://10.0.2.2:3000/api/users/setUserInfo',{
      usrId : "iop",
      usrGender :"M",
      usrAge : 25,
      usrProfileURL : "http://imgtest.png",
      usrStyle1 :input[0].userStyle,
      usrStyle2 : input[1].userStyle,
      usrStyle3 : input[2].userStyle,
  })
  console.log(response.data);
  setIsFirstLogin(true)
      }catch(e){console.log(`${e.error}`)}
  }else{ //처음 로그인이 아니라면
    try{
      const response = await axios.patch('http://10.0.2.2:3000/api/users/updateUserInfo/?userId=admin',{
        userStyle1 : input[0].userStyle,
        userStyle2 : input[1].userStyle,
        userStyle3 : input[2].userStyle,
      })
      
    }catch(e){console.log(e)}
  } 
}

  const getUserInfo = () =>{
    axios.get('http://10.0.2.2:3000/api/users/getUserInfo?userId=iop')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  const handleNextKeyword = () => {

    if (currentKeywordIndex < layouts.length - 1) {
      const nextKeywordIndex = currentKeywordIndex + 1;
      setCurrentKeywordIndex(nextKeywordIndex);
      setCurrentImageIndex(0); // 다음 키워드로 이동할 때 첫 번째 사진으로 설정
    } else {
      console.log('No more layouts available.');
    }
  };

  const handleBeforeKeyword = () => {
    if (currentKeywordIndex > 0) {
      const previousKeywordIndex = currentKeywordIndex - 1;
      setCurrentKeywordIndex(previousKeywordIndex);
      setCurrentImageIndex(0); // 이전 키워드로 이동할 때 첫 번째 사진으로 설정
    }
  };

  const keyword = layouts[currentKeywordIndex].keyword;
  const keywordImages = layouts[currentKeywordIndex].images;

  const handleLikeToggle =  () => {
    if (likedKeywords.includes(keyword)) { //좋아요 해제되었을 때
      setLikedKeywords(likedKeywords.filter(kw => kw !== keyword)); 
      setLikesCount(prevLikesCount => {
      const updateLikesCount = prevLikesCount - 1;
      /* console.log("좋아요해제",updateLikesCount);
      console.log("좋아요해제배열",input) */
      setInput(data => { //좋아요된 키워드 선택 
        return data.map(inputItem =>{ 
          if(inputItem.id === updateLikesCount){ 
            return {...inputItem, userStyle: "empty"};
          }
          return inputItem
        })
      });
      return updateLikesCount})}
     else {
      if (likedKeywords.length < 3) { // 좋아요 눌렸을 때
        setLikedKeywords([...likedKeywords, keyword]);
        setLikesCount(prevLikesCount =>{
        if(prevLikesCount < 3){
          const updatedLikesCount = prevLikesCount + 1;
          /* console.log("좋아요",updatedLikesCount);
          console.log("좋아요배열",input) */
          setInput(data => {
          return data.map(inputItem =>{
            if(inputItem.id === updatedLikesCount){
              console.log(inputItem);
              return {...inputItem, userStyle: keyword};
            }
            return inputItem;
          })
      });
        return updatedLikesCount}else{
          console.log('키워드 선택은 3개까지')
          return prevLikesCount;
        }})
      }
       else {
        console.log('키워드 선택은 3개까지');
      }
    }
  }

  const ImageSwiper = ({images, currentImageIndex}) => {
    return (
      <Swiper loop={false} showsButtons={false} index={currentImageIndex}>
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{uri: image}} style={styles.swiperImage} />
          </View>
        ))}
      </Swiper>
    );
  };

  return (
    <View style={styles.all}>
      <View style={[styles.textContainer,{marginHorizontal:width-(width-20)}]}>
        <View
          style={{flexDirection:'row',alignItems:'center'}}>
          <Avatar
            size={35}
            rounded
            source={{
              uri:userInfo.profileImageUrl}}/>
          <Text
            style={{fontSize:20,marginLeft:5}}>{userInfo.nickname}</Text>
        </View>
            <TouchableOpacity
            onPress={getUserInfo}>
            <Text style={styles.doneBtnText}>완료</Text>
          </TouchableOpacity>
      </View> 

      <View style={styles.layout1}>
          <ImageSwiper
            images={keywordImages}
            currentImageIndex={currentImageIndex}
          />
      </View>

      <View style={[styles.bottom,{marginHorizontal:width-(width-20)}]}>
        <View
          style={{flexDirection:'row'}}>
          <TouchableOpacity
              onPress={handleLikeToggle}
              style={{marginRight:10}}>
              <Image
                source={
                  likedKeywords.includes(keyword) ? Goodheartfilled : Goodheart
                }
                style={styles.heartIcon}
              />
            </TouchableOpacity>
        </View>
        <View
          style={{flexDirection:'row',alignItems:"center",justifyContent:'space-between'}}>
          <Text
              style={{fontSize:32,color:'#4949E8',fontFamily:'오뮤_다예쁨체'}}>#{keyword}</Text>
          <Text style={styles.text}>
            키워드를 선택해주세요
          </Text>
        </View>
          <View
          style={{flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity
            onPress={handleBeforeKeyword}>
            <Text style={styles.beforeBtn}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNextKeyword}>
            <Text style={styles.nextBtn}>다음</Text>
          </TouchableOpacity>
          </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  all: {
    flex: 3,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flex: 0.1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  text: {
    fontFamily:'오뮤_다예쁨체',
    fontSize: 20,
  },
  layout1: {
    flex: 1,
  },
  keywordContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
  keyword: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  ImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  swiperImage: {
    flex: 1,
  },
  bottom: {
    flex: 0.2,
  },
  heartIcon: {
    width: 30,
    height: 30,
    tintColor: 'red', // 설정하지 않으면 이미지의 기본 색상 유지
  },
  beforeBtn: {
    fontSize: 24,
    fontFamily:'오뮤_다예쁨체',
    color: '#000000',
  },
  nextBtn: {
    fontSize: 24,
    fontFamily:'오뮤_다예쁨체',
    color: '#000000',
  },
  doneBtnText: {
    fontSize: 24,
    fontFamily:'오뮤_다예쁨체',
    color: '#000000',
  },
});

export default KeywordScreen;
