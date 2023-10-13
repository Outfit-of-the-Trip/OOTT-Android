import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { Avatar, Divider } from '@rneui/themed';
import { Button } from 'react-native-paper';

import { useRecoilState } from 'recoil';
import { userInfoState } from '../../states/atoms';

import { backendURL } from '../../constants/url';
import emptyImage from '../../assets/images/emptyImage.png'

import axios from 'axios';


import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const MainScreen = () => {

  const isFocused = useIsFocused();

  const userInfo = useRecoilState(userInfoState)[0];
  const [travelClothes, setTravelClothes] = useState([]);
  const [travelLen, setTravelLen] = useState(0)

  const navigation = useNavigation();
  const width = useWindowDimensions().width; //기기 넓이
  const [userData, setUserData] = useState([]);



  const [userHashTag, setUserHashtag] = useState(["one", "two", "three"]);
  const [combinedStyles, setCombinedStyles] = useState("");

  const HashTag = (one, two, three) => {
    let copy = [...userHashTag]
    copy[0] = one
    copy[1] = two
    copy[2] = three
    setUserHashtag(copy)
  }


  const gotoTravelDetailScreen = traveldata => {
    return navigation.navigate('TravelDetailScreen', traveldata);
  };

  useEffect(() =>{
    if(isFocused) {
      const getTravelData = async () => {
        try{
          const res = await axios.get(backendURL + `/api/travel/getMyTravelInfo?userId=${userInfo.nickname}`)
          setTravelClothes(res.data)
          setTravelLen(res.data.length)

        } catch(e){
          console.log(e)
        }
      };
      getTravelData()
    }
  }, [isFocused])

  useEffect(() => {
    setCombinedStyles(userHashTag.map(tag => `#${tag}`).join(' '))
  },[userHashTag])


  useEffect(() => {
    const getTravelData = async () => {
      try{
        const res = await axios.get(backendURL + `/api/travel/getMyTravelInfo?userId=${userInfo.nickname}`)
        setTravelClothes(res.data)
        setTravelLen(res.data.length)
      } catch(e){
        console.log(e)
      }
    };
    getTravelData()
  }, [travelClothes])

  useEffect(() => {
    const getUserInfo= async () => {
      try{
        const res = await axios.get(backendURL + `/api/users/getUserInfo?userId=${userInfo.nickname}`)
        setUserData(res.data)
        HashTag(res.data.usrStyle1, res.data.usrStyle2, res.data.usrStyle3)
      } catch(e){
        console.log(e)
      }
    };

    getUserInfo()

  }, [userData])

  const EmptyScreen = () => { 
    return (
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image
            style={{width:300,height:280}}
            source={emptyImage}
          />
          <View style={{marginBottom: 23}}>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>내 여행 코디를 추천받아 보세요!</Text>
          </View>
          <Button
            mode='outlined'
            onPress={() => navigation.navigate('OOTTScreen')}
            textColor='black'
            labelStyle={{fontFamily:'SCDream5',fontSize:16}}
            style={{
              borderStyle: 'solid',
              borderWidth: 1.5,
              paddingHorizontal:20,
              borderRadius: 8
            }}
          >Move for OOTT</Button>
        </View>
      </View>
    )  
  }

  return (
      
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'row', marginHorizontal: width - (width - 20), marginTop: 30}}>
        <Avatar size={50} rounded source={{uri: userInfo.profileImageUrl}} />
        <View style={{marginLeft: 25}}>
          <Text style={styles.profileimgename}>{userInfo ? `${userInfo.nickname}` : '아이디 없음'}</Text>
          <Text style={styles.profilebigtext}>{travelLen} travel log</Text>
          <Text style={styles.profilebigtext}>{combinedStyles}</Text>
        </View>
      </View>
      
      <View style={styles.bottomline} />


      {travelClothes ? (

        travelClothes.map((item) =>
          <View key={item.travlSeq}style={{marginHorizontal: 20, backgroundColor: 'white'}}>

            <View style={{ marginTop: 30}}>
              <Text style={{fontSize: 17, color:'black', fontFamily:'SCDream5', marginVertical: 3}}>{JSON.parse(item.travlDate)[0]} to {item.travlPlace}</Text>
              <Text style={{fontSize: 17, color:'black', fontFamily:'SCDream5'}}>#{item.travlReason}  #{item.travlCategory}</Text>
            </View>

            <Button onPress={()=>{gotoTravelDetailScreen(item)}}>상세 정보 보기</Button>

            <View style={{ flexDirection: 'row', marginVertical: 15,}}>
    
              { JSON.parse(item.outerSeq)[0] != "None" ? (
                <Image
                  style={styles.clothesImg}
                  source={{uri: JSON.parse(item.outerSeq)[0]}}
                />
                ) : (<View></View>)
              }
              { JSON.parse(item.topSeq)[0] != "None" ? (
                <Image
                  style={styles.clothesImg}
                  source={{uri: JSON.parse(item.topSeq)[0]}}
                />
                ) : (<View></View>)
              }
              { JSON.parse(item.bottomSeq)[0] != "None" ? (
                <Image
                  style={styles.clothesImg}
                  source={{uri: JSON.parse(item.bottomSeq)[0]}}
                />
                ) : (<View></View>)
              }
              { JSON.parse(item.shoesSeq)[0] != "None" ? (
                <Image
                  style={styles.clothesImg}
                  source={{uri: JSON.parse(item.shoesSeq)[0]}}
                />
                ) : (<View></View>)
              }
              
            </View>
            <Divider width={1.5} />
          </View>

        )) : (<View style={{marginTop: 80}}><EmptyScreen /></View>)}
    </ScrollView>
    
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: 'white',
  },

  profileimgename: {
    color: 'black',
    fontSize: 20,
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
    fontSize: 18,
    fontFamily: 'SCDream4',
  },
  bottomline: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 20,
    marginHorizontal: 15,
  },
  profilebigtext: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'SCDream4',
    marginVertical: 2,
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

  clothesImg:{
    width: 80, 
    height: 80,
    marginHorizontal: 3,
    borderRadius: 5,
  }
});

export default MainScreen;
