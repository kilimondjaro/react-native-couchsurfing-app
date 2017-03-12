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
    onFocus: boolean;
    height: number;
  };

  static defaultProps = {
    value: ''
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      onFocus: false,
      height: 0
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

    // Multiline size hook
    var containerSize, textInputSize;
    if (this.props.multiline) {
      containerSize = {height: null};
      textInputSize = this.props.value.length > 0
        ? {height: this.state.height}
        : {height: 30}
    }

    return (
      <View style={[styles.container, containerStyle, containerSize]}>
        <Text style={[styles.label, textStyle]}>{ this.props.value.length > 0 ? this.props.placeholder : ''}</Text>
        <TextInput
          spellCheck={false}
          autoCorrect={false}
          style={[styles.textInput, inputStyle, textInputSize]}
          {...this.props}
          onChange={(event) => {
            if (this.props.multiline) {
              this.setState({height: event.nativeEvent.contentSize.height});
            }
          }}
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
    color: 'black',
    fontSize: 16
  },
  label: {
    fontSize: 12,
    paddingLeft: 20
  }
});

export default CSTextInput;
