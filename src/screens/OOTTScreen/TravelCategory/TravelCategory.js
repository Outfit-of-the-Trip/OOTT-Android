import React, {useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {categoryState} from '../../../states/atoms';
import BitSwiper from 'react-native-bit-swiper';
import {useNavigation} from '@react-navigation/native';

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const TravelCategory = () => {
  const navigation = useNavigation();
  const gotoRecommendSceen = () => {
    saveCategorysData(categoryIdx);
    return navigation.navigate('RecommendScreen');
  };

  const saveCategorysData = useSetRecoilState(categoryState);

  const [categoryIdx, setcategoryIdx] = useState('핫플레이스');

  const category = ['핫플레이스', '전통', '놀이공원', '바닷가', '산'];

  const catImages = [
    'https://thumbnail4.coupangcdn.com/thumbnails/remote/212x212ex/image/vendor_inventory/4b98/66de5d5469dca4482ff5924eede9a882325277f2994d1d109160591b341e.jpg',
    'https://thumbnail12.coupangcdn.com/thumbnails/remote/212x212ex/image/vendor_inventory/79ca/8de567884f193e4a89a79e91b27dde9db0f538eba65dd83ca52bbf406479.jpg',
    'https://t1a.coupangcdn.com/thumbnails/remote/212x212ex/image/vendor_inventory/8ced/f1f4a78f7e5e4071adadff4569f37422f5a744cc0a0614fbe94565447a61.jpg',
    'https://t1c.coupangcdn.com/thumbnails/remote/212x212ex/image/vendor_inventory/1da5/7a0cdef1fb63ae9a2255f5083aaf155febc0ba1292efc1d85cf8f4715234.png',
    'https://t3a.coupangcdn.com/thumbnails/remote/212x212ex/image/vendor_inventory/9ae8/4015105e8499c577c366ccbd6237177de93565e53322370b63afc6943a58.jpg',
  ];

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          어떤 스타일의{'\n'}여행을 할 계획인가요?
        </Text>
      </View>
      <View style={styles.imgSlider}>
        <BitSwiper
          items={category}
          itemWidth="80%" // 활성 아이템의 넓이
          inactiveItemScale={0.8} // 비활성 아이템의 스케일
          inactiveItemOpacity={0.5} // 비활성 아이템의 투명도
          inactiveItemOffset={30} // 비활성 아이템 표시 넓이
          onItemIndexChange={item => {
            setcategoryIdx(category[item]);
          }}
          onItemRender={(item, index) => (
            <View>
              <View>
                <Text style={styles.text}># {item}</Text>
              </View>

              <View key={index} style={{height: 250}}>
                <Image
                  source={{uri: catImages[index]}}
                  style={{width: '100%', height: '100%', borderRadius: 10}}
                />
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.nextButton}>
        <TouchableOpacity
          onPress={gotoRecommendSceen}
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
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    color: 'black',
    margin: 20,
    fontWeight: 'bold',
  },
  imgSlider: {
    flex: 3,
  },
  text: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  nextButton: {
    flex: 1,
  },
});

export default TravelCategory;
