// @flow
import React from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet
} from 'react-native';

type Props = {
  title: string;
  value?: string;
  onPress: () => void;
};

export default function SettingCell(props: Props) {
  return (
    <TouchableHighlight
      underlayColor="#d9d9d9"
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <Text style={styles.birthdayCellText}>{props.title}</Text>
        <View style={styles.nextBlock}>
          <Text style={styles.birthdayCellText}>
            {props.value}
          </Text>
          <Image
            style={styles.nextIcon}
            source={require('../../components/img/next.png')}
          />
        </View>
      </View>
    </TouchableHighlight>
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
  nextBlock: {
    flexDirection: 'row'
  },
  nextIcon: {
    marginLeft: 10,
    tintColor: '#c7c7c7'
  }
});
