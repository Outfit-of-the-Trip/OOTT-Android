import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Fashion from '../../assets/images/fashion.jpg';
import {DataTable} from 'react-native-paper';
import Dateairplane from '../../assets/images/dateairplane.png';
import {Button} from 'react-native-paper';
import axios from 'axios';
const FriendInfoScreen = () => {
  const {params: FriendData} = useRoute();
  console.log(FriendData);

  const [travleData, setTravleData] = useState([]);
  const [visible, setVisible] = useState(false);

  const getTravleInfo = async () => {
    setVisible(!visible);
    try {
      const response = await axios.get(
        'http://10.0.2.2:3000/api/travel/getMyTravelInfo?userId=a',
      );
      console.log(response.data);
      setTravleData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const addingFriend = async () => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/api/friends/addFriends',
        {
          reqUserId: `reqTest`,
          resUserId: `${FriendData}`,
        },
      );
    } catch (e) {
      console.log(e);
    }
  };
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();

  return (
    <View style={styles.allContainer}>
      <Modal
        visible={visible}
        onDismiss={getTravleInfo}
        animationType="fade"
        transparent={true}>
        <View style={styles.ModalScreen}>
          <View style={styles.ModalBody}>
            <ScrollView>
              <DataTable>
                <DataTable.Header style={styles.dataHeader}>
                  <DataTable.Title>친구 이름</DataTable.Title>
                  <DataTable.Title>여행 날짜</DataTable.Title>
                </DataTable.Header>
                {travleData.length === 0 ? (
                  <Text>정보 없음</Text>
                ) : (
                  travleData.map((item, index) => (
                    <ScrollView key={index}>
                      <DataTable.Row style={styles.dataRow}>
                        <DataTable.Cell>{item.travlFriends}</DataTable.Cell>
                        <DataTable.Cell>{item.travlDate}</DataTable.Cell>
                      </DataTable.Row>
                    </ScrollView>
                  ))
                )}
              </DataTable>
            </ScrollView>
            <Button mode="outlined" onPress={getTravleInfo}>
              cancel
            </Button>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={getTravleInfo}>
        <View style={styles.profileContainerRow}>
          <View style={styles.profileContainerColumn}>
            <View style={styles.textBox}>
              <Text style={{fontFamily: '오뮤_다예쁨체'}}>
                2023_07_19~2023_07_23 to Mongol
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomLine}></View>
      <View style={styles.postHeader}>
        <View style={styles.postHeaderRow}>
          <Image source={Dateairplane} />
          <Text style={styles.userHeadr}>{FriendData}님의 Look</Text>
        </View>
        <View>
          <Text style={styles.times}>
            {year}.{month}.{day}
          </Text>
        </View>
      </View>
      <View style={styles.bottomLine}></View>
      <View style={styles.fashionContainer}>
        <Image style={styles.showFashion} source={Fashion} />
      </View>
      <Text style={styles.Tags}>
        #BestFriend&nbsp;&nbsp;&nbsp;#Casual&nbsp;&nbsp;&nbsp;#HongDae&nbsp;&nbsp;&nbsp;
      </Text>
      <Button style={styles.addFriend} mode="outlined" onPress={addingFriend}>
        친구 추가
      </Button>
    </View>
  );
};

export default FriendInfoScreen;

const styles = StyleSheet.create({
  allContainer: {
    fontFamily: '오뮤_다예쁨체',
  },
  profile: {
    width: 100,
    height: 100,
  },
  profileContainerRow: {
    padding: 2,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
  },
  profileContainerColumn: {
    flexDirection: 'column',
    margin: 7,
  },
  bottomLine: {
    borderBottomColor: 'gray',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -20,
  },
  postHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBox: {
    fontSize: 16,
    alignItems: 'center',
  },
  userHeadr: {
    fontSize: 16,
    fontFamily: '오뮤_다예쁨체',
  },
  times: {
    fontFamily: '오뮤_다예쁨체',
  },
  containerStyle: {
    backgroundColor: 'white',
  },
  showFashion: {
    resizeMode: 'contain',
    width: '100%',
  },
  ModalScreen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBody: {
    width: 350,
    height: 250,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
  },
  dataHeader: {
    borderBottomWidth: 2,
    borderColor: 'black',
  },
  dataRow: {
    borderBottomWidth: 2,
    borderColor: 'gray',
  },
  Tags: {
    marginTop: -20,
    fontFamily: '오뮤_다예쁨체',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  addFriend: {
    borderColor: '#7401DF',
    backgroundColor: '#F2DEF4',
  },
});
