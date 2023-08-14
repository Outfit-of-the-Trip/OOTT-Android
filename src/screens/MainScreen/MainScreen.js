import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { Avatar } from '@rneui/themed';

import profileImg from '../../assets/images/profileImg.png';
import more from '../../assets/images/more.png';
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
} from 'react-native';

const MainScreen = () => {
  const navigation = useNavigation();
  const width = useWindowDimensions().width;

  const gotoRecomend = () => {
    return navigation.navigate('Recomend');
  };
  
  const gotoFrineds = () =>{
    return navigation.navigate('친구')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profile}>
          <View
            style={styles.profileimgconatiner}>
            <Avatar
              size={72}
              rounded
              source={profileImg} />
            <Text
              style={styles.profileimgename}>
              성욱
            </Text>
          </View>
          <View
            style={styles.profileinfoconatiner}>
            <View
              style={styles.profiletextcontainer}>
              <Text style={styles.profilebigtext}>7</Text>
              <Text style={styles.profiletext}>mylog</Text>
            </View>
            <TouchableOpacity
                onPress={gotoFrineds}>
            <View
              style={styles.profiletextcontainer}>
                <Text style={styles.profilebigtext}>7</Text>
                <Text style={styles.profiletext}>Friend</Text>
            </View>   
            </TouchableOpacity>
            <View
              style={styles.profiletextcontainer}>
              <Text style={styles.profilebigtext}>9</Text>
              <Text style={styles.profiletext}>ShoppingList</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomline} />
        {/* <EmptyScreen/> */}
        {TravelInfo.map((info, index) => (
          <View style={styles.recomendconatiner} key={index}>
            <View
              style={styles.recotopcontainer}>
              <View style={[styles.viewcontainer,{marginHorizontal:width-(width-10),marginBottom:width-(width-10)}]}>
                <Image source={dateairplane} style={{resizeMode: 'contain'}} />
                <Text style={styles.datetext}>{info.date}</Text>
              </View>
              <TouchableOpacity onPress={gotoRecomend}>
                <Image source={more} />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
              <Image source={info.image[0]} style={styles.recoimgae} />
              <Image source={info.image[1]} style={styles.recoimgae} />
              <Image source={info.image[2]} style={styles.recoimgae} />
              <Image source={info.image[3]} style={styles.recoimgae} />
            </ScrollView>
            <View style={[styles.viewcontainer,{marginHorizontal:width-(width-10)}]}>
            <Text style={styles.tagtext}>{info.tag}</Text>
            </View>
            <View style={styles.bottomline} />
          </View>
        ))}
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
    marginTop: 30,
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
    flex: 1,
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
    fontSize: 16,
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
