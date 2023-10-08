import {View, Text, SafeAreaView, useWindowDimensions} from 'react-native';

const ShoppingList = () => {
  const width = useWindowDimensions().width;

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: width - (width - 10)}}>
      <View style={{flex: 2, backgroundColor: 'red'}}>
        <View
          style={{
            flex: 0.2,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text>날짜</Text>
        </View>
        <View
          style={{flex: 1.5, backgroundColor: 'green', flexDirection: 'row'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>이미지</Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>무신사</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShoppingList;
