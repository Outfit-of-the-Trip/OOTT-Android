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
import { useRoute } from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import React,{useEffect,useState} from 'react';
import {CollapseBody} from 'accordion-collapse-react-native';
import axios from 'axios';

const FriendsLook = () => {
    const [isModalVisible, setModalVisible] = useState(false); // 모달 on/off
    const [friendname,setfriendname] = useState('') //모달창에서 선택된 친구
    const width = useWindowDimensions().width;
    const {params: data} = useRoute(); //여행 데이터 받아오기
    const traveldate = String(data.travlDate).substring(0,10);

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
            return null; // or handle empty array however you want
          }

        return nameArray.map((name, index) => (
            <View key={index}>
            <TouchableOpacity onPress={() => handleNameClick(name)}>
                <Text style={styles.topshowname}>{name}</Text>
            </TouchableOpacity>
            </View>
        ));
    };     

    return(
        <SafeAreaView
            style={styles.allconatiner}>
        <View
            style={styles.firstcontainer}>
            <View style={styles.topshowcontainer}>  
            <Text
                style={styles.toptext}>{traveldate} with </Text>
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
                    style={{height:'30%'}}>
                <FlatList
                    data={data.travlFriends} //펼칠 데이터 대상
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
             <SwiperFlatList
                data={RecomendGarmet}
                ItemSeparatorComponent={() => <View />}
                renderItem={({item,index}) =>(
                    <View
                        style={{justifyContent:"center",alignItems:"center",width:width}}>
                        <Image
                           source={item.img}
                            style={styles.showimg}/>
                    </View>      
        )}
        keyExtractor={(item) => item.id} />
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
    flex:0.3,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:"center"
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
    flex:0.5,
    flexDirection:"row"
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
    flex:3,
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