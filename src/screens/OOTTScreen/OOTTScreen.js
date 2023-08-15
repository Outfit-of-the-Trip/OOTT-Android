import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const OOTTScreen = () => {
  const [selected, setSelected] = useState('');

  return (
    <View>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
          console.log(selected);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default OOTTScreen;
