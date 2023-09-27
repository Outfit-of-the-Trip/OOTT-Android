import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Swiper from 'react-native-swiper';

const layouts = [
  { keyword: '#포말' , images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
  { keyword: '#댄디', images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ] },
  { keyword: '#캐주얼', images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
  { keyword: '#스트릿' ,images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
  { keyword: '#스포티' ,images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
  { keyword: '#빈티지' ,images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
  { keyword: '#모던' ,images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
  { keyword: '#페미닌' ,images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
  { keyword: '#미니멀리즘' ,images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
  { keyword: '#아메카지' ,images : [
    'https://th.bing.com/th/id/OIP.J4xQSd6q1zZU0Eol_YwXOgHaJP?w=158&h=198&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
  { keyword: '#클래식' ,images : [
    'https://th.bing.com/th/id/OIP.gCF3nMpf8DYR6UGuMnfP6wAAAA?w=176&h=202&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Zm9ydEHQtSYe4Gqv4tq90gHaIp?w=153&h=180&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.nkvH3Uds4vJtH1AmYxhwVAHaHa?w=209&h=209&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.TEZ5mKQHg3pvFztiGv9yOgHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.CQZcsTUegtie8lsXCex86gHaKg?w=137&h=195&c=7&r=0&o=5&pid=1.7',
    // Add more image URLs here.
  ]},
];


const KeywordScreen = () => {
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Add this state
  const [likedKeywords, setLikedKeywords] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

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


  const handleLikeToggle = () => {
    if (likedKeywords.includes(keyword)) {
      setLikedKeywords(likedKeywords.filter((kw) => kw !== keyword));
      setLikesCount(likesCount - 1);
    } else {
      if (likedKeywords.length < 3) {
        setLikedKeywords([...likedKeywords, keyword]);
        setLikesCount(likesCount + 1);
      } else {
        // Show a message or handle the case where the user tries to like more than 3 keywords
        // You can display a toast, alert, or disable the like button here.
        console.log('You can only like up to 3 keywords.');
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
      <View style={styles.textContainer}>
        <Text style={styles.text}>맘에 드는 키워드를 3개까지 선택해 보세요!</Text>
      </View>

      <View style={styles.layout1}>
        <View style={styles.keywordContainer}>
          <Text style={styles.keyword}>{keyword}</Text>
        </View>

        <View style={styles.ImgContainer}>
        {/* Pass the currentImageIndex to the ImageSwiper */}
          <ImageSwiper images={keywordImages} currentImageIndex={currentImageIndex} />
        </View>
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
