import { useNavigation } from '@react-navigation/native';
import React, {useContext} from 'react';

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';

const username = () => {
  return <Text style={styles.blueText}>성욱</Text>;
};

const frinedsname = () => {
  return <Text style={styles.blueText}>창현</Text>;
};



const hashTage = [
  {
    id: 1,
    text: '#부산여행',
  },
  {
    id: 2,
    text: '#우정여행',
  },
  {
    id: 3,
    text: '#레저',
  },
  {
    id: 4,
    text: '#호캉스',
  },
  {
    id: 5,
    text: '#편안한',
  },
  {
    id: 6,
    text: '#관광',
  },
];

const MainScreen = () => {
  navigation = useNavigation()
  const goToRecomend = () =>{
    return(
      navigation.navigate('Recomend')
    )
}
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profile}>
          <Image
            source={require('./img/profileImg.png')}
            styles={styles.profile}
          />
          <View style={{flexDirection: 'column', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={require('./img/profileAirplane.png')}
                style={{
                  flex: 0.5,
                  resizeMode: 'contain',
                  marginTop: 8,
                }}
              />
              <View>
                <Text style={styles.profileText}>2022-06-07~</Text>
                <Text style={styles.profileText}>2022-06-09 to busan</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'flex-start',
                }}>
                <Image
                  source={require('./img/profileHashTag.png')}
                  style={{
                    resizeMode: 'contain',
                    flex: 1,
                    marginLeft: 10,
                    marginBottom: 100,
                    marginTop: 10,
                  }}
                />
              </View>
              <View>
                {hashTage.map(tag => (
                  <Text
                    style={{
                      flex: 0.5,
                      marginLeft: 18,
                      color: '#0D38CE',
                      fontSize: 16,
                      fontWeight: 'bold',
                      fontFamily: 'ONE MOBILE OTF BOLD',
                    }}
                    key={tag.id}>
                    {tag.text}
                  </Text>
                ))}
              </View>
            </View>
            <View style={{flexDirection: 'column', marginLeft: 10}} />
          </View>
        </View>
        <View style={styles.bottomline} />
        <View style={styles.recomend}>
          <View style={{flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
          }}>
          <Text style={styles.text}>{username()}님을 위한 추천</Text>
          <TouchableOpacity
            onPress={goToRecomend}>
          <Text>
          더보기</Text>
          </TouchableOpacity>
          </View>
          
          <ScrollView horizontal={true}>
            <Image
              source={require('./img/recomend1.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/recomend2.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/recomend3.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/recomend4.png')}
              style={styles.recoimgae}
            />
          </ScrollView>
          <View style={styles.bottomline} />
        </View>
        <View style={styles.friends}>
        <View style={{flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
          }}>
          <Text style={styles.text}>
            함께 여행하는 친구 {frinedsname()}은 이렇게 옷을 입는대요 !{' '}
          </Text>
          <TouchableOpacity
            onPress={goToRecomend}>
          <Text>
          더보기</Text>
          </TouchableOpacity>
          </View>
          <ScrollView horizontal={true}>
            <Image
              source={require('./img/friends1.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/friends2.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/friends3.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/friends4.png')}
              style={styles.recoimgae}
            />
          </ScrollView>
          <View style={styles.bottomline} />
        </View>
        <View style={styles.advertise}>
          <Image
            source={require('./img/advertise.png')}
            style={
              (styles.recoimgae,
              {
                justifyContent: 'center',
                alignContent: 'center',
                marginLeft: 30,
              })
            }
          />
          <View style={styles.bottomline} />
        </View>
        <View style={styles.shopingmall}>
          <Text style={styles.text}>더 즐거운 여행을 위한</Text>
          <Text style={styles.text}>{username()}님을 위한 쇼핑 리스트</Text>
          <ScrollView horizontal={true}>
            <Image
              source={require('./img/shophingmall.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/shophingmall.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/shophingmall.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/shophingmall.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/shophingmall.png')}
              style={styles.recoimgae}
            />
            <Image
              source={require('./img/shophingmall.png')}
              style={styles.recoimgae}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  profile: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
  },
  recomend: {
    flex: 1,
    marginTop: 30,
  },
  friends: {
    flex: 1,
    marginTop: 30,
  },
  advertise: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
  },
  shopingmall: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  profileImgae: {
    flex: 1,
    resizeMode: 'contain',
  },
  blueText: {
    color: '#0D38CE',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ONE MOBILE OTF BOLD',
  },
  profileText:{
    color: '#0D38CE',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ONE MOBILE OTF BOLD',
  },
  recoimgae: {
    flex: 1,
    resizeMode: 'contain',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ONE MOBILE OTF BOLD',
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
});

export default MainScreen;
