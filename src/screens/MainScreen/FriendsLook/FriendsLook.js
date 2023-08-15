import airplane from '../../../assets/images/dateairplane.png'
import viewImage from '../../../assets/images/avatar.png'
import profileImg from '../../../assets/images/profileImg.png';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
  } from 'react-native';
import { Friendex } from '../../../constants/Friendex'
import React from 'react';
import {CollapseBody} from 'accordion-collapse-react-native';

const FriendsLook = () => {
    const renderItem = ({ item }) => (
        <View>
          <Text style={styles.topshowname}>{item.name}</Text>
        </View>
      );

    return(
        <SafeAreaView
            style={styles.allconatiner}>
        <View
            style={styles.firstcontainer}>
            <Text
                style={styles.toptext}> 2023.07.19 ~ 2023.07.23 with </Text>
            <View style={styles.topshowcontainer}>  
                    <CollapseBody
                    style={{height:48}}>
                <FlatList
                    data={Friendex}
                    renderItem={renderItem}
                    keyExtractor={(item,index) => index.toString()}
                    />
                </CollapseBody>
            </View>
        </View>
        <View style={styles.bottomline}/>
        <View
            style={styles.secondcontainer}>
            <Image
                source={viewImage}/>
        </View>
        <View style={styles.bottomline}/>
        <View
            style={styles.thirdcontainer}>
            <Text
                style={styles.bottomtext}>
                #수트 #블레이저 #슬랙스
            </Text>
        </View>
        </SafeAreaView>
    )

}

export default FriendsLook

const styles = StyleSheet.create({
allconatiner:{
     flex:5,
     backgroundColor:'white'
},
firstcontainer:{
    flex:0.5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
},
toptext:{
    fontSize:24,
    color:'black',
    fontFamily:'오뮤_다예쁨체'
},
topname:{
    fontSize:24,
    color:'blue',
    fontFamily:'오뮤_다예쁨체'
},
topshowcontainer:{
    flex:0.5
},
topshowname:{
  fontFamily:'오뮤_다예쁨체',
  fontSize:24
},
secondcontainer:{
    flex:3,
    justifyContent:'center',
    alignItems:'center',
},
thirdcontainer:{
    flex:0.5,
    justifyContent:'center',
    alignItems:'center'
},
bottomtext:{
    fontSize:24,
    color:'black',
    fontFamily:'오뮤_다예쁨체'
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
}
})