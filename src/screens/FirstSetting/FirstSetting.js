import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../utils/Auth';
import {useWindowDimensions} from 'react-native';
import {useRecoilState} from 'recoil';
import {isUserFirstLogin} from '../../states/atoms';
import {Button} from 'react-native-paper';

const layouts = [
  {
    keyword: 'dandy',
    images: [
      'https://images.unsplash.com/photo-1520367745676-56196632073f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80',
    ],
    info: '고급스러우면서도 우아하고 정교한 패션 스타일입니다. 고급진 소재, 정교한 스타일링, 정제된 액세서리, 향수 등의 요소로 특징을 만들어냅니다.',
  },
  {
    keyword: 'casual',
    images: [
      'https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    ],
    info: '일상적인 활동이나 비교적 편한 사회적 모임에 적합하며, 꾸미지 않고 편안한 옷을 입는 것을 중시합니다. 특정한 규칙이나 스타일 요소를 따르지 않으며 각자의 개성과 취향에 따른 다양한 변형이 가능합니다.',
  },
  {
    keyword: 'street',
    images: [
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1410&q=80',
    ],
    info: '도시의 길거리에서 영감을 받은 현대적이고 대담한 패션 스타일입니다. 고유한 스타일과 개성을 표현하는데 중점을 두고 패션, 아트, 음악 등의 영감을 결합하여 독특하고 트렌디한 룩을 만들어냅니다.  ',
  },
  {
    keyword: 'sporty',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1440&q=80',
    ],
    info: '스포츠 웨어와 캐주얼한 패션을 결합한 스타일로, 편안한 의류와 운동화, 모자 등 스포츠 액세서리를 활용하여 활동적이고 동적인 룩을 만듭니다',
  },
  {
    keyword: 'vintage',
    images: [
      'https://images.unsplash.com/photo-1594201508621-4e853b4db051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    ],
    info: '과거의 패션 트렌드와 스타일을 현재의 패션에 적용하는 것을 의미합니다. 과거 패션 아이템을 재활용하거나, 현대 아이템을 과거 스타일에 맞게 디자인하거나 조합하여 구성합니다.',
  },
  {
    keyword: 'modern',
    images: [
      'https://images.unsplash.com/photo-1522751707891-45b4e281010d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    ],
    info: '현대 사회와 문화의 영향을 받아 발전한 패션 트렌드와 스타일입니다. 다양한 세대와 성별에 적합하며 기능성, 편안함, 지속 가능성과 같은 요소를 강조합니다.',
  },
  {
    keyword: 'feminine',
    images: [
      'https://images.unsplash.com/photo-1654108370665-340aee9ffdb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    ],
    info: '여성의 우아하고 부드러운 매력을 강조하는 패션 스타일입니다.  여성의 아룸다움과 섬세함을 부각시키며, 부드러운 라인과 여성스러운 디자인을 강조합니다.',
  },
  {
    keyword: 'minimalism',
    images: [
      'https://images.unsplash.com/photo-1535530705774-695729778c55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    ],
    info: '간결하고 단순한 디자인, 중요한 것에 집중하는 스타일로, 불필요한 장식과 복잡한 패턴을 최소화하여 깔끔하고 세련된 룩을 구축합니다. ',
  },
  {
    keyword: 'Amekazi',
    images: [
      'https://plus.unsplash.com/premium_photo-1661373387004-85c85102a16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
    info: '미국의 전통적인 캐주얼 패션 스타일을 나타내며, 주로 청바지, 티셔츠, 플란넬 셔츠, 작업복과 같은 편안하고 견고한 의류를 중심으로 합니다. 아메카지룩은 단순하면서도 실용적인 스타일을 강조하며, 일상적인 활동에서 입기에 적합합니다.',
  },
  {
    keyword: 'classic',
    images: [
      'https://images.unsplash.com/photo-1605992582137-6ee2730fff6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80',
    ],
    info: '유행과 트렌드에 영향을 받지 않고 변하지 않는 전통적이고 고전적인 패션 스타일입니다.단순하면서도 우아하며 정제된 디자인과 소재를 강조합니다.',
  },
];

const FirstSetting = () => {
  const navigation = useNavigation();
  const [isFirstLogin, setIsFirstLogin] = useRecoilState(isUserFirstLogin);
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Add this state
  const [likedKeywords, setLikedKeywords] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const width = useWindowDimensions().width; //기기 넓이
  const [likesCount, setLikesCount] = useState(0);
  const [input, setInput] = useState([
    {
      id: 1,
      userStyle: 'null',
    },
    {
      id: 2,
      userStyle: 'null',
    },
    {
      id: 3,
      userStyle: 'null',
    },
  ]);

  const setUserInfo = async () => {
    //유저 정보 post
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
    return navigation.navigate('Bottomtab');
  };

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
    } else {
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
          return {...inputItem, userStyle: 'empty'};
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
          return {...inputItem, userStyle: keyword};
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
      <View
        style={[
          styles.textContainer,
          {marginHorizontal: width - (width - 20)},
        ]}>
        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 5,
              color: 'white',
              fontFamily: 'SCDream4',
            }}>
            Choose Your preference
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 5,
              color: 'white',
              fontFamily: 'SCDream6',
            }}>
            #{keyword}
          </Text>
        </View>
        <TouchableOpacity onPress={setUserInfo}>
          <Text style={styles.doneBtnText}>완료</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.layout1}>
        <ImageSwiper
          images={keywordImages}
          currentImageIndex={currentImageIndex}
        />
      </View>

      <View style={[styles.bottom, {marginHorizontal: width - (width - 20)}]}>
        <View>
          <Text style={{fontSize: 24, color: 'white', fontFamily: 'SCDream5'}}>
            #{keyword} style
          </Text>
          <Text style={{color: 'white', fontFamily: 'SCDream4'}}>{info}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}></View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={handleBeforeKeyword}>
            <Text style={styles.beforeBtn}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLikeToggle}
            style={{marginRight: 10}}>
            <Button
              mode="outlined"
              textColor="white"
              labelStyle={{fontFamily: 'SCDream4', fontSize: 15}}
              style={{
                borderStyle: 'solid',
                borderwidth: 10,
                borderColor: 'white',
                paddingHorizontal: 50,
                borderRadius: 5,
              }}>
              선택
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextKeyword}>
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
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: '오뮤_다예쁨체',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  swiperImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bottom: {
    flex: 0.3,
    justifyContent: 'space-around',
  },
  heartIcon: {
    width: 30,
    height: 30,
    tintColor: 'red', // 설정하지 않으면 이미지의 기본 색상 유지
  },
  beforeBtn: {
    fontSize: 24,
    fontFamily: 'STDream4',
    color: 'white',
  },
  nextBtn: {
    fontSize: 24,
    fontFamily: 'STDream4',
    color: 'white',
  },
  doneBtnText: {
    fontSize: 24,
    fontFamily: 'SCDream3',
    color: 'white',
  },
});

export default FirstSetting;
