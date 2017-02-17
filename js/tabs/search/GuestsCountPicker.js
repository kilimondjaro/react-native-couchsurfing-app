// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

type Props = {
  value: number;
  onPress: (value: number) => void;
};

export default function GuestsCountPicker(props: Props) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6].map(val => {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#bfcad2'
  },
  cell: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
