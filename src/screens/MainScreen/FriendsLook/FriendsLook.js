import airplane from '../../../assets/images/dateairplane.png'
import viewImage from '../../../assets/images/avatar.png'
import {
    View,
    Button,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
  } from 'react-native';

const FriendsLook = () => {
    return(
        <SafeAreaView
            style={styles.allconatiner}>
        <View
            style={styles.firstcontainer}>
            <Image
                source={airplane}/>
            <Text
                style={styles.toptext}> 2023.07.19 ~ 2023.07.23 with</Text>
            <Text
                style={styles.topname}> 준민</Text>
        </View>
        <View
            style={styles.secondcontainer}>
            <Image
                source={viewImage}/>

        </View>
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
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
},
toptext:{
    fontSize:16,
    color:'black'
},
topname:{
    fontSize:16,
    color:'blue'
},
secondcontainer:{
    flex:3,
    justifyContent:'center',
    alignItems:'center',
},
thirdcontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
bottomtext:{
    fontSize:16,
    color:'black'
}



})