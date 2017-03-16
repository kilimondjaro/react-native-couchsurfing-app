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
  title: string;
  onPress?: () => void;
};

export default function CSIconCell(props: Props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
      <Image source={props.icon} />
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
    padding: 10
  },
  title: {
    fontSize: 16
  }
});
