import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import { defaultImg } from '../../constants/url';

const deviceWidth = Dimensions.get('window').width;

const DetailModal = props => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/bottomlogo.png')}
        />
        <Text style={styles.title}>{props.data.title}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              props.data.image == 'nan'
                ? 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJPkpg%2FbtssDKPHyNM%2FdBXdskD0UQZDdSQ7RJSBX0%2Fimg.png'
                : props.data.image,
          }}
          defaultSource={{uri: defaultImg}}
          resizeMode="cover"
        />
      </View>

      <View style={styles.buttons}>
        <View style={styles.like}>
          <Image
            style={{width: 30, height: 30}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/9272/9272486.png',
            }}
          />
          <Text>좋아요</Text>
        </View>

        <View style={styles.bookmark}>
          <Image
            style={{width: 30, height: 30}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/9585/9585331.png',
            }}
          />
          <Text>북마크</Text>
        </View>

        <View style={styles.star}>
          <Image
            style={{width: 30, height: 30}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10294/10294894.png',
            }}
          />
          <Text>좋아요</Text>
        </View>

        <View style={styles.phone}>
          <Image
            style={{width: 30, height: 30}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/8034/8034657.png',
            }}
          />
          <Text>전화</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address1}>주소</Text>
          <Text style={styles.address2}>{props.data.address}</Text>
        </View>
        <View style={styles.phoneNumberContainer}>
          <Text style={styles.phoneNum1}>전화번호</Text>
          <Text style={styles.phoneNum2}>
            {' '}
            {props.data.phonenumber == 'nan'
              ? '등록된 전화번호가 없습니다'
              : props.data.phonenumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 5,
  },

  logo: {
    flex: 1,
  },

  title: {
    flex: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
  },

  imageContainer: {
    flex: 11,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  image: {
    margin: 10,
    width: deviceWidth - 20,
    height: 300,
    borderRadius: 10,
  },

  buttons: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    marginBottom: 20,
    flex: 3,
    alignItems: 'center',
  },

  like: {
    marginLeft: 40,
    marginRight: 15,
    flex: 1,
    height: 60,
    alignItems: 'center',
  },

  bookmark: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    height: 60,
    alignItems: 'center',
  },

  star: {
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    height: 60,
    alignItems: 'center',
  },

  phone: {
    marginLeft: 15,
    marginRight: 40,
    flex: 1,
    height: 60,
    alignItems: 'center',
  },

  infoContainer: {
    flex: 1,
    marginTop: 20,
  },

  addressContainer: {
    flexDirection: 'row',
    margin: 10,
    flex: 1,
  },
  address1: {
    textAlign: 'left',
    marginLeft: 30,
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
  },
  address2: {
    flex: 3,
  },

  phoneNumberContainer: {
    flexDirection: 'row',
    margin: 10,
    flex: 1,
  },
  phoneNum1: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 30,
    fontSize: 17,
    fontWeight: 'bold',
  },
  phoneNum2: {
    flex: 3,
  },
});

export default DetailModal;
