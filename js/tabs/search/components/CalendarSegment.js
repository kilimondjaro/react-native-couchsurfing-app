// @flow
import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

type Props = {
  title: string;
  date: string;
  value?: string;
  onPress?: (value: string) => void;
}

export default function CalendarSegment(props: Props) {
  const {title, date, onPress} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date || '-'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16
  },
  date: {
    color: '#006faf'
  }
});
