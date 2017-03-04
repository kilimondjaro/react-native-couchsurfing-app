// @flow
import React from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

type Props = {
  value: number;
  onPress: (value: number) => void;
};

export default function GuestsCountPicker(props: Props) {
  const count = 15;
  var valuesArray = [];

  for (let i = 1; i <= count; i++) {
    valuesArray.push(i);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} horizontal>
        {valuesArray.map(val => {
          const cellStyle = props.value === val ? {backgroundColor: '#2f81b7'} : null;
          const cellTextStyle = props.value === val ? {color: 'white'} : {color: '#bfcad1'};

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={val}
              style={[styles.cell, cellStyle]}
              onPress={() => props.onPress(val)}
            >
              <Text style={[{fontSize: 18}, cellTextStyle]}>{val}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#bfcad2'
  },
  scrollView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cell: {
    height: 40,
    width: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
