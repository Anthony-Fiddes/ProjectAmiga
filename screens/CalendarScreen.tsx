import * as React from 'react';
import { StyleSheet, ScrollView} from 'react-native';

import { Text, View } from '../components/Themed';
import Clock from "../components/Clock";
import Calendar from "../components/Calendar";
import Slider from '@react-native-community/slider';

export default function CalendarScreen() {
  return (
    <ScrollView>
      <Text style={styles.todayStyle}>Today</Text>
      <Clock/>
      <View style={{ 
          backgroundColor: "#6699CC", 
          padding: "10, 10, 10, 10",
          borderRadius:10,
          marginLeft: 10, 
          marginRight: 10,
          }}>
        <Text style={styles.questionStyle}>How are you feeling today?</Text>
        <Slider
          style={{
            height: 40,
            marginLeft: 30,
            marginRight: 30
          }}
          minimumValue={0}
          maximumValue={4}
          minimumTrackTintColor="#464D77"
          maximumTrackTintColor="white"
          step={1}
        />
        <View style={styles.textCon}>
                    <Text style={styles.textStyle}>Terrible</Text>
                    <Text style={styles.textStyle}>Neutral</Text>
                    <Text style={styles.textStyle}>Great</Text>
                </View>
      </View>
      <Calendar/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  textCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },

  todayStyle:{
    color: '#464D77',
    fontSize: 75,
    fontWeight: 'bold',
    fontFamily: 'HindSiliguri_700Bold',
    paddingTop: 20,
    marginLeft: 10
  },

  textStyle:{
    color: 'white',
    fontSize: 20,
    marginLeft: 10
  },

  questionStyle:{
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center'
  }
});
