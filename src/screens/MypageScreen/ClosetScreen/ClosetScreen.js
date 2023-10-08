import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import Closet from './Components/Closet';

const renderScene = SceneMap({
  first: Closet,
  second: Closet,
  third: Closet,
  fourth: Closet,
});

function ClosetScreen() {
  const witdh = Dimensions.get('window');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '아우터'},
    {key: 'second', title: '상의'},
    {key: 'third', title: '하의'},
    {key: 'fourth', title: '신발'},
  ]);

  const [selectedImages, setSelectedImages] = useState([]);

  return (
    <View style={styles.rootContainer}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: witdh}}
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
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ClosetScreen;
