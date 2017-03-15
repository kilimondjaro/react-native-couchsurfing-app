// @flow
import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet
} from 'react-native';

type Props = {
  title: string;
  value?: boolean;
  onChange: () => void;
};

export default function SwitchCell(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titileText}>{props.title}</Text>
      <Switch
        onValueChange={props.onChange}
        value={props.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 10
  },
  titileText: {
    fontSize: 16
  }
});
