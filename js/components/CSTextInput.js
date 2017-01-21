// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';

type Props = {
  placeholder?: string;
  value: string;
}

class CSTextInput extends Component {
  props: Props;
  state: {
    onFocus: bool;
  };

  static defaultProps = {
    value: ''
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      onFocus: false
    };

    this.onFocus.bind(this);
    this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({onFocus: true});
  }

  onBlur() {
    this.setState({onFocus: false});
  }

  inputIsEmpty() {
    if (this.props.value.length === 0) {
      return true;
    }
    return false;
  }

  render() {
    const containerStyle = this.inputIsEmpty()
      ? {justifyContent: 'center'}
      : null;

    const textStyle = this.state.onFocus
      ? {color: '#0070b1'}
      : null;

    const inputStyle = !this.inputIsEmpty()
      ? {marginBottom: 5}
      : null;

    return (
      <View style={[styles.container, containerStyle]}>
        {
          this.props.value.length > 0
          ? (<Text style={[styles.label, textStyle]}>{this.props.placeholder}</Text>)
          : null
        }
        <TextInput
          style={[styles.textInput, inputStyle]}
          {...this.props}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  textInput: {
    paddingLeft: 20,
    height: 20,
    color: 'black'
  },
  label: {
    fontSize: 10,
    paddingLeft: 20
  }
});

export default CSTextInput;
