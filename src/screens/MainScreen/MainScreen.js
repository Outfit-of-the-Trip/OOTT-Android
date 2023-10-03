import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground, useWindowDimensions} from 'react-native';
import {Avatar} from '@rneui/themed';
import axios from 'axios';
import {AuthContext} from '../../utils/Auth';
import FirstLogin from '../../components/FirstLogin';
import recomend1 from '../../assets/images/recomend1.png'
import moreb from '../../assets/images/moreb.png'

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import EmptyScreen from '../../components/EmptyScreen';


const MainScreen = () => {
  const {userInfo} = useContext(AuthContext);
  const navigation = useNavigation();
  const width = useWindowDimensions().width; //기기 넓이
  const [travelea, settravelea] = useState(); //등록된 여행 개수
  const [friend, setfriend] = useState();
  const [userdata, setuserdata] = useState();
  const [userHashTag,setUserHashtag] = useState([
    { id : 1, usrstyle: "#레트로"},
    { id : 2, usrstyle: "#formal"},
    { id : 3, usrstyle: "#하이틴"},
    ]);
  const [data, setData] = useState([]);
  const [travelClothes,setTravelClothes] = useState([]); 
  const [imageurl,setImageUrl] = useState([]); //여행별 추천 옷 url
  const gotoRecomend = (traveldata) => {
    return navigation.navigate('Recomend', traveldata);
  };

  const translate = (item) =>{ // 날짜 정리 메서드
    var data = String(item);
    var input = data.substring(0,10);
    return input;
  }

const combinedStyles = userHashTag.map(tag => tag.usrstyle).join(''); //태그 합치기

  useEffect(() => { //사용자 친구 데이터
    axios.get(`http://10.0.2.2:3000/api/friends/myFriends?userId=${userInfo.nickname}`)
      .then(function (response) {
        setfriend(response.data.length)

      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  

  useEffect( () => { //사용자 데이터 
     axios.get (`http://10.0.2.2:3000/api/users/getUserInfo?userId=admin`)
      .then(function (response) {
        setuserdata(response.data);
        /* 
          setUSerHashtag[0] = response.data.usrstyle1
          setUser
        
        */
      })
      .catch(function (err) {
        console.log(err);
      });
  },[]);


  useEffect(() => { //여행정보 데이터
    axios.get(`http://10.0.2.2:3000/api/travel/getMyTravelInfo?userId=${userInfo.nickname}`)
      .then(function (response) {
        settravelea(response.data.length)
        setData(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => { //TRAVEL_CLOTHES
    axios.get(`http://10.0.2.2:3000/api/travel/getMyTravelInfo?userId=admin`)
      .then(function (response) {
       /*  setTravelClothes(response.data);
        console.log(response.data); */
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  useEffect(() => { //EXAMPLE
    axios.get(`http://10.0.2.2:3000/api/travel/getMyTravelInfo?userId=admin`)
      .then(function (response) {
        //api 완성되면 travelClothes에서 배열 값 사용해서 옷 이미지 경로 불러오기
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const Showlog = () =>{
    if(travelea>0){
     return(
         <FlatList
           data={data}
           nestedScrollEnabled={true}
           renderItem={({ item,index }) => (
             <View key={index} style={styles.recomendconatiner}>
               <View
              style={{marginHorizontal:width-(width-10)}}>
              <Text style={styles.datetext}>{translate(item.travlDate)} to {item.travlPlace}</Text>
              <View
                style={{flexDirection:'row',justifyContent:"space-between"}}>
                <Text style={styles.tagtext}>태그</Text>
                <TouchableOpacity
                  onPress={() => gotoRecomend(item)}>
                <Image
                  style={{width:30,height:20,resizeMode:'center'}}
                  source={moreb}/>
                </TouchableOpacity>
              </View>
            </View>
             <View
                style={{flexDirection:"row"}}>
                <Image
                        source={recomend1}
                        style={{width:'100%',margin:3,borderRadius:5}}/>
             </View>
           
           </View>
            )}
           />);
   }else{
     return <EmptyScreen/>
   }
 }

  return (
    <SafeAreaView style={styles.container}>
            <View
              style={{flexDirection:'row', marginHorizontal:width-(width-20),marginTop:5}}>
                    <Avatar
                      size={80}
                      rounded
                      source={{ uri:userInfo.profileImageUrl}}/>
                    <View
                      style={{marginLeft:10}}>
                      <Text style={styles.profileimgename}>
                          {userInfo.nickname}
                      </Text>
                  <Text style={styles.profilebigtext}>{travelea} travel log</Text>
                  <Text style={styles.profilebigtext}>{combinedStyles}</Text>
                  </View>
          </View>
          <View style={styles.bottomline} />
          <View
            style={{flex:4}}>
            {travelea < 0 ?(
              <FirstLogin/> )
             : (
              <Showlog/>
            )}
            </View>
          </SafeAreaView>)
}



const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor:'white'
  },

  profileimgename:{
    color: 'black',
    fontSize: 24,
    fontFamily: 'SCDream5',
    marginBottom:2
  },
  recomendconatiner: {
    flex: 4,
    marginTop: "3%",
    elevation:10,
    backgroundColor:"white",
    borderRadius:10,
    borderWidth:2,
    borderColor:'white',
    height:'1'
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
    marginBottom:3
  },
  recotopcontainer:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },

 recomendconatiner: {
    flex: 2,
    marginTop: "3%",
    elevation:10,
    backgroundColor:"white",
    borderRadius:10,
    borderWidth:3,
    borderColor:'white',
  },
  viewcontainer:{
    justifyContent:'flex-start' ,
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