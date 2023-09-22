import React, {useEffect, useState, useContext} from 'react';
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
    keyword: '#스포티',
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
  {
    keyword: '#페미닌',
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
    keyword: '#미니멀리즘',
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
    keyword: '#아메카지',
    images: [
      'https://th.bing.com/th/id/OIP.J4xQSd6q1zZU0Eol_YwXOgHaJP?w=158&h=198&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
      'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
      // Add more image URLs here.
    ],
  },
  {
    keyword: '#클래식',
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
  const navigation = useNavigation();
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Add this state
  const [likedKeywords, setLikedKeywords] = useState([]);
  const [likesCount, setLikesCount] = useState(1);
  const [ispost,setpost] = useState(false);
  const {userInfo} = useContext(AuthContext);
  const width = useWindowDimensions().width; //기기 넓이
  let today = new Date();
  let hours = ('0' + today.getHours()).slice(-2); //시
  let minutes = ('0' + today.getMinutes()).slice(-2); //분
  let seconds = ('0' + today.getSeconds()).slice(-2); //초
  let year = today.getFullYear(); //년
  let month = ('0' + (today.getMonth() + 1)).slice(-2); //월
  let day = ('0' + today.getDate()).slice(-2); //일
  let dateString = year + '-' + month  + '-' + day + ' ';
  let timeString = hours + ':' + minutes  + ':' + seconds;

  const setUserInfo = async () =>{
    try{const response = await axios.post('http://10.0.2.2:3000/api/users/setUserInfo',{
      usrId : `${userInfo.nickname}`,
      usrGender :`M`,
      usrAge : 1,
      usrProfileURL : `${userInfo.profileImageUrl}`,
      usrCreateAt : "2023-08-11 12:41:10"
      
  }); console.log(response.data);
      }catch(e){console.log(`${e.error}`)}
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
      setLikesCount(likesCount - 1);
      console.log(userInfo);
       /* const response = await axios.post(apiURL/) 
        */
    } else {
      if (likedKeywords.length < 3) { // 좋아요 눌렸을 때
        setLikedKeywords([...likedKeywords, keyword]);
        setLikesCount(likesCount + 1);
        /* console.log(keyword); // 키워드 */ 
        console.log(likesCount); //
        const updateStyle =`usrStyle${likesCount.toString()}` //태그칼럼명맞추기
        console.log(updateStyle)
        /* const response = await axios.post(apiURL/,{
           : keyword
        });  */
        
      } else {
        // Show a message or handle the case where the user tries to like more than 3 keywords
        // You can display a toast, alert, or disable the like button here.
        console.log('You can only like up to 3 keywords.');
      }
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
            onPress={setUserInfo}>
            <Text style={styles.doneBtnText}>완료</Text>
          </TouchableOpacity>
      </View> 

      <View style={styles.layout1}>
          {/* Pass the currentImageIndex to the ImageSwiper */}
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
