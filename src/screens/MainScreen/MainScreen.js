import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import profileImg from '../../assets/images/profileImg.png';
import recomend1 from '../../assets/images/recomend1.png';
import recomend2 from '../../assets/images/recomend2.png';
import recomend3 from '../../assets/images/recomend3.png';
import recomend4 from '../../assets/images/recomend4.png';
import more from '../../assets/images/more.png';

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

const TravelInfo = [
  {
    name: '성욱',
    image: [recomend1, recomend2, recomend3, recomend4],
    tag: '#우정여행 #먹부림',
  },
  {
    name: '근재',
    image: [recomend1, recomend2, recomend3, recomend4],
    tag: '#우정여행 #먹부림',
  },
  {
    name: '준민',
    image: [recomend1, recomend2, recomend3, recomend4],
    tag: '#우정여행 #먹부림',
  },
];

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
              alignItems: 'center',
            }}>
            <Image
              source={profileImg}
              styles={{
                resizeMode: 'contain',
                flex: 1,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
                fontFamily: 'TENADA',
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
        {TravelInfo.map((info, index) => (
          <View style={styles.recomend} key={index}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>{info.name}님을 위한 추천</Text>
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
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
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
  advertise: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
  },
  shopingmall: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  profileImgae: {
    flex: 1,
    resizeMode: 'contain',
  },
  blueText: {
    color: '#0D38CE',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ONE MOBILE OTF BOLD',
  },
  recoimgae: {
    flex: 1,
    resizeMode: 'contain',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ONE MOBILE OTF BOLD',
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
    fontWeight: 'bold',
    fontFamily: 'ONE MOBILE OTF BOLD',
  },
  profiletext: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'ONE MOBILE OTF BOLD',
  },
});

export default MainScreen;
