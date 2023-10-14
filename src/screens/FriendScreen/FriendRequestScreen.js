import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import { backendURL } from '../../constants/url';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AuthContext} from '../../utils/Auth';
import {Avatar} from 'react-native-paper';
import EmptyImg from '../../assets/images/emptyImage.png';
const FriendRequestScreen = () => {
  const {userInfo} = useContext(AuthContext);
  const [friendReq, setFriendReq] = useState([]);

  useEffect(() => {
    axios
      .get(backendURL+`/api/friends/myResponse?userId=${userInfo.nickname}`)
      .then(res => {
        console.log('내가 받은 요청:', res.data);
        setFriendReq(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    console.log('friendReq:', friendReq);
  }, []);

  const acceptReq = req => {
    console.log(req);
    axios
      .post(backendURL+'/api/friends/addFriends', {
        reqUser: `${userInfo.nickname}`,
        resUser: `${req.usrId}`,
      })
      .then(res => console.log(res.data))
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.container}>
      {friendReq.length === 0 ? (
        <View style={styles.EmptyContainer}>
          <Image source={EmptyImg} style={styles.EmptyImg} />
        </View>
      ) : (
        friendReq.map((item, i) => (
         
            <View key={i} style={styles.personRowContainer}>
              <View style={styles.personColumnContainer}>
                <Avatar size={50} rounded source={{uri: item.usrProfileURL}} />
              </View>
              <View style={{flex: 2, justifyContent: 'center', marginLeft: 10,}}>
                <Text style={styles.textfont}>{item.myFriend}</Text>
                <Text style={{fontSize: 15}}>8 recommended</Text>
              </View>
              <TouchableOpacity
                style={styles.plusButtonContainer}
                onPress={() => acceptReq(item)}>
                <Text style={styles.AcceptButton}>수락</Text>
              </TouchableOpacity>
            </View>
        ))
      )}
    </View>
  );
};

export default FriendRequestScreen;

const styles = StyleSheet.create({
  container: {backgroundColor:'white'},
  personRowContainer: {
    alignSelf: 'center',
    width: '90%',
    margin: 5,
    padding: 4,
    marginTop: 5,
    borderRadius: 10,
    flexDirection: 'row',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    borderColor: 'gray',
    backgroundColor: '#F2F2F2',
  },
  personColumnContainer: {
    margin: 9,
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: '오뮤_다예쁨체',
  },
  row: {
    flexDirection: 'row',
  },
  avatarContainer: {
    borderRadius: 30,
    borderColor: 'undefined',
  },
  userId: {
    textAlign: 'center',
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
    width: 50,
    color: 'black',
  },
  textfont: {
    fontFamily: '오뮤_다예쁨체',
    fontSize: 20,
    color: '#000000',
    marginTop: 8,
  },
  plusButtonContainer: {
    justifyContent: 'center',
  },
  AcceptButton: {
    width: 50,
    fontFamily: '오뮤_다예쁨체',
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: '#9F81F7',
    borderRadius: 50,
  },
  EmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  EmptyImg: {
    backgroundColor: 'white',
    marginLeft: 15,
    resizeMode: 'contain',
    width: '100%',
  },
});
