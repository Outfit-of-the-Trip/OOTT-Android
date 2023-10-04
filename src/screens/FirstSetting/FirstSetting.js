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
import { Button } from 'react-native-paper';



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
    info : '가나다',
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
    info : '',
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
    info : '',
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
    info : '',
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
    info : '',
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
    info : '',
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
    info : '',
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
    info : '',
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
    info : '',
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
    info : '',
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
    info : '',
  },
];


const FirstSetting = () => {
  const navigation = useNavigation();
  const [isFirstLogin,setIsFirstLogin] = useRecoilState(isUserFirstLogin)
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Add this state
  const [likedKeywords, setLikedKeywords] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const width = useWindowDimensions().width; //기기 넓이
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


  const setUserInfo = async () =>{ //유저 정보 post
    /* let gd = String(userInfo.gender).substring(0,1); // 성별 */
   /*  let ag = parseInt(String(userInfo.ageRange).substring(4,6)); //나이
       const response = await axios.post('http://10.0.2.2:3000/api/users/setUserInfo',{
      usrId : `zxc`,
      usrGender :`${userInfo.gender}`,
      usrAge :`${ag}`,
      usrProfileURL : `${userInfo.profileImageUrl}`,
      usrStyle1 :`${input[0].userStyle}`,
      usrStyle2 : `${input[1].userStyle}`,
      usrStyle3 : `${input[2].userStyle}`,
    })  */
    return navigation.navigate("Bottomtab")
}



  const handleNextKeyword = () => {

    if (currentKeywordIndex < layouts.length - 1) {
      const nextKeywordIndex = currentKeywordIndex + 1;
      setCurrentKeywordIndex(nextKeywordIndex);
      setCurrentImageIndex(0); // 다음 키워드로 이동할 때 첫 번째 사진으로 설정
    } else {
        setCurrentKeywordIndex(0);
        setCurrentImageIndex(0); // 다음 키워드로 이동할 때 첫 번째 사진으로 설정
    }
  };

  const handleBeforeKeyword = () => {
    if (currentKeywordIndex > 0) {
      const previousKeywordIndex = currentKeywordIndex - 1;
      setCurrentKeywordIndex(previousKeywordIndex);
      setCurrentImageIndex(0); // 이전 키워드로 이동할 때 첫 번째 사진으로 설정
    }else{
      setCurrentKeywordIndex(10);
      setCurrentImageIndex(0); // 이전 키워드로 이동할 때 첫 번째 사진으로 설정
    }
  };

  const keyword = layouts[currentKeywordIndex].keyword;
  const keywordImages = layouts[currentKeywordIndex].images;
  const info = layouts[currentKeywordIndex].info;
  const handleLikeToggle = () => {
    if (likedKeywords.includes(keyword)) {
      // 좋아요 해제되었을 때
      const updatedInput = input.map(inputItem => {
        if (inputItem.userStyle === keyword) {
          return { ...inputItem, userStyle: "empty" };
        }
        return inputItem;
      });
      setInput(updatedInput);
      setLikedKeywords(likedKeywords.filter(kw => kw !== keyword));
      setLikesCount(prevLikesCount => prevLikesCount - 1);
    } else if (likedKeywords.length < 3) {
      // 좋아요 눌렸을 때
      const updatedInput = input.map(inputItem => {
        if (inputItem.id === likedKeywords.length + 1) {
          return { ...inputItem, userStyle: keyword };
        }
        return inputItem;
      });
      setInput(updatedInput);
      setLikedKeywords([...likedKeywords, keyword]);
      setLikesCount(prevLikesCount => prevLikesCount + 1);
    } else {
      console.log('키워드 선택은 3개까지');
    }
  };
  

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

  console.log(input);

  return (
    <View style={styles.all}>
      <View style={[styles.textContainer,{marginHorizontal:width-(width-20)}]}>
        <View
          style={{alignItems:'flex-start'}}>
          <Text
           style={{fontSize:20,marginLeft:5,color:'white',fontFamily:'SCDream4'}}>Choose Your preference</Text>  
          <Text
            style={{fontSize:20,marginLeft:5,color:'white',fontFamily:'SCDream6'}}>#{keyword}</Text>
        </View>
            <TouchableOpacity
            onPress={setUserInfo}>
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
        <View>
             <Text
              style={{fontSize:24,color:'white',fontFamily:'SCDream5'}}>#{keyword} style</Text>
            <Text
              style={{color:'white',fontFamily:'SCDream4'}}>{info}</Text>
        </View>
        <View
          style={{flexDirection:'row',alignItems:"center",justifyContent:'space-between'}}>
        </View>
          <View
          style={{flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity
            onPress={handleBeforeKeyword}>
            <Text style={styles.beforeBtn}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={handleLikeToggle}
              style={{marginRight:10}}>
              <Button
                mode='outlined'
                textColor='white'
                labelStyle={{fontFamily:'SCDream4',fontSize:15}}
                style={{
                    borderStyle: 'solid',
                    borderwidth:10,
                    borderColor:'white',
                    paddingHorizontal:50,
                    borderRadius: 5,}}>선택</Button>
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
    backgroundColor: 'black',
  },
  textContainer: {
    flex: 0.1,
    marginTop:5,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  text: {
    fontFamily:'오뮤_다예쁨체',
    fontSize: 20,
  },
  layout1: {
    flex: 0.8,
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
    flex: 0.3,
    justifyContent:'space-around'
  },
  heartIcon: {
    width: 30,
    height: 30,
    tintColor: 'red', // 설정하지 않으면 이미지의 기본 색상 유지
  },
  beforeBtn: {
    fontSize: 24,
    fontFamily:'STDream4',
    color: 'white',
  },
  nextBtn: {
    fontSize: 24,
    fontFamily:'STDream4',
    color: 'white',
  },
  doneBtnText: {
    fontSize: 24,
    fontFamily:'SCDream3',
    color: 'white',
  },
});

export default FirstSetting;
