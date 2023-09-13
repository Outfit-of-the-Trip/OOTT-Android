import React, {useState, useEffect} from 'react'
import { Calendar } from "react-native-calendars";
import { useSetRecoilState } from "recoil";
import { firstDateState, lastDateState } from '../../../states/atoms';

import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native';

import ActionSheet, {
    SheetManager,
    ActionSheetRef,
    SheetProps,
} from 'react-native-actions-sheet';

const CalendarSheet = (props) => {

    const [date, setDate] = useState([]);
    const setfirstDate = useSetRecoilState(firstDateState)
    const setLastDate = useSetRecoilState(lastDateState)
    const [dateMarker, setDateMarker] = useState({})
    
    const addDate = async (data) => {
        let copy = [...date]
        let findIndex = copy.indexOf(data)

        if(findIndex > -1) copy.splice(findIndex, 1);
        else copy.push(data)

        setDate(copy.sort())

        setfirstDate(copy[0])
        setLastDate(copy[copy.length - 1])
    }
    
    useEffect(()=>{
        toMarker()
    }, [date])

    const toMarker = () => {
        const dateObject = date.reduce((accumulator, currentValue) => {
            accumulator[currentValue] = {selected: true, startingDay: true, endingDay: true, color: '#50cebb'}
            return accumulator;
        }, {});
        setDateMarker(dateObject)
    }


    return(
        <ActionSheet
            containerStyle={{
                borderTopLeftRadius:25,
                borderTopRightRadius:25
            }}
            indicatorStyle={{
                width:100
            }}
            gestureEnabled={true}
        >
            <View style={styles.calendarContainer}>
                <Calendar
                    showTodayButton
                    markingType={'period'}
                    style={styles.calendar}
                    markedDates={dateMarker}
                    onDayPress={day => {addDate(day.dateString)}}    
                />
            </View>
            <View style={styles.dateContainer}>
                {
                    date[0] ? 
                    (<Text style={styles.title}>{date[0]} ~ {date[date.length - 1]}</Text>):
                    (<Text style={styles.title}>여행 날짜를 선택해주세요</Text>) 
                }

            </View>
    
        </ActionSheet>

    )

}

export default CalendarSheet


const styles = StyleSheet.create({
    calendarContainer:{
        margin: 10,
    },
    calendar: {
        borderBottomColor: 'white',
    },
    dateContainer:{
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        marginBottom: 20,
        color: "black",
        fontWeight: "bold",
        fontSize: 20
    }
})