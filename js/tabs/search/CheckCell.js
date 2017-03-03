// @flow
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

type Props = {
  checked: boolean;
  text: string;
  style?: any;
  onPress: (value: string) => void;
};

export default function CheckCell(props: Props) {
  const sourse = props.checked
    ? require('./img/checked.png')
    : require('./img/plus.png');

  return (
    <TouchableHighlight
      underlayColor="#d9d9d9"
      onPress={props.onPress}
    >
      <View
        style={[styles.container, props.style]}
      >
        <Text style={styles.text}>{props.text}</Text>
        <Image source={sourse} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: '#000030'
  }
});
