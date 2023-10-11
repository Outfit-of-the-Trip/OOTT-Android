import React, {useContext, useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {TabView, TabBar} from 'react-native-tab-view';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../states/atoms';
import axios from 'axios';
import {AuthContext} from '../../utils/Auth';
import { backendURL } from '../../constants/url';

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
import Bottom from './ClosetScreen/Components/Bottom';
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



const MypageScreen = () => {

  const {logout} = useContext(AuthContext);
  const userInfo = useRecoilValue(userInfoState);

  const witdh = Dimensions.get('window');
  const navigation = useNavigation();

  const gotoTravelPlace = () => {
    return navigation.navigate('KeywordScreen');
  };
  const gotoAbatar = () => {
    navigation.navigate('AbataScreen');
  };

  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [userStyles, setUserStyles] = useState();
  const [getClothesData, setGetClothesData] = useState();
  const [postData, setPostData] = useState();

  const [data, setData] = useState({});
  const [clothesData, setClothesData] = useState({})

  useEffect(()=>{
    setData(clothesData)
  }, [clothesData])

  //tab Index
  const [routes] = useState([
    {key: 'outer', title: '아우터'},
    {key: 'top', title: '상의'},
    {key: 'bottom', title: '하의'},
    {key: 'shoes', title: '신발'},
  ]);

  // 각각 탭 페이지
  const renderScenes = ({route}) => {
    switch (route.key) {
      case 'outer':
        return <Outer imgData={data['outer']} />;
      case 'top':
        return <Top imgData={data['top']} />;
      case 'bottom':
        return <Bottom imgData={data['bottom']} />;
      case 'shoes':
        return <Shoes imgData={data['shoes']} />;
      default:
        return null;
    }
  };

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

        try {
          axios.post(backendURL+`/api/closet/uploadClosetImage`,
            {
              usrId: userInfo.nickname,
              clothesId: postData,
              img: base.base64,
            },
          ).then(()=>{
            getPictureFromDB()
          })
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
        setPostData('bottom');
      } else if (index === 3) {
        setPostData('shoes');
      } else {
        console.log('not included!');
      }
    };
    setIndexs();
  }, [index]);

  //DB 사진 가져오기

  const getPictureFromDB = async () => {
    try {
      await axios.get(backendURL+`/api/closet/getClosetData?userId=${userInfo.nickname}`)
      .then((res)=>{setClothesData(res.data)})
    } 
    catch (e) {
      console.log(e);
    }
  };

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
        const response = await axios.get(backendURL+`/api/users/getUserInfo?userId=${userInfo.nickname}`);
        setUserStyles(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
    getPictureFromDB();
  }, []);



  const MenuSlide = () => {
    return (
      <Box h="5%" w="10%" alignItems="flex-start">
        <Menu
          trigger={triggerProps => {
            return (
              <Pressable {...triggerProps}>
                <HamburgerIcon size={7} />
              </Pressable>
            );
          }}>
          <Menu.Item onPress={gotoTravelPlace}>패션 키워드 설정</Menu.Item>
          <Menu.Item onPress={gotoAbatar}>아바타 설정</Menu.Item>
          <Menu.Item onPress={logout}>로그아웃</Menu.Item>
        </Menu>
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <View style={styles.rootContainer}>

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
              {userStyles ? (
                <Text style={styles.userStyle}>
                  #{userStyles.usrStyle1} #{userStyles.usrStyle2} #
                  {userStyles.usrStyle3}
                </Text>
              ) : (
                <Text style={styles.userStyle}>#취향 #선택을 #해주세요</Text>
              )}
            </View>

          </View>

            <View style={styles.menuContainer}>
              <MenuSlide />
            </View>
        </View>



        <View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
           
            <View style={{flex: 5, marginLeft: 20,}}>
              <Text style={{
                fontSize: 20,
                color:"black",
                fontWeight:"bold"
              }}>MY CLOSET</Text>
            </View>

              <TouchableOpacity
                    style={styles.plusButtonContainer}
                    onPress={modalOpen}>
                    <Text style={styles.plusButton}>+</Text>
              </TouchableOpacity>
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
                  // onTabPress={getPictureFromDB}
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
    flex: 0.2,
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 2,
    marginLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  closetContainer: {
    flex: 7,
  },

  plusButtonContainer: {
    flex: 8,
    marginRight: 20,
    alignItems: 'flex-end',
  },

  plusButton: {
    width: 30,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: '#a3a3c4',
    borderRadius: 100,
  },

  ModalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profImgContainer: {
    flex: 0.4,
    marginLeft: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  profileList: {
    flex: 1.3,
    justifyContent: 'center',
    flexDirection: 'column',
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
    fontSize: 18,

  },
  listBackground: {
    backgroundColor: 'white',
  },
  listunderline: {
    backgroundColor: 'black',
  },
});

export default MypageScreen;