import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import profileImg from '../../assets/images/profileImg.png';
import recomend1 from '../../assets/images/recomend1.png';
import recomend2 from '../../assets/images/recomend2.png';
import recomend3 from '../../assets/images/recomend3.png';
import recomend4 from '../../assets/images/recomend4.png';
import more from '../../assets/images/more.png';
import dateairplane from '../../assets/images/dateairplane.png'
import EmptyScreen from '../../components/EmptyScreen';
import TravelInfo from '../../components/constants/TravelInfo';

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

const MainScreen = () => {
  const navigation = useNavigation();
  const gotoRecomend = () => {
    return navigation.navigate('Recomend');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profile}>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Image source={profileImg}/>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'Tenada',
              }}>
              성욱
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.profilebigtext}>7</Text>
              <Text style={styles.profiletext}>mylog</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.profilebigtext}>12</Text>
              <Text style={styles.profiletext}>Friend</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.profilebigtext}>9</Text>
              <Text style={styles.profiletext}>ShoppingList</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomline} />
       {/* <EmptyScreen/> */}
         {TravelInfo.map((info, index) => (
          <View style={styles.recomend} key={index}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={dateairplane} style={{resizeMode:'contain',}}/>
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
            <Text style={styles.text}>{info.tag}</Text>
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
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  recomend: {
    flex: 1,
    marginTop: 30,
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
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'ONE MOBILE OTF REGULAR',
  },
  datetext:{
    color: 'black',
    fontSize: 12,
    fontFamily: 'ONE MOBILE OTF REGULAR',
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
    fontFamily: 'ONE MOBILE OTF REGULAR',
  },
  profiletext: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'TENADA',
  },
});

export default MainScreen;
