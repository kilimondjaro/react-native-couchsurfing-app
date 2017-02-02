// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

type Props = {
  label: string;
  disabled: boolean;
  onPress: () => void;
}

class CalendarCell extends Component {
  props: Props;

  render() {
    const {label, disabled, onPress} = this.props;

    const labelStyle = disabled
      ? { color: '#c7c7c7' } : null;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
        >
          <Text
            style={[styles.label, labelStyle]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    color: '#273c53'
  }
};

export default CalendarCell;
