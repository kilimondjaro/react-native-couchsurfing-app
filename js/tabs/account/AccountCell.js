// @flow
import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';

type Props = {
  icon: any;
  text: string;
  onPress?: () => void;
};

export default function AccountCell(props: Props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
      <Image source={props.icon} />
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    padding: 10
  },
  text: {
    fontSize: 18
  }
});
