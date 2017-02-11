// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

type Props = {
  label: string;
  disabled: boolean;
  labelStyle?: any;
  width: number;
  type: string;
  reserved?: boolean;
  onPress?: () => void;
}

class CalendarCell extends Component {
  props: Props;

  static defaultProps = {
    available: true,
    disabled: false
  }

  shouldComponentUpdate(nextProps: Props) {
    if (this.props.reserved === nextProps.reserved) {
      return false;
    }
    return true;
  }

  render() {
    const {label, disabled, onPress, reserved, type} = this.props;

    const labelStyle = disabled
      ? { color: '#c7c7c7' }
      : null;

    const cellStyle = reserved && !disabled
      ? type === 'hosting'
        ? { backgroundColor: '#eaeaea' }
        : null
      : null;

    const touchableHighlightStyle = reserved && !disabled
    ? type === 'search'
      ? { backgroundColor: '#2f81b7' }
      : null
    : null;

    const strikeLineStyle = {
      marginLeft: this.props.width / 4,
      width: this.props.width / 2
    };

    const strikeLine = !disabled && reserved && type === 'hosting'
      ? (<View
        position="absolute"
        style={[styles.strikeLine, strikeLineStyle]}
      />)
      : null;

    return (
      <View style={[styles.container, cellStyle]}>
        {
          strikeLine
        }
        <TouchableHighlight
          style={[styles.cell, touchableHighlightStyle]}
          underlayColor="gray"
          onPress={onPress}
          disabled={disabled}
        >
          <Text
            style={[styles.label, labelStyle, this.props.labelStyle]}
          >
            {label}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    margin: 5
  },
  label: {
    color: '#273c53',
    fontSize: 16
  },
  strikeLine: {
    marginTop: 25,
    height: 1.5,
    backgroundColor: '#6d6e71',
    transform: [
      { rotate: '135deg' }
    ]
  }
};

export default CalendarCell;
