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
  showIcon?: boolean;
  onPress: () => void;
};

export default function CSSettingCell(props: Props) {
  return (
    <TouchableHighlight
      underlayColor="#d9d9d9"
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <Text style={styles.titileText}>{props.title}</Text>
        <View style={styles.nextBlock}>
          <Text style={styles.valueText}>
            {props.value}
          </Text>
          {
            props.showIcon ? (
              <Image
                style={styles.nextIcon}
                source={require('./img/next.png')}
              />
            ) : null
          }
        </View>
      </View>
    </TouchableHighlight>
  );
}

CSSettingCell.defaultProps = {
  showIcon: true
};

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
    alignItems: 'center',
    flexDirection: 'row'
  },
  nextIcon: {
    marginLeft: 10,
    tintColor: '#c7c7c7'
  },
  titileText: {
    fontSize: 16
  },
  valueText: {
    fontSize: 16,
    color: '#3482b5'
  }
});
