import React, { useState,useRef,useContext,useEffect } from 'react';
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
  FlatList
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
import {AuthContext} from '../../../utils/Auth';
import Swiper from 'react-native-swiper'
import { url } from 'inspector';

const Recomend = () => {
  const {userInfo} = useContext(AuthContext);
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜를 저장하는 state
  const [initialDate, setInitialDate] = useState(null);
  const [images, setImages] = useState([]);
  const {params: traveldata,userdata} = useRoute(); //여행 데이터 받아오기 */ 
  const traveldate = String(traveldata.travlDate).substring(0,10); //날짜 글자 필터링
  const width = useWindowDimensions().width; //기기 폭 값
  const [isModalVisible, setIsModalVisible] = useState(false); //친구 모달창
  const ITEMS_PER_PAGE = 3; // 1페이지당 출력할 조합 세트 수
  const filteredData = selectedDate
    ? RecomendGarmet.filter((item) => item.date === selectedDate)
    : RecomendGarmet;
  const pages = Array.from(
    { length: Math.ceil(filteredData.length / ITEMS_PER_PAGE) },
    (_, index) => index + 1
  );
  const [currentPage, setCurrentPage] = useState(1);

  const dataForCurrentPage = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

/* travledata는 여행 날짜 데이터 변수 */
  const gotoRecomendDetail = (detail,date) => {
    console.log("Detail",detail)
    console.log("date",date)
    return navigation.navigate('RecomendDetail',{
      detail : detail,
      selecteddate:date
    });
  };

  const gotoFriendsLook = () =>{ 
      if(traveldata.travlFriends!=null){// 같이 가는 친구가 있다면 친구창으로 이동
        console.log(traveldata.travlFriend);
        navigation.navigate('FriendsLook',traveldata)
      }
      else{
          return setIsModalVisible(!isModalVisible)
  };}
  
  useEffect(() => {
    // 초기에 날짜 중 가장 앞에 있는 인덱스의 날짜를 선택하도록 설정
    if (RecomendGarmet.length > 0) {
      const earliestDate = RecomendGarmet[0].date;
      setSelectedDate(earliestDate);
      setInitialDate(earliestDate);
    }
  }, []);

 
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
                <TouchableOpacity
                  onPress={gotoFriendsLook}>
                  <Image
                    style={{marginRight:5,width:30,height:30}}
                    source={frinedbtn}/>
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
   <View style={{  }}>
      {/* 날짜 선택 */}
      <FlatList
        horizontal
        data={RecomendGarmet}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width:110,
              height:40,
              borderWidth: 1,
              paddingVertical: 8,
              paddingHorizontal: 16,
              marginHorizontal: 5,
              borderRadius: 8,
              backgroundColor: selectedDate === item.date ? 'blue' : 'white',
            }}
            onPress={() => setSelectedDate(item.date)}
          >
            <Text style={{ color: selectedDate === item.date ? 'white' : 'black' }}>{item.date}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.date}
      />

      {/* 이미지 세트 */}
      {selectedDate &&  (
        <FlatList
          horizontal
          data={RecomendGarmet.find((item) => item.date === selectedDate)?.clothes}
          renderItem={({ item }) => (
            <View style={{ margin: 10 }}>
              <View
                style={{flexDirection:'row'}}>
                <TouchableOpacity
                  onPress={() => gotoRecomendDetail(item.outter.detail,selectedDate)}>
                  <Image source={{ uri: item.outter.img }} style={{ width: 200, height: 200 }} />
                </TouchableOpacity>
                <TouchableOpacity
                   onPress={() => gotoRecomendDetail(item.outter,selectedDate)}>
                  <Image source={{ uri: item.outter.img }} style={{ width: 200, height: 200 }} />
                </TouchableOpacity>
              </View>
              <View
                style={{flexDirection:'row'}}>
                <TouchableOpacity
                   onPress={() => gotoRecomendDetail(item.outter,selectedDate)}>
                  <Image source={{ uri: item.outter.img }} style={{ width: 200, height: 200 }} />
                </TouchableOpacity>
                <TouchableOpacity
                   onPress={() => gotoRecomendDetail(item.outter,selectedDate)}>
                  <Image source={{ uri: item.outter.img }} style={{ width: 200, height: 200 }} />
                </TouchableOpacity>
              </View>  
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
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
      marginBottom:40
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
      flex:3,
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