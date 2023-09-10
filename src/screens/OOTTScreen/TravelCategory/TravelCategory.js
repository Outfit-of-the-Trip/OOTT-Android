import React, {useState, useEffect } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { userInfoState, friendsState } from '../../../states/atoms';


import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    FlatList
} from 'react-native';

const TravelCategory = () => {

    const friendsData = useRecoilValue(friendsState);

    return(
        <View>
            <Text>this is category pave</Text>
        </View>
        
    )
}

export default TravelCategory