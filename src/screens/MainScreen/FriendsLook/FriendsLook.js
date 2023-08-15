import airplane from '../../../assets/images/dateairplane.png'
import viewImage from '../../../assets/images/avatar.png'
import profileImg from '../../../assets/images/profileImg.png';
import {
    View,
    Button,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
  } from 'react-native';
import { ListItem, Avatar, Icon } from '@rneui/themed';
import { FriendsList } from '../../../constants/FriendList'
import React, {useState} from 'react';
import { List } from 'react-native-paper';

const FriendsLook = () => {
    const [expanded, setExpanded] = React.useState(false);
    return(
        <SafeAreaView
            style={styles.allconatiner}>
        <View
            style={styles.firstcontainer}>
            {/* <Image
                source={airplane}/> */}
            <View
                style={{flex:1}}>
            <Text
                style={styles.toptext}> 2023.07.19 ~ 2023.07.23 with</Text>
            </View>
            <View style={{flexDirection:'column',flex:0.5}}>
            <ListItem.Accordion
                content={
                        <ListItem.Content>
                            <ListItem.Title
                                style={{fontFamily:'오뮤_다예쁨체',fontSize:24}}> 친구</ListItem.Title>
                        </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() =>{
                    setExpanded(!expanded);
                }}
            >
                <ListItem.Content>
                    {FriendsList.map((l,i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar
                                rounded
                                source={profileImg}/>
                            <ListItem.Content>
                            <ListItem.Title
                                style={styles.toptext}>{l.name[i]}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                    }
                </ListItem.Content>
            </ListItem.Accordion>
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