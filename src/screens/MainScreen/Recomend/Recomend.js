import React, { useState,useEffect,useRef } from 'react';
import { useWindowDimensions, Modal } from 'react-native';
import { Button } from '@rneui/themed';
import SwiperFlatList from 'react-native-swiper-flatlist';

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

import infoairplane from '../../../assets/images/dateairplane.png'
import preview from '../../../assets/images/recomend4.png';
import calendar from '../../../assets/images/calendar.png';
import heart from '../../../assets/images/heart.png';
import uheart from '../../../assets/images/uheart.png';
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const Recomend = () => {
  const navigation = useNavigation();
  const [likedImages, setLikedImages] = useState(new Array(RecomendGarmet.length).fill(false));
  const [isfriends,setisfriends] = useState(); //같이 가는 친구가 있는지 없는지
  const width = useWindowDimensions().width; //기기 폭 값

  /* useEffect(() => { //여행 데이터
    axios.get('http://10.0.2.2:8000/api/travel')
      .then(function (response) {
        console.log(response.data);
        setisfriends(response.data);

      })
      .catch(function (err) {
        console.log(err);
      });
  }, []); */
  const scrollRef =useRef();

  const gotoRecomendOutter = () => {
    return navigation.navigate('RecomendOutter');
  };

  const gotoRecomendTop = () => {
    return navigation.navigate('RecomendTop');
  };

  const gotoRecomendBottom= () => {
    return navigation.navigate('RecomendBottom');
  };

  const gotoRecomendShose = () => {
    return navigation.navigate('RecomendShose');}

  const gotoFriendsLook = () =>{ 
      return navigation.navigate('FriendsLook')
      /* if(isfriends!=null){// 같이 가는 친구가 있다면 친구창으로 이동
        return navigation.navigate('FriendsLook')
      }
      else{ 같이 가는 친구가 없다면 팝업 출력
        //팝업창 toggleModal();
      } */
  };

  const gotoCalendar = () =>{
    return(
        navigation.navigate('Calendar')
    );
  }
 
  const toggleImage = (index) => {
    const newLikedImages = [...likedImages];
    newLikedImages[index] = !newLikedImages[index];
    setLikedImages(newLikedImages);
  };

  return (
   <SafeAreaView
   style={styles.conatiner}>
    <View
      style={styles.infocontainer}>
        <View
          style={[styles.infofirstcontainer,{marginHorizontal:width-(width-20)}]}>
          <Image
            source={infoairplane}
            style={styles.infoicon}/>
          <Text
            style={styles.infofirsttext}>
            2023.09.19 - 2023.07.23 to Mongol
          </Text>
          <View
            style={styles.infoclendar}>
            <TouchableOpacity
              onPress={gotoCalendar}>
              <Image
              source={calendar}/>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[styles.infosecondcontainer,{marginHorizontal:width-(width-12)}]}>
          <View
            style={{flex:3,flexDirection:'row'}}>
              <View
                style={{flex:2,alignItems:'center'}}>
                <Text
                  style={styles.infosecondttext}>
                  2023.07.19 Look
                </Text>
              </View>
                <Button title="아바타로 보기" type="clear" titleStyle={styles.infosecondbutton}/>
                
          </View>
        </View>
    </View>
    <View style={styles.bottomline} />
    <View
      style={styles.showimgcontainer}>
      <SwiperFlatList
        showPagination
        ref={scrollRef}
        paginationActiveColor='black'
        paginationStyleItem={{height:10,width:10}}
        data={RecomendGarmet}
        renderItem={({item, index}) =>(
          <View>
            <Image
            source={item.img}
            style={[styles.showimg,{width:width}]}/>
             <View style={{marginHorizontal:width-(width-20),marginTop:10}}>
             <TouchableOpacity onPress={() => {
              console.log(index)
              setLikedImages(index)
              toggleImage(index)
            }}> 
            {likedImages[index]? (
              <Image 
                style={styles.imgcontain}
                source={heart}/>
                ) : (
              <Image
                style={styles.imgcontain}
                source={uheart}/>
            )}
            </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(Item) => Item.id.toString()}/>
    </View>
    <View style={styles.bottomline} />
    <View
      style={[styles.bottomfirstcontainer,{marginHorizontal:width-(width-70)}]}> 
     <TouchableOpacity
      onPress={gotoRecomendOutter}>
        <Text style={styles.hashtagtext}>#아우터</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={gotoRecomendTop}>
        <Text style={styles.hashtagtext}>#상의</Text>
    </TouchableOpacity>
    <TouchableOpacity
       onPress={gotoRecomendBottom}>
        <Text style={styles.hashtagtext}>#하의</Text>
    </TouchableOpacity>
    <TouchableOpacity
       onPress={gotoRecomendShose}>
        <Text style={styles.hashtagtext}>#신발</Text>
    </TouchableOpacity>
    </View>
    <View
      style={[styles.bottomsecondcontainer,{marginHorizontal:width-(width-20)}]}>
        <TouchableOpacity
          onPress={gotoFriendsLook}>
          <Text
          style={styles.samedaystext}>같은 날 친구가 입는 옷은?</Text>
           {/* <Modal 팝업창
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
            >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={{fontFamily:'오뮤_다예쁨체',fontSize:24}}>같이 가는 친구가 없습니다</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={{fontFamily:'오뮤_다예쁨체',fontSize:24}}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}
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
      flex:0.6,
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
    infoclendar:{
      flexDirection:'row',
      justifyContent:'flex-end',
      flex:1
    },
    infosecondcontainer:{
      flex:0.5,
      alignItems:'flex-start',
      flexDirection:'row'
    },
    infosecondttext:{
      fontSize:32,  
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
      height:'90%',
      resizeMode:'contain',
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
      marginTop: 10,
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