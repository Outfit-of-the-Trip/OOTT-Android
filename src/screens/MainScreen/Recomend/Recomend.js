import React, { useState,useRef, } from 'react';
import { useWindowDimensions, Modal } from 'react-native';
import avatarbutton from '../../../assets/images/avatarbutton.png'

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import Swiper from 'react-native-swiper'

const Recomend = () => {
  const navigation = useNavigation();
  const {params: traveldata,userdata} = useRoute(); //여행 데이터 받아오기 
  const traveldate = String(traveldata.travlDate).substring(0,10); //날짜 글자 필터링
  const width = useWindowDimensions().width; //기기 폭 값
  const [isModalVisible, setIsModalVisible] = useState(false); //친구 모달창

  const scrollRef = useRef();
/* travledata는 여행 날짜 데이터 변수 */
  const gotoRecomendOutter = (travledata) => {
    console.log(travledata)
    navigation.navigate('RecomendOutter',travledata);
  };

  const gotoRecomendTop = (travledata) => {
    return navigation.navigate('RecomendTop',travledata);
  };

  const gotoRecomendBottom= (travledata) => {
    return navigation.navigate('RecomendBottom',travledata);
  };

  const gotoRecomendShose = (travledata) => {
    return navigation.navigate('RecomendShose',travledata);}

  const gotoFriendsLook = () =>{ 
      if(traveldata.travlFriends!=null){// 같이 가는 친구가 있다면 친구창으로 이동
        console.log(traveldata.travlFriend);
        navigation.navigate('FriendsLook',traveldata)
      }
      else{
          return setIsModalVisible(!isModalVisible)
  };}
  
  return (
   <SafeAreaView
   style={styles.conatiner}>
    <View
      style={styles.infocontainer}>
        <View
          style={[styles.infosecondcontainer,{marginHorizontal:width-(width-12)}]}>
              <View
                style={{justifyContent:'space-between',flexDirection:'row',width:'100%'}}>
                <Avatar
                  size={30}>

                </Avatar>
                <Text
                  style={styles.infodatetext}>
                  {traveldate} ~ 22/07/19 Look to {traveldata.travlPlace}
                </Text>
                  <TouchableOpacity
                    style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={avatarbutton}/>
                  </TouchableOpacity>
              </View>
        </View>
    </View>
    <View
      style={styles.showimgcontainer}>
      <Swiper
        dotStyle={{backgroundColor:'grey',width:8}}
        activeDotColor='#4949E8'
        /* showsButtons 좌우 화살표 표시
        nextButton={<Image style={{height:30}}source={rightarrow}/>}
        prevButton={<Image style={{height:30}}source={leftarrow}/>} */
        >
        {RecomendGarmet.map((img,index) =>(
          <View
          key={index}>
          <Image
          source={img.img}
          style={[styles.showimg,{width:width}]}/>
        </View>
        ))}
     </Swiper>
    </View>
    <View
      style={[styles.bottomfirstcontainer,{marginHorizontal:width-(width-20)}]}> 
     <TouchableOpacity
      onPress={() => gotoRecomendOutter(traveldata,userdata)}
      style={{marginHorizontal:5}}>
        <Text style={styles.hashtagtext}>#아우터</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => gotoRecomendTop(traveldata,userdata)}
      style={{marginHorizontal:5}}>
        <Text style={styles.hashtagtext}>#상의</Text>
    </TouchableOpacity>
    <TouchableOpacity
       onPress={() => gotoRecomendBottom(traveldata,userdata)}
       style={{marginHorizontal:5}}>
        <Text style={styles.hashtagtext}>#하의</Text>
    </TouchableOpacity>
    <TouchableOpacity
       onPress={() => gotoRecomendShose(traveldata,userdata)}
       style={{marginHorizontal:5}}>
        <Text style={styles.hashtagtext}>#신발</Text>
    </TouchableOpacity>
    </View>
    <View
      style={[styles.bottomsecondcontainer,{marginHorizontal:width-(width-20)}]}>
        <TouchableOpacity
          onPress={() => gotoFriendsLook(traveldata)}>
          <Text
          style={styles.samedaystext}>같은 날 친구가 입는 옷은?</Text>
           {<Modal 팝업창
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={gotoFriendsLook}
            >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modaltext}>같이 가는 친구가 없습니다</Text>
                <TouchableOpacity onPress={gotoFriendsLook}>
                  <Text style={styles.modaltext}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> }
        </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
};
export default Recomend;

  const styles = StyleSheet.create({
    conatiner:{
      flex:5,
      backgroundColor:'white'
    },
    modaltext:{
      fontFamily:'오뮤_다예쁨체',
      fontSize:24
    },
    infocontainer:{
      flex:0.3,
      alignItems:'flex-start',
      justifyContent:'center',
      alignContent:'flex-start',
    },
    infoicon:{
      resizeMode:'contain'
    },
    infofirstcontainer:{
      flex:0.5,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
    },
    infofirsttext:{
     fontSize:16,
     color:'black',
     fontFamily:'오뮤_다예쁨체'
    },
    infosecondcontainer:{
      flex:0.5,
      flexDirection:'row',
    },
    infodatetext:{
      fontSize:20,  
      color:'black',
      flex:1,
      fontFamily:'오뮤_다예쁨체'
    },
    choseavatartext:{
      fontSize:24,  
      color:'black',
      flex:1,
      fontFamily:'오뮤_다예쁨체'
    },
    chosedatetext:{
      fontSize:24,  
      color:'black',
      flex:1,
      fontFamily:'오뮤_다예쁨체'
    },
    infosecondbutton:{
      fontSize:16,
      color:'#4949E8',
      fontFamily:'오뮤_다예쁨체',
    },
    showimgcontainer:{
      flex:3.5,
      alignItems:'flex-start',justifyContent:'flex-start'
    },
    showimg:{
      width:'100%',
      height:'100%',
      resizeMode:'cover',
    },
    bottomfirstcontainer:{
      marginTop:'2%',
      flexDirection:'row',
      flex:0.2,
      justifyContent:'flex-start',
    },
    hashtagtext:{
      fontFamily:'오뮤_다예쁨체',
      fontSize:20,
      color:'black'
    },
    bottomsecondcontainer:{
      flex:0.5,
      flexDirection:'row',
      justifyContent:'flex-end',
      alignItems:'center'
    },
    samedaystext:{
      fontSize:24,
      fontFamily:'오뮤_다예쁨체',
      color:'black'
    },
    imgcontain:{
      resizeMode:'contain',
    },
    bottomline: {
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      shadowColor: 'gray',
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 3,
    },
    modalContainer: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent:'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },

  })