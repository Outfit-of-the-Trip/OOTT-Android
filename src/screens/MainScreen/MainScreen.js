import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground, useWindowDimensions} from 'react-native';
import {Avatar} from '@rneui/themed';
import axios from 'axios';
import more from '../../assets/images/more.png';
import {AuthContext} from '../../utils/Auth';
import FirstLogin from '../../components/FirstLogin';
import ShowLog from '../../components/ShowLog';

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import EmptyScreen from '../../components/EmptyScreen';
import EmptyImg from '../../assets/images/emptyImg.png';

const MainScreen = () => {
  const {userInfo} = useContext(AuthContext);
  const navigation = useNavigation();
  const width = useWindowDimensions().width; //기기 넓이

  const [data, setData] = useState([]);
  const [travelea, settravelea] = useState(); //등록된 여행 개수
  const [friend, setfriend] = useState();
  const [dbUsrname, setDbUsrname] = useState([]);
  const [friendsInfo, setFriendsInfo] = useState([]);
  const [isfirstlogin,setfirstlogin] = useState();

  const gotoRecomend = (travledata) => {
    navigation.navigate('Recomend', travledata,userInfo);
  };
  const gotoFrineds = () =>{
    return navigation.navigate('친구')
  }
  
  const translate = (item) =>{ // 날짜 정리 메서드
    var data = String(item);
    var input = data.substring(0,10);
    return input;
  }
  

  useEffect(() => { //사용자 친구 데이터
    axios.get('http://10.0.2.2:3000/api/friends/myFriends?userId=정성욱')
      .then(function (response) {
        setfriend(response.data.length)
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);


  useEffect(() => { //사용자 데이터 
    axios.get(`http://10.0.2.2:3000/api/test/getUserTable`)
      .then(function (response) {
        setDbUsrname(response.data);
        setfirstlogin(response.data.usrUpdateAt)
        console.log(isfirstlogin);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);


  useEffect(() => { //여행정보 데이터
    axios.get('http://10.0.2.2:3000/api/travel/getMyTravelInfo?userId=정성욱')
      .then(function (response) {
        settravelea(response.data.length)
        setData(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.profile}> 
    <ImageBackground
        source={EmptyImg}
        style={{ width: "100%", height: "100%" ,justifyContent:"flex-end"}}
        resizeMode='cover'>
        <View
          style={styles.profileimgconatiner}>
          <Text
            style={styles.profileimgename}>
            {userInfo.nickname}
          </Text>
          <View
            style={{marginVertical:5}}>
            <Avatar
              size={130}
              rounded
              source={{
                uri:userInfo.profileImageUrl}} />
          </View>
          <Text style={styles.profilebigtext}>{travelea} travel log</Text>
        </View>
        </ImageBackground>
    </View>
    <View style={styles.bottomline} />
    <View
      style={{flex:2}}>
    {isfirstlogin ==!null ?(
      <FirstLogin/>):(
      <ShowLog tr={travelea}/>
    )} 
    </View>
    </ScrollView>
  </SafeAreaView>);
};
const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor:'white'
  },
  profile: {
    flex: 3,
    flexDirection: 'column',
    justifyContent:'flex-end',
    alignContent:'center',
  },
  profileimgename:{
    color: 'black',
    fontSize: 24,
    fontFamily: 'SCDream5',
  },
  profileimgconatiner:{
    alignItems: 'center',
    justifyContent:"flex-start",
    padding:10,
  },
  recomendconatiner: {
    flex: 1,
    marginTop: "3%",
    elevation:10,
    backgroundColor:"white",
    borderRadius:10,
    borderWidth:2,
    borderColor:'white',
  },
  viewcontainer:{
    flexDirection: 'row',
    justifyContent:'flex-start' ,
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
  recoimgae: {
    flex: 1,
    resizeMode: 'contain',
  },
  recotopcontainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  tagtext: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'SCDream5',
  },
  datetext: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'SCDream4',
  },
  bottomline: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  profilebigtext: {
    color: 'black',
    fontSize: 32,
    fontFamily: 'SCDream3',
  },
});

export default MainScreen;
