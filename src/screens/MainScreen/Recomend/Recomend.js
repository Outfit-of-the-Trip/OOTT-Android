import React, { useState,useRef,useContext } from 'react';
import { useWindowDimensions, Modal } from 'react-native';
import avatarbtn from '../../../assets/images/avatarbtn.png'
import frinedbtn from '../../../assets/images/frinedbtn.png'
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
import {AuthContext} from '../../../utils/Auth';
import Swiper from 'react-native-swiper'

const Recomend = () => {
  const {userInfo} = useContext(AuthContext);
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [images, setImages] = useState([]);
  const {params: traveldata,userdata} = useRoute(); //여행 데이터 받아오기 */ 
  const traveldate = String(traveldata.travlDate).substring(0,10); //날짜 글자 필터링
  const width = useWindowDimensions().width; //기기 폭 값
  const [isModalVisible, setIsModalVisible] = useState(false); //친구 모달창

  const scrollRef = useRef();
/* travledata는 여행 날짜 데이터 변수 */
  const gotoRecomendOutter = (travledata) => {
    console.log(travledata)
    navigation.navigate('',travledata);
  };
  console.log(userdata)
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
  
  useEffect(() => {
    // Fetch images based on the selectedDate from your API
    const fetchImages = async () => {
      if (selectedDate) {
        try {
          const response = await fetchImagesByDate(selectedDate);
          setImages(response.data); // Assuming the response.data contains an array of image URLs
        } catch (error) {
          console.error('Error fetching images: ', error);
        }
      }
    };

    fetchImages();
  }, [selectedDate]);

  const handleDateSelection = (date) => {
    // Update the selectedDate when a date is selected
    setSelectedDate(date);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImageSelection(item)}>
      <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} />
    </TouchableOpacity>
  );

  return (
   <SafeAreaView
   style={styles.conatiner}>
    <View
      style={styles.infocontainer}>
        <View
          style={[styles.infosecondcontainer,{marginHorizontal:width-(width-12)}]}>
              <View>
                <Text
                  style={styles.infodatetext}>
                    TodayLook to {traveldata.travlPlace}
                </Text>
              </View>

              <View
                style={{width:'100%',flexDirection:"row",alignItems:'space-between',justifyContent:"space-between"}}>
                <Text
                  style={styles.selectdatetext}>Select Date</Text>
              <View
                style={{flexDirection:'row'}}>
                <TouchableOpacity>
                  <Image
                    style={{marginRight:5,width:30,height:30}}
                    source={frinedbtn}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{width:30,height:30}} 
                    source={avatarbtn}/>
                </TouchableOpacity>
              </View>
              </View>
        </View>
    </View>
    <View
      style={styles.showimgcontainer}>
      
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
      flex:1,
    },
    infodatetext:{
      fontSize:24,  
      color:'black',
      flex:1,
      fontFamily:'SCDream5'
    },
    selectdatetext:{
      fontSize:16,  
      color:'black',
      flex:1,
      fontFamily:'SCDream5'
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