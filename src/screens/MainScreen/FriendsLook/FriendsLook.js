import airplane from '../../../assets/images/dateairplane.png'
import viewImage from '../../../assets/images/avatar.png'
import profileImg from '../../../assets/images/profileImg.png';
import { RecomendGarmet } from '../../../constants/RecomendGarmet';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Modal,
    useWindowDimensions
  } from 'react-native';
import { Friendex } from '../../../constants/Friendex'
import React,{useEffect,useState} from 'react';
import {CollapseBody} from 'accordion-collapse-react-native';
import axios from 'axios';

const FriendsLook = () => {
    const [isModalVisible, setModalVisible] = useState(false); // 모달 on/off
    const [friendname,setfriendname] = useState('') //선택된 친구 
    const [listfriendname,setlistfriendname] = useState([])
    const height = useWindowDimensions().height;
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

    const renderItem = ({ item }) => ( //DB에서 친구 목록 불러오는 Method
        <View>
            <TouchableOpacity onPress={() =>handleNameClick(item)}>
                <Text style={styles.topshowname}>{item}</Text>
            </TouchableOpacity>   
        </View>
      );
      useEffect(() => { //사용자 친구 데이터 API 
        axios.get('http://10.0.2.2:8000/api/friends/myFriends?userId=a')
          .then(function (response) {
            console.log(response.data.myFriends[0].usrId);
            setlistfriendname(response.data.myFriends[0].usrId);
          })
          .catch(function (err) {
            console.log(err);
          });
      }, []);
    
    return(
        <SafeAreaView
            style={styles.allconatiner}>
        <View
            style={styles.firstcontainer}>
            <Text
                style={styles.toptext}> 2023.07.19 ~ 2023.07.23 with </Text>
            <View style={styles.topshowcontainer}>  
            <TouchableOpacity
                onPress={toggleModal}>
                <NameView/>
            </TouchableOpacity>
            <Modal 팝업창
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
                >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <CollapseBody
                    style={{height:48}}>
                <FlatList
                    data={listfriendname} //펼칠 데이터 대상
                    renderItem={renderItem} //렌더링 Method
                    keyExtractor={(item,index) => index.toString()}
                    />
                </CollapseBody>
              </View>
            </View>
          </Modal>
            
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
friendtoptext:{
    fontSize:24,
    color:'#4848E8',
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