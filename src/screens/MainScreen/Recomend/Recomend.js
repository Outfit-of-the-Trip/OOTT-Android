import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';

import {
  View,
  Button,
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
  
  const gotoNext = () => {
    return navigation.navigate('DetailRecomend');
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
          style={[styles.infosecondcontainer,{marginHorizontal:width-(width-20)}]}>
          <Text
            style={styles.infosecondttext}>
            2023.07.19 Look
          </Text>
          <View
            style={styles.infosecondbutton}>
            <Button
              title='아바타로보기'/>
          </View>
        </View>
    </View>
    <View
      style={styles.showimgcontainer}>
      <TouchableOpacity
        onPress={gotoNext}>
      <Image
        source={preview}
        style={[styles.showimg,{width:width-20}]}/>
      </TouchableOpacity>
    </View>
    <View
      style={[styles.bottomcontainer,{marginHorizontal:width-(width-20)}]}>
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
        <TouchableOpacity>
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
    },
    infocontainer:{
      flex:1,
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
     fontWeight:'bold',
     color:'black'
    },
    infoclendar:{
      flexDirection:'row',
      justifyContent:'flex-end',
      flex:1
    },
    infosecondcontainer:{
      flex:0.5,
      alignItems:'flex-start',
      justifyContent:'space-between', 
      flexDirection:'row'
    },
    infosecondttext:{
      fontSize:24,  
      fontWeight:'bold',
      color:'black',
      flex:0.5
    },
    infosecondbutton:{
      flexDirection:'row',
      justifyContent:'flex-end',
      flex:0.5
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
    }
    ,
    bottomcontainer:{
      flex:0.5,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    samedaystext:{
      fontSize:16,
      fontWeight:'bold',
      color:'black'
    },
    imgcontain:{
      resizeMode:'contain'
    }

  })