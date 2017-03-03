// @flow
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

type Props = {
  icon: any;
  text: string;
  value: string;
  onPress: (value: string) => void;
  active: boolean | {[x: string]: boolean};
}

export default function ModeSegment(props: Props) {
  const {icon, text, value, onPress, active} = props;
  const isActive = typeof active === 'object'
    ? active[value]
    : active === value;

  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image style={isActive ? {tintColor: '#2f81b7'} : null} source={icon} />
      <Text style={isActive ? {color: '#2f81b7'} : {color: '#bfcad2'}}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
