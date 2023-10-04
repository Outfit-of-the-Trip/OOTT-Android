import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    Modal,
    CollapseBody,
    FlatList,
    ImageBackground
  } from 'react-native';
import { useRoute } from '@react-navigation/native';
import React,{useState, useContext} from 'react';
import Swiper from 'react-native-swiper'
import { Avatar } from '@rneui/themed';

import friendbackground from '../../../assets/images/friendbackground.png';
import codybackground from '../../../assets/images/codybackground.png';

import {AuthContext} from '../../../utils/Auth';
import TravelFriends from '../../OOTTScreen/TravelFriends/TravelFriends';

const FriendsLook = () => {
    const [isModalVisible, setModalVisible] = useState(false); // 모달 on/off
    const [friendname,setfriendname] = useState('') //모달창에서 선택된 친구
    const width = useWindowDimensions().width;
    const {params: data} = useRoute(); //여행 데이터 받아오기
    const {userInfo} = useContext(AuthContext);
    const {travlFreinds} = useContext(AuthContext);
    

    const toggleModal = () => { //팝업창 on/off method
        setModalVisible(!isModalVisible);
    };

    const NameView = () =>{ //친구 이름 출력 view
        if(friendname==''){
            return <Text style={styles.friendtoptext}>선택</Text>
        }else if(friendname!=''){
            return <Text style={styles.friendtoptext}>{friendname}</Text>
        }
    }
    const handleNameClick = (name) => { //팝업창에서 친구 선택되었을떄 처리 method
        setfriendname(name);
        setModalVisible(false);
      };

    const renderItem = ({ item }) => { //DB에서 친구 목록 불러오는 Method
        const nameArray = item.split('@').filter(name => name.trim() !== '');
        console.log(nameArray)

        if (nameArray.length === 0) {
            return null; 
          }

        return nameArray.map((name, index) => (
            <View key={index} style={{flexDirection:'row'}} >
            <Avatar
                size={30}/>
            <TouchableOpacity onPress={() => handleNameClick(name)}>
                <Text style={styles.topshowname}>{name}</Text>
            </TouchableOpacity>
            </View>
        ));
    };     

    return(
        <SafeAreaView
            style={styles.allconatiner}>
            <ImageBackground 
              source={friendbackground} 
              style={{flex: 1, resizeMode: 'cover',}}
              blurRadius={15}	//Blur 효과
            >
        <View
            style={[styles.firstcontainer,{marginHorizontal:width-(width-20)}]}>
                
            <View style={styles.topshowcontainer}>
            <Image
              style={styles.profileImage}
              source={{uri: userInfo.profileImageUrl}}
            />
            <Text style={styles.toptext}> 
                양준민{travlFreinds} 
            </Text>
            <View style={styles.selectBtn}>
           <TouchableOpacity
                onPress={toggleModal}>
                <NameView/>
            </TouchableOpacity>
            </View>
            <Modal 팝업창
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
                >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                 <CollapseBody
                    style={{height:'30%'}}>
                <FlatList
                    //펼칠 데이터 대상
                    renderItem={renderItem} //렌더링 Method
                    keyExtractor={(item,index) => index.toString()}
                    />
                </CollapseBody>
              </View>
            </View>
          </Modal>
            </View>
        </View>
        <View
            style={styles.secondcontainer}>
                <ImageBackground 
              source={codybackground} 
              style={{flex: 1, resizeMode: 'cover', opacity: 0.5,}}
              blurRadius={5}	//Blur 효과
            >
            </ImageBackground>
        </View>
        <View
            style={[styles.thirdcontainer,{marginHorizontal:width-(width-20)}]}>
            <Text
                style={styles.bottomtext1}>
                2021-11-04 with minseo          
                {/* {travelDate} with {travlFriends}로 바꿀 예정 입니다. */}
            </Text>
            <Text
                style={styles.bottomtext2}>
                #cute #japan_look
            </Text>
        </View>
        </ImageBackground>
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
    flex:0.2,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:"center",
},
profileImage: {
    width:50,
    height: 50,
    borderRadius: 100,
},
toptext:{
    fontSize:20,
    color:'black',
    fontFamily:'오뮤_다예쁨체'
},
friendtoptext:{
    fontSize:20,
    color:'#4848E8',
    fontFamily:'오뮤_다예쁨체'
},
topname:{
    fontSize:24,
    color:'blue',
    fontFamily:'오뮤_다예쁨체'
},
topshowcontainer:{
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    alignContent:'center',
},
selectBtn: {
    flex: 1,
    flexDirection:"row",
    justifyContent: 'flex-end',
},
topshowname:{
  fontFamily:'오뮤_다예쁨체',
  fontSize:24,
},
showimg:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
  },
secondcontainer:{
    flex: 1,
},
thirdcontainer:{
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    flex:0.3,
},
bottomtext1:{
    fontSize: 20,
    fontWeight: '100',
    color:'white',
    fontFamily:'오뮤_다예쁨체'
},
bottomtext2:{
    padding: 10,
    fontSize: 16,
    fontWeight: '100',
    color:'white',
    fontFamily:'오뮤_다예쁨체'
},
bottomline: {
  borderBottomColor: 'gray',
  borderBottomWidth: 1,
  shadowColor: 'gray',
  marginTop:2,
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.5,
  shadowRadius: 4,
  elevation: 8,
},
modalContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
})