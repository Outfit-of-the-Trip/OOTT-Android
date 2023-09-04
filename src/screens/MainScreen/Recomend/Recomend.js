import React, { useState,useEffect,useRef, } from 'react';
import { useWindowDimensions, Modal } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
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
import toggleModal from '../../../components/toggleisfriendmodal'
import profile from '../../../assets/images/recomend1.png'
import axios from 'axios';

const Recomend = () => {
  const navigation = useNavigation();
  const {params: data} = useRoute(); //여행 데이터 받아오기 
  const traveldate = String(data.travlDate).substring(0,10); //날짜 글자 필터링
 
  const width = useWindowDimensions().width; //기기 폭 값
  const [isModalVisible, setIsModalVisible] = useState(false);

  const scrollRef = useRef();

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
      if(data.travlFriends!=null){// 같이 가는 친구가 있다면 친구창으로 이동
        console.log(data.travlFriend);
        navigation.navigate('FriendsLook',data)
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
                <Text
                  style={styles.infodatetext}>
                  {traveldate} Look to
                </Text>
                <View>
                  <TouchableOpacity>
                  <Text
                    style={{fontFamily:'오뮤_다예쁨체',fontSize:16,color:'black'}}>아바타로 보기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                  <Text
                     style={{fontFamily:'오뮤_다예쁨체',fontSize:16,color:'black'}}>일정선택</Text>
                  </TouchableOpacity>
                </View>
              </View>
        </View>
    </View>
    <View style={styles.bottomline} />
    <View
      style={styles.showimgcontainer}>
      <SwiperFlatList
        ref={scrollRef}
        paginationActiveColor='black'
        paginationStyleItem={{height:10,width:10}}
        data={RecomendGarmet}
        renderItem={({item, index}) =>(
          <View>
            <Image
            source={item.img}
            style={[styles.showimg,{width:width}]}/>
          </View>
        )}/>
    </View>
    <View style={styles.bottomline} />
    <View
      style={[styles.bottomfirstcontainer,{marginHorizontal:width-(width-70)}]}> 
     <TouchableOpacity
      onPress={() => gotoRecomendOutter(data)}>
        <Text style={styles.hashtagtext}>#아우터</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => gotoRecomendTop(data)}>
        <Text style={styles.hashtagtext}>#상의</Text>
    </TouchableOpacity>
    <TouchableOpacity
       onPress={() => gotoRecomendBottom(data)}>
        <Text style={styles.hashtagtext}>#하의</Text>
    </TouchableOpacity>
    <TouchableOpacity
       onPress={() => gotoRecomendShose(data)}>
        <Text style={styles.hashtagtext}>#신발</Text>
    </TouchableOpacity>
    </View>
    <View
      style={[styles.bottomsecondcontainer,{marginHorizontal:width-(width-20)}]}>
        <TouchableOpacity
          onPress={() => gotoFriendsLook(data)}>
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
                <Text style={{fontFamily:'오뮤_다예쁨체',fontSize:24}}>같이 가는 친구가 없습니다</Text>
                <TouchableOpacity onPress={gotoFriendsLook}>
                  <Text style={{fontFamily:'오뮤_다예쁨체',fontSize:24}}>닫기</Text>
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
    infocontainer:{
      flex:0.5,
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
      flexDirection:'row'
    },
    infodatetext:{
      fontSize:24,  
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
      marginTop:10,
      flexDirection:'row',
      flex:0.2,
      justifyContent:'space-between'
    },
    hashtagtext:{
      fontFamily:'오뮤_다예쁨체',
      fontSize:24,
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