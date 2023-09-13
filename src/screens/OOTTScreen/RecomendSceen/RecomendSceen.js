import React, {useState, useEffect, useRef } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { firstDateState, lastDateState, searchState, reasonState, friendsState, categoryState } from '../../../states/atoms';
import {useNavigation} from '@react-navigation/native';


import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const RecomendSceen = () => {

    const place = useRecoilValue(searchState);
    const firstDate = useRecoilValue(firstDateState);
    const lastDate = useRecoilValue(lastDateState);
    const reason = useRecoilValue(reasonState);
    const friend = useRecoilValue(friendsState);
    const category = useRecoilValue(categoryState);

    return(
        <View style={styles.rootContainer}>
            <Text>{place}</Text>
            <Text>{firstDate}</Text>
            <Text>{lastDate}</Text>
            <Text>{reason}</Text>
            {/* <Text>{JSON.stringify(friend)}</Text> */}
            <Text>{category}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "white"
    },
})

export default RecomendSceen