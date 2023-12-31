import React, {useState} from 'react';
import {Calendar, CalendarList} from 'react-native-calendars';
import {
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Button,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {todayString} from 'react-native-calendars/src/expandableCalendar/commons';
import {SafeAreaView} from 'react-native-safe-area-context';

const CalendarModal = ({isVisible, onClose}) => {
  const [selected, setSelected] = useState('');
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{flex: 0.9}}>
        <CalendarList
          style={styles.calendar}
          calendarHeight={height - 50}
          pastScrollRange={13}
          futureScrollRange={13}
          horizontal={true}
          theme={{
            todayTextColor: 'blue',
            textDayFontSize: 24,
            textMonthFontSize: 32,
            textSectionTitleColor: '#4949E8',
            textDayFontFamily: '오뮤_다예쁨체',
            textMonthFontFamily: '오뮤_다예쁨체',
          }}
          onDayPress={day => {
            setSelected(day.dateString);
            console.log(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: '#4949E8',
            },
          }}
        />
      </View>
      <View
        style={[
          styles.secondcontainer,
          {marginBottom: height - (height - 30)},
        ]}>
        <TouchableOpacity onPress={onClose} style={styles.btn}>
          <Text style={styles.font}>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
  },
  secondcontainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderRadius: 20,
    borderColor: '#E9E9E9',
  },
  font: {
    fontFamily: '오뮤_다예쁨체',
    fontSize: 24,
    color: '#4949E8',
  },
  btn: {
    backgroundColor: '#FFFFFF', // 버튼 배경색
    paddingVertical: 8,
    paddingHorizontal: 130,
    borderRadius: 20, // 버튼 테두리 둥글기
    borderWidth: 1.4, // 버튼 테두리 두께
    borderColor: '#4949E8', // 버튼 테두리 색상
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 위치
    shadowOpacity: 0.2, // 그림자 투명도
    shadowRadius: 6, // 그림자 둥글기
    elevation: 6, // Android의 그림자 효과
  },
});

export default CalendarModal;
