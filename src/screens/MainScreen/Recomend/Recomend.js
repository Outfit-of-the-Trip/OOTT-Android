import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Button } from '@rneui/themed';

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
import { useNavigation } from '@react-navigation/native';

const Recomend = () => {
  const navigation = useNavigation();
  const [isImage, setIsImage] = useState(true);
  const width = useWindowDimensions().width; //기기 폭 값
  const gotoRecomendTop = () => {
    return navigation.navigate('RecomendTop');
  };

  const gotoRecomendBottom= () => {
    return navigation.navigate('RecomendBottom');
  };

  const gotoRecomendShose = () => {
    try{
    return navigation.navigate('RecomendShose');}
    catch(e){console.log(e)}
  };

  const gotoFriendsLook = () => {
    return navigation.navigate('FriendsLook');
  };
  
  const toggleImage = () => {
    setIsImage(!isImage);
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
            <TouchableOpacity>
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
      <Image
        source={preview}
        style={[styles.showimg,{width:width-20}]}/>
    </View>
    <View style={[styles.bottomline,{marginBottom:20}]} />
    <View
      style={[styles.bottomfirstcontainer,{marginHorizontal:width-(width-70)}]}
    > 
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
        <TouchableOpacity onPress={toggleImage}>
          {isImage ? (
            <Image 
            style={styles.imgcontain}
            source={heart}/>
            ) : (
              <Image
              style={styles.imgcontain}
              source={uheart}/>
              )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={gotoFriendsLook}>
          <Text
          style={styles.samedaystext}>같은 날 친구가 입는 옷은?</Text>
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
      flex:3,
      alignItems:'center',
      justifyContent:'center',
    },
    showimg:{
      flex:0.98,
      resizeMode:'contain',
      overflow:'hidden'
    },
    bottomfirstcontainer:{
      flexDirection:'row',
      flex:0.5,
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
      justifyContent:'space-between',
      alignItems:'center'
    },
    samedaystext:{
      fontSize:24,
      fontFamily:'오뮤_다예쁨체',
      color:'black'
    },
    imgcontain:{
      resizeMode:'contain'
    },
    bottomline: {
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      marginTop: 10,
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 6,
    },

  })