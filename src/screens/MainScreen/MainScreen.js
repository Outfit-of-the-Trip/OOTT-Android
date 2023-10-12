import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useWindowDimensions} from 'react-native';
import {Avatar} from '@rneui/themed';
import axios from 'axios';
import {AuthContext} from '../../utils/Auth';
import FirstLogin from '../../components/FirstLogin';
import recomend1 from '../../assets/images/recomend1.png';
import moreb from '../../assets/images/moreb.png';
import {backendURL,testURL} from '../../constants/url';

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import EmptyScreen from '../../components/EmptyScreen';

const MainScreen = () => {
  const {userInfo} = useContext(AuthContext);
  const navigation = useNavigation();
  const width = useWindowDimensions().width; //기기 넓이
  const [travelea, settravelea] = useState(); //등록된 여행 개수
  const [friend, setfriend] = useState();
  const [userdata, setuserdata] = useState();
  const [userHashTag, setUserHashtag] = useState([
    {id: 1, usrstyle: '#레트로'},
    {id: 2, usrstyle: '#formal'},
    {id: 3, usrstyle: '#하이틴'},
  ]);
  const [data, setData] = useState([]);
  const [travelClothes, setTravelClothes] = useState([]);
  const gotoRecomend = traveldata => {
    return navigation.navigate('RecommendScreen', traveldata);
  };
  const gotoFrineds = () => {
    return navigation.navigate('FriendsLook');
  };

  const translate = item => {
    // 날짜 정리 메서드
    var data = String(item);
    var input = data.substring(2, 10);
    return input;
  };
  const combinedStyles = userHashTag.map(tag => tag.usrstyle).join(''); //태그 합치기
   useEffect(() => {
    console.log("데이터처리신발",modifiedData[0].shoesimgeUrl[0])
    console.log("데이터처리상의",modifiedData[0].topimgeUrl[0])
    console.log("데이터처리아우터",modifiedData[0].outerimgeUrl[0])
    console.log("데이터처리바지",modifiedData[0].bottomimageUrl[0])
  },modifiedData); 



  useEffect(() => {
    //사용자 친구 데이터
    axios
      .get(backendURL + `/api/friends/myFriends?userId=${userInfo.nickname}`)
      .then(function (response) {
        setfriend(response.data.length);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    //사용자 데이터
    axios
      .get(backendURL + `/api/users/getUserInfo?userId=${userInfo.nickname}`)
      .then(function (response) {
        setuserdata(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const modifiedData = data.map((item,index) => {
    const bottomSeqString = data[index].bottomSeq;
    const bottomSeqArr = bottomSeqString.split(',').map(url => url.trim().replace(/\[|\]/g, ''));
    const topSeqString = data[index].topSeq;
    const topSeqArr = topSeqString.split(',').map(url => url.trim().replace(/\[|\]/g, ''));
    const outerSeqString = data[index].outerSeq;
    const outerSeqArr = outerSeqString.split(',').map(url => url.trim().replace(/\[|\]/g, ''));
    const shoesSeqString = data[index].shoesSeq;
    const shoseSeqArr = shoesSeqString.split(',').map(url => url.trim().replace(/\[|\]/g, '')); 
    return {
      id: item.id,
      bottomimageUrl: bottomSeqArr,
      topimgeUrl : topSeqArr,
      outerimgeUrl : outerSeqArr,
      shoesimgeUrl : shoseSeqArr,
      travlDate : item.travlDate,
      travlPlace : item.travlPlace,
      travlReason : item.travlReason
    };
  });

  useEffect(() => {
    //여행정보 데이터
    axios
      .get(
        backendURL + `/api/travel/getMyTravelInfo?userId=박성훈`,
      )
      .then(function (response) {
        settravelea(response.data.length);
        setData(response.data);
        
        
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    //TRAVEL_CLOTHES
    axios
      .get(
        backendURL + `/api/travel/getMyTravelInfo?userId=${userInfo.nickname}`,
      )
      .then(function (response) {
        /*  setTravelClothes(response.data);
        console.log(response.data); */
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    //EXAMPLE
    axios
      .get(testURL + `/api/travel/getMyTravelInfo?userId=admin`)
      .then(function (response) {
        //api 완성되면 travelClothes에서 배열 값 사용해서 옷 이미지 경로 불러오기
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);


  const Showlog = () => {
    if (travelea > 0) {
      return (
        <FlatList
          data={modifiedData}
          nestedScrollEnabled={true}
          renderItem={({item, index}) => (
            <View key={index} style={styles.recomendconatiner}>
              <View style={{marginHorizontal: width - (width - 10)}}>
                <Text style={styles.datetext}>
                  {translate(item.travlDate)} to {item.travlPlace}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.tagtext}>{item.travlReason}</Text>
                  <TouchableOpacity onPress={() => gotoRecomend(item)}>
                    <Image
                      style={{width: 30, height: 20, resizeMode: 'center'}}
                      source={moreb}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
             {/*  <Image
                  style={{resizeMode: 'center'}}
                  source={{uri: item.imageUrl[0]}}
                  onError={(error) => console.log('Image load error for URL:', item.imageUrl[0], 'Error:', error)}
                  />  */}
              </View>
            </View>
      )}
        />
      );
    } else {
      return <EmptyScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: width - (width - 20),
          marginTop: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('FriendsLook')}>
          <Avatar size={80} rounded source={{uri: userInfo.profileImageUrl}} />
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <Text style={styles.profileimgename}>
            {userdata ? `${userdata.usrId}` : 'Loading...'}
          </Text>
          <Text style={styles.profilebigtext}>{travelea} travel log</Text>
          <Text style={styles.profilebigtext}>{combinedStyles}</Text>
        </View>
      </View>
      <View style={styles.bottomline} />
      <View style={{flex: 4}}>
        {travelea < 0 ? <FirstLogin /> : <Showlog />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: 'white',
  },

  profileimgename: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'SCDream5',
    marginBottom: 2,
  },
  recomendconatiner: {
    flex: 4,
    marginTop: '3%',
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    height: '1',
  },
  viewcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  friends: {
    flex: 1,
    marginTop: 30,
  },
  profileImgae: {
    flex: 1,
    resizeMode: 'contain',
  },
  datetext: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'SCDream4',
  },
  bottomline: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginTop: 10,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  profilebigtext: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'SCDream4',
    marginBottom: 3,
  },
  recotopcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  recomendconatiner: {
    flex: 2,
    marginTop: '3%',
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  viewcontainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  datetext: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'SCDream4',
  },
  tagtext: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'SCDream5',
  },
});

export default MainScreen;
