import React, {useState} from 'react';
import {View, Dimensions, Text, StyleSheet} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import FriendRequestScreen from './FriendRequestScreen';
import FriendScreen from './FriendScreen';

const FriendSelectScreen = () => {
  const width = Dimensions.get('window').width;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'friendSearch', title: '친구 찾기'},
    {key: 'friendRequest', title: '친구 요청'},
  ]);

  const renderScene = SceneMap({
    friendSearch: FriendScreen,
    friendRequest: FriendRequestScreen,
  });

  //   const renderScene = ({route}) => {
  //     switch (route.key) {
  //       case 'friendSearch':
  //         return <FriendScreen />;
  //       case 'friendRequest':
  //         return <FriendRequestScreen />;
  //       default:
  //         return null;
  //     }
  //   };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'black'}}
            style={{backgroundColor: 'white'}}
            labelStyle={{color: 'black'}}
          />
        )}
      />
    </View>
  );
};

export default FriendSelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    color: 'black',
    fontSize: 20,
  },
});
