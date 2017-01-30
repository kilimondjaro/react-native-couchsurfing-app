// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

class CSButton extends Component {
  props: {
    text: string,
    type?: 'round' | 'squared',
    style?: Object,
    active: boolean,
    onPress: () => void
  };

  static defaultProps = {
    active: true
  };

  render() {
    const buttonColor = this.props.active
      ? {backgroundColor: '#2f81b7'}
      : {backgroundColor: '#c6dbe6'};

    return (
        <TouchableOpacity
          disabled={!this.props.active}
          style={[styles.container, this.props.style]}
          accessibilityTraits="button"
          onPress={this.props.onPress}
        >
          <View style={[styles.button, buttonColor]}>
            <Text style={styles.text}>
              {this.props.text}
            </Text>
          </View>
        </TouchableOpacity>
    );
  }
}

const HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: HEIGHT / 2,
    backgroundColor: '#2f81b7'
  },
  text: {
    color: '#f2f2f2',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CSButton;
