import {useWindowDimensions} from 'react-native';
import recomendOOTT from '../assets/images/recomendOOTT.png';
import {View, StyleSheet, Text, Image} from 'react-native';

const FirstLogin = () => {
  const width = useWindowDimensions().width; //기기 폭 값

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{flex: 0.5, justifyContent: 'center'}}>
        <Image
          style={{resizeMode: 'center', marginHorizontal: width - 20}}
          source={recomendOOTT}
        />
      </View>
      <View style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.fontblack}>게시물 없음</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    marginTop: 50,
  },
  firstcontainer: {
    alignItems: 'center',
    flex: 2,
  },
  fontblack: {
    fontFamily: 'SCDream4',
    fontSize: 24,
    color: 'black',
  },
});

export default FirstLogin;
