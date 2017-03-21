// @flow
import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native';

type Props = {
  title: string;
  value?: boolean;
  onPress: () => void;
};

export default function CSCheckCell(props: Props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
      <Text style={styles.titileText}>{props.title}</Text>
      {
        props.value ? (
          <Image
            style={styles.icon}
            source={require('./img/check.png')}
          />
        ) : null
      }
    </TouchableOpacity>
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
  },
  icon: {
    tintColor: '#157df8'
  }
});
