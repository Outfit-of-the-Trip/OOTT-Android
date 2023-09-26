import React, {useState, useEffect} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {userInfoState, friendsState} from '../../../states/atoms';
import axios from 'axios';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import { backendURL, testURL } from '../../../constants/url';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const TravelFriends = () => {
    const navigation = useNavigation()

    const saveFriendsData = useSetRecoilState(friendsState)

    const gotoTravelCategory = () => {
        return navigation.navigate('TravelCategory');
    };
    const pressNextButton = () => {
        saveFriendsData(friendsData)
        gotoTravelCategory()
    }

    useEffect(() => {
        const getUserFriedns = async () => {
            axios.get(testURL+'/api/friends/myFriends?userId='+userInfo[0].nickname)
            .then(function (res) {
                const proccessedData = res.data.map(item=>{
                    const isClicked = false
                    const look = "None"
                    return {...item, isClicked, look}
                })
                
                setFriendsData(proccessedData)
                setIsLoding(false)
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    getUserFriedns();
    
  }, []);

  const changeLook = index => {
    const copy = [...friendsData];
    const currentText = copy[index].look;
    let nextText = '';

    switch (currentText) {
      case 'None':
        nextText = 'Similar';
        break;
      case 'Similar':
        nextText = 'Couple';
        break;
      case 'Couple':
        nextText = 'None';
        break;
      default:
        nextText = 'None';
    }
    copy[index].look = nextText;

    setFriendsData(copy);
  };

  const activateCheck = (index, isClicked) => {
    const copy = [...friendsData];
    copy[index].isClicked = !isClicked;
    setFriendsData(copy);
  };

  const userInfo = useRecoilState(userInfoState);
  const [friendsData, setFriendsData] = useState({});
  const [isLoding, setIsLoding] = useState(true);

  const renderFriends = ({item, index}) => {
    const clickedColor = item.isClicked ? 'black' : 'grey';
    const disable = item.isClicked ? false : true;

    return (
      <View style={styles.touch}>
        <View style={styles.checkBox}>
          <BouncyCheckbox
            size={20}
            fillColor="black"
            isChecked={item.isClicked}
            onPress={() => activateCheck(index, item.isClicked)}
          />
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.profile} source={{uri: item.usrProfileURL}} />
          </View>
          <View style={styles.textContainer}>
            <Text style={{color: clickedColor, fontSize: 13}}>
              {item.usrId}
            </Text>
          </View>
        </View>

        <View style={styles.styleContainer}>
          <Text>#스타일</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              backgroundColor: clickedColor,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: clickedColor,
              height: 35,
            }}
            onPress={() => changeLook(index)}
            disabled={disable}>
            <Text style={styles.witdSelectText}>{item.look}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>누구와 함께{'\n'}여행하시나요?</Text>
      </View>

      <View style={{marginHorizontal: 15}}>
        <Divider width={1.3} />
      </View>

      <View style={styles.littleText}>
        <Text style={{margin: 3}}>친구 {friendsData.length}</Text>
      </View>
      <View style={styles.friendListContainer}>
        <FlatList
          keyExtractor={item => item.usrId}
          data={friendsData}
          renderItem={renderFriends}></FlatList>
      </View>

      <View style={styles.nextButton}>
        <TouchableOpacity
          onPress={pressNextButton}
          style={{
            margin: 10,
            backgroundColor: 'black',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
              fontSize: 17,
              fontWeight: 'normal',
            }}>
            선택
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  friendListContainer: {
    flex: 9,
    margin: 5,
  },
  header: {
    fontSize: 25,
    color: 'black',
    margin: 20,
    fontWeight: 'bold',
  },

  touch: {
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: 'black',
    height: 75,
  },
  profile: {
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  profileContainer: {
    flex: 1.5,
    margin: 10,
    alignItems: 'center',
  },

  imageContainer: {
    flex: 2,
  },
  textContainer: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  styleContainer: {
    flex: 5,
    justifyContent: 'center',
    marginLeft: 20,
  },
  checkBox: {
    marginHorizontal: 20,
    flex: 0.3,
    justifyContent: 'center',
  },

  buttonContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  text: {
    color: 'black',
    fontSize: 13,
  },

  witdSelectText: {
    marginHorizontal: 20,
    color: 'white',
  },

  littleText: {
    marginHorizontal: 10,
    marginTop: 3,
    flex: 0.7,
  },
  nextButton: {
    flex: 2,
    justifyContent: 'center',
    margin: 10,
  },
});

export default TravelFriends;
