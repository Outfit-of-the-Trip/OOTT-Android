import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {TravelPurpose} from '../../constants/TravelPurpose';
import axios from 'axios';
import {Button} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import Heart from '../../assets/images/heart.png';
import LoadingPage from '../../assets/Loading/OOTT_Loading.jpg';

const PurposOfTravel = () => {
  const navigation = useNavigation();
  const {params: Data} = useRoute();
  console.log(Data);

  const [stackedData, setStackedDate] = useState(Data);
  const [likeFeature, setLikeFeature] = useState([]);

  const getLikeFeature = feature => {
    setLikeFeature(prevState => {
      if (!prevState.includes(feature.title)) {
        return [...prevState, feature.title];
      } else {
        const index = prevState.findIndex(item => item === feature.title);
        return prevState.slice(0, index + 1);
      }
    });
  };
  useEffect(() => {
    console.log(likeFeature);
  }, [likeFeature]);
  const passDataToDB = async () => {
    console.log(typeof Data.days);
    console.log(typeof Data.FriendName);
    const repones = await axios.post(
      'http://10.0.2.2:3000/api/travel/addTravelInfo',
      {
        usrId: 'a',
        travlDate: `${String(Data.days)}`,
        travlFriends: `${Data.FriendName}`,
      },
    );
    console.log(repones.data);
    navigation.navigate('MainScreen');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Swiper loop>
        {TravelPurpose.map((item, i) => (
          <View key={i}>
            <View style={styles.SwiperContainer}>
              <Text style={styles.Text}>#{item.title}</Text>
              <Image style={styles.Image} source={item.image} />
            </View>
            <TouchableOpacity onPress={() => getLikeFeature(item)}>
              <Image style={styles.likeFeature} source={Heart} />
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>
      <Button style={styles.nextButton} mode="outlined" onPress={passDataToDB}>
        다음
      </Button>
    </SafeAreaView>
  );
};

export default PurposOfTravel;

const styles = StyleSheet.create({
  SwiperContainer: {
    alignItems: 'center',
  },
  Image: {
    borderRadius: 5,
    width: 400,
    height: 300,
    resizeMode: 'cover',
  },
  Text: {
    marginTop: 5,
    fontSize: 25,
    textAlign: 'center',
    width: 200,
    color: 'black',
  },
  nextButton: {
    marginTop: 10,
  },
  likeFeature: {
    margin: 5,
  },
});
