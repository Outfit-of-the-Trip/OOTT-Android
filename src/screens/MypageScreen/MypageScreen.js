import React, {useContext, useEffect, useRef, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../utils/Auth';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {TabView, TabBar} from 'react-native-tab-view';
import {
  Pressable,
  HamburgerIcon,
  Menu,
  Box,
  NativeBaseProvider,
} from 'native-base';

import Gallery from './ClosetScreen/Components/Gallery';
import Outer from './ClosetScreen/Components/Outer';
import Top from './ClosetScreen/Components/Top';
import Pants from './ClosetScreen/Components/Pants';
import Shoes from './ClosetScreen/Components/Shoes';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';

import axios from 'axios';

const MypageScreen = () => {
  const witdh = Dimensions.get('window');
  const navigation = useNavigation();

  const gotoTravelPlace = () => {
    return navigation.navigate('KeywordScreen');
  };

  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [travlePlan, setTravlePlan] = useState();
  const [userStyles, setUserStyles] = useState();
  const [getClothesData, setGetClothesData] = useState();
  const [postData, setPostData] = useState();
  const [divideValue, setDivideValue] = useState({
    Outer: [],
    Top: [],
    Pants: [],
    Shoes: [],
  });
  // 옷장 데이터
  const [data, setData] = useState({
    Outer: [],
    Top: [],
    Pants: [],
    Shoes: [],
  });

  //tab Index
  const [routes] = useState([
    {key: 'outer', title: '아우터'},
    {key: 'top', title: '상의'},
    {key: 'pants', title: '하의'},
    {key: 'shoes', title: '신발'},
  ]);

  // 각각 탭 페이지
  const renderScenes = ({route}) => {
    switch (route.key) {
      case 'outer':
        return <Outer outer={data.Outer} value={divideValue.Outer} />;
      case 'top':
        return <Top top={data.Top} value={divideValue.Top} />;
      case 'pants':
        return <Pants pants={data.Pants} value={divideValue.Pants} />;
      case 'shoes':
        return <Shoes shoes={data.Shoes} value={divideValue.Shoes} />;
      default:
        return null;
    }
  };

  const {userInfo} = useContext(AuthContext);
  const {logout} = useContext(AuthContext);

  //사진 크기
  const options = {
    mediaType: 'image',
    maxWidth: 512,
    maxHeight: 512,
    includeBase64: Platform.OS === 'android',
  };

  //Modal Open
  const modalOpen = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
    }
  };

  //갤러리에서 사진 선택
  const onLaunchImageLibrary = async () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        const ImgUri = response.assets[0].uri;
        const base = response.assets[0];
        console.log('base: ', base.base64);
        if (base !== '') {
          setData(prevData => ({
            ...prevData,
            Outer: [...prevData.Outer, ImgUri],
            Top: [...prevData.Top, ImgUri],
            Pants: [...prevData.Pants, ImgUri],
            Shoes: [...prevData.Shoes, ImgUri],
          }));
        }
        // console.log('data: ', data);
        // console.log('postData1:', postData);
        try {
          const response = axios.post(
            `http://10.0.2.2:3000/api/closet/uploadClosetImage`,
            {
              usrId: 'admin', // 추후 userInfo.nickname으로 변경해 주어야 함.
              clothesId: postData,
              img: base.base64,
            },
          );
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  useEffect(() => {
    const setIndexs = () => {
      if (index === 0) {
        setPostData('outer');
      } else if (index === 1) {
        setPostData('top');
      } else if (index === 2) {
        setPostData('pants');
      } else if (index === 3) {
        setPostData('shoes');
      } else {
        console.log('not included!');
      }
    };
    setIndexs();
  }, [index]);

  //DB 사진 가져오기
  useEffect(() => {
    const getPictureFromDB = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:3000/api/test/getClosetTable`,
        );
        setGetClothesData(response.data);
        getClothesData.filter(item => {
          switch (item.clothesId) {
            case 'outer':
              setDivideValue(prevData => ({
                ...prevData,
                Outer: [...prevData.Outer, item],
              }));
              return divideValue;
            case 'top':
              setDivideValue(prevData => ({
                ...prevData,
                Top: [...prevData.Top, item],
              }));
              return divideValue;
            case 'pants':
              setDivideValue(prevData => ({
                ...prevData,
                Pants: [...prevData.Pants, item],
              }));
              return divideValue;
            case 'shoes':
              setDivideValue(prevData => ({
                ...prevData,
                Shoes: [...prevData.Shoes, item],
              }));
              return divideValue;
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    getPictureFromDB();
  }, []);

  //카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        console.log(response.assets[0].uri);
      }
    });
  };

  //유저 데이터 불러오기
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:3000/api/users/getUserInfo?userId=${userInfo.nickname}`,
        );
        setUserStyles(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, [userStyles]);

  //내 여행 일정 불러오기
  useEffect(() => {
    const getmyTravleInfo = async () => {
      try {
        const response = await axios.get(
          'http://10.0.2.2:3000/api/travel/getMyTravelInfo?userId=정성욱',
        );
        const countTravlePlan = response.data.filter(
          item => item.usrId === userInfo.nickname,
        ).length;
        setTravlePlan(countTravlePlan);
      } catch (e) {
        console.log(e);
      }
    };
    getmyTravleInfo();
  }, [travlePlan]);

  useEffect(() => {
    console.log('divideValue: ', divideValue);
    // console.log('divideValue.Top: ', divideValue.Top);
    // console.log('getClothesData :', getClothesData);
  }, [postData, index]);

  const MenuSlide = () => {
    return (
      <Box h="10%" w="10%" alignItems="flex-start">
        <Menu
          trigger={triggerProps => {
            return (
              <Pressable {...triggerProps}>
                <HamburgerIcon size={30} />
              </Pressable>
            );
          }}>
          <Menu.Item onPress={gotoTravelPlace}>패션 키워드 설정</Menu.Item>
          <Menu.Item onPress={() => console.log('아바타')}>
            아바타 설정
          </Menu.Item>
          <Menu.Item onPress={logout}>로그아웃</Menu.Item>
        </Menu>
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <View style={styles.rootContainer}>
        <View style={styles.menuContainer}>
          <MenuSlide />
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.profImgContainer}>
            <Image
              style={styles.profileImage}
              source={{uri: userInfo.profileImageUrl}}
            />
          </View>
          <View style={styles.profileList}>
            <View style={styles.userProfileContainer}>
              <Text style={styles.userName}>{userInfo.nickname}</Text>
            </View>

            <View style={styles.userProfileContainer}>
              {travlePlan ? (
                <Text style={styles.userTravlePlan}>
                  {travlePlan} Travle Plan
                </Text>
              ) : (
                <Text style={styles.userTravlePlan}>여행 계획이 없습니다.</Text>
              )}
            </View>
            <View style={styles.userProfileContainer}>
              {userStyles ? (
                <Text style={styles.userStyle}>
                  #{userStyles.usrStyle1} #{userStyles.usrStyle2} #
                  {userStyles.usrStyle3}
                </Text>
              ) : (
                <Text style={styles.userStyle}>#취향 #선택을 #해주세요</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.plusButtonContainer}
              onPress={modalOpen}>
              <Text style={styles.plusButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.closetContainer}>
          <View style={styles.rootContainer}>
            <TabView
              style={styles.listTitle}
              navigationState={{index, routes}}
              renderScene={renderScenes}
              onIndexChange={setIndex}
              initialLayout={{width: witdh}}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={styles.listunderline}
                  style={styles.listBackground}
                  labelStyle={styles.listTitle}
                />
              )}
            />
          </View>
        </View>

        <Gallery
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onLaunchImageLibrary={onLaunchImageLibrary}
          onLaunchCamera={onLaunchCamera}
        />
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  menuContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  profileContainer: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  closetContainer: {
    flex: 8,
  },

  menuButton: {
    margin: 10,
    backgroundColor: 'skyblue',
  },
  plusButtonContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  plusButton: {
    width: 40,
    textAlign: 'center',
    fontSize: 25,
    color: '#FFFFFF',
    backgroundColor: '#9F81F7',
    borderRadius: 60,
  },

  ModalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    flexDirection: 'row',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  profileList: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  userProfileContainer: {
    paddingVertical: 5,
  },
  category: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  userTravlePlan: {
    fontSize: 16,
    color: 'black',
  },
  userStyle: {
    fontSize: 18,
    color: 'black',
  },
  profContent: {
    fontSize: 18, // 버튼 텍스트 크기
    fontWeight: '900',
  },

  buttonWithBackground: {
    width: '80%',
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.4,
    borderColor: '#7401DF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    margin: 10,
    backgroundColor: '#7401DF',
  },
  buttonWithoutBackground: {
    width: '80%',
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.4,
    borderColor: '#7401DF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    margin: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '400',
  },
  btnTexts: {
    textAlign: 'center',
    color: 'black',
    fontSize: 22,
    fontWeight: '400',
  },
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  listTitle: {
    color: 'black',
    fontSize: 20,
  },
  listBackground: {
    backgroundColor: 'white',
  },
  listunderline: {
    backgroundColor: 'black',
  },
});

export default MypageScreen;
