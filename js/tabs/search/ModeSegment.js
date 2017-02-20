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
  active: boolean;
}

export default function ModeSegment(props: Props) {
  const {icon, text, value, onPress, active} = props;
  const isActive = active === value;

  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image source={props.icon} />
      <Text style={isActive ? {color: '#2f81b7'} : null}>{text}</Text>
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
