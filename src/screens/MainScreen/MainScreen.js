import React, {useState,useEffect,useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { Avatar } from '@rneui/themed';
import axios from 'axios';

import profileImg from '../../assets/images/profileImg.png';
import more from '../../assets/images/more.png';
import { AuthContext } from '../../utils/Auth';
import dateairplane from '../../assets/images/dateairplane.png';
import TravelInfo from '../../constants/TravelInfo';

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import EmptyScreen from '../../components/EmptyScreen';


const MainScreen = () => {
  const{userInfo} = useContext(AuthContext);
  console.log(userInfo);
  const profileImage = userInfo.profileImageUrl;
  const navigation = useNavigation();
  const width = useWindowDimensions().width;

  const [data,setData] = useState([]);
  const [usrname, setusrname] = useState(); //사용자 이름
  const [traveldate, settraveldate] = useState(); //여행 날짜
  const [travelea, settravelea] = useState(); //등록된 여행 개수
  //const [travelplace,settravelplace] = useState(); //여행 장소
  //const [usrprofile, setusrprofile] = useState(); 프로필 사진
  const [friend,setfriend] = useState();

  const gotoRecomend = (travledata) => {
    console.log(travledata)
    navigation.navigate('Recomend', travledata);
  };
  const gotoFrineds = () =>{
    return navigation.navigate('친구')
  }
  const gotoShoppingList = () =>{
    return navigation.navigate('ShoppingList');
  }
  
  const translate = (item) =>{
    var data = String(item);
    var input = data.substring(0,10);
    return input;
  }

  useEffect(() => { //사용자 친구 데이터
    axios.get('http://10.0.2.2:8000/api/friends/myFriends?userId=a')
      .then(function (response) {
        setfriend(response.data.length)
        console.log(response.data.length)
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);


  useEffect(() => { //사용자 데이터 
    axios.get('http://10.0.2.2:8000/api/users/getUserInfo?userId=admin')
      .then(function (response) {
        setusrname(response.data.usrId);
       // setusrprofile(response.data.usrProfileURL) 프로필 사진

      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => { //여행정보 데이터
    axios.get('http://10.0.2.2:8000/api/travel/getMyTravelInfo?userId=a')
      .then(function (response) {
        //console.log(response.data[0].travlDate);
        //console.log(response.data.length);
        var data = String(response.data.travlDate);
        var input = data.substring(0,10);
        settraveldate(input)
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
          <View
            style={styles.profileimgconatiner}>
            <Avatar
              size={72}
              rounded
              src={"https://k.kakaocdn.net/dn/DeWiq/btssN3bDnxi/am3hJpHbRDEaKS6PfPY3J1/img_640x640.jpg"} />
            <Text
              style={styles.profileimgename}>
              {userInfo.nickname}
            </Text>
          </View>
          <View
            style={styles.profileinfoconatiner}>
            <View
              style={styles.profiletextcontainer}>
              <Text style={styles.profilebigtext}>{travelea}</Text>
              <Text style={styles.profiletext}>mylog</Text>
            </View>
            <View
              style={styles.profiletextcontainer}>
              <TouchableOpacity
                onPress={gotoFrineds}>
                <View
                  style={{alignItems:"center"}}>
                <Text style={styles.profilebigtext}>
                  {friend}
                </Text>
                <Text style={styles.profiletext}>Friend</Text>
                </View>
              </TouchableOpacity> 
              </View>
 
            <View
              style={styles.profiletextcontainer}>
            <TouchableOpacity
              onPress={gotoShoppingList}>
              <View
                style={{alignItems:"center"}}>
              <Text style={styles.profilebigtext}>9</Text>
              <Text style={styles.profiletext}>ShoppingList</Text>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomline} />
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.recomendconatiner}>
              <View
                style={styles.recotopcontainer}>
                <View style={[styles.viewcontainer,{marginHorizontal:width-(width-10),marginBottom:width-(width-10)}]}>
                  <Text style={styles.datetext}>{translate(item.travlDate)} to </Text>
                </View>
                <TouchableOpacity onPress={() => gotoRecomend(item)}>
                  <Image source={more} />
                </TouchableOpacity>
              </View>
              {/* <ScrollView horizontal={true}>
                <Image source={TravelInfo.image[0]} style={styles.recoimgae} />
                <Image source={TravelInfo.image[1]} style={styles.recoimgae} />
                <Image source={TravelInfo.image[2]} style={styles.recoimgae} />
                <Image source={TravelInfo.image[3]} style={styles.recoimgae} />
              </ScrollView> */}
              <View style={[styles.viewcontainer,{marginHorizontal:width-(width-10)}]}>
              <Text style={styles.tagtext}>태그</Text>
              </View>
              <View style={styles.bottomline} />
            </View>
              )}
            keyExtractor={(item) => item.usrID} // Use a unique identifier as the key
            />
        </View>
        <EmptyScreen/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  profileimgename:{
    color: 'black',
    fontSize: 16,
    fontFamily: '오뮤_다예쁨체',
  },
  profileimgconatiner:{
    flex: 0.5,
    alignItems: 'center',
  },
  recomendconatiner: {
    flex: 1,
    marginTop: "5%",
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
  profileinfoconatiner:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profiletextcontainer:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:'center'
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
    fontFamily: '오뮤_다예쁨체',
  },
  datetext: {
    color: 'black',
    fontSize: 24,
    fontFamily: '오뮤_다예쁨체',
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
    fontFamily: '오뮤_다예쁨체',
  },
  profiletext: {
    color: 'black',
    fontSize: 16,
    fontFamily: '오뮤_다예쁨체',
  },
});

export default MainScreen;