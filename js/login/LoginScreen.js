// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Navigator
} from 'react-native';
import CSTextInputList from '../components/CSTextInputList';
import CSTextInput from '../components/CSTextInput';
import CSButton from '../components/CSButton';
import {CSHeader} from '../components/CSHeader';

type Props = {
  navigator: Navigator;
};

class LoginScreen extends Component {
  props: Props;
  state: {
    username: string;
    password: string;
    buttonActive: bool;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      buttonActive: false
    };
  }

  _isButtonActive() {
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      return true;
    }
    return false;
  }

  onChangeText(text: string, field: string) {
    this.setState({[field]: text});
  }

  render() {
    const isButtonActive = this._isButtonActive();
    return (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            icon: require('../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          style={styles.header}
          title="log in"
        />
        <CSTextInputList>
          <CSTextInput
            placeholder="Email or username"
            onChangeText={(text) => this.onChangeText(text, 'username')}
            value={this.state.username}
          />
          <CSTextInput
            placeholder="Password"
            onChangeText={(text) => this.onChangeText(text, 'password')}
            value={this.state.password}
            secureTextEntry
          />
        </CSTextInputList>
          <CSButton
            style={styles.button}
            text="Log in"
            active={isButtonActive}
            onPress={() => this.props.navigator.push({tabs: true})}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf1f2'
  },
  textInput: {
    paddingLeft: 20,
    height: 30
  },
  header: {
    backgroundColor: '#f5f7f7'
  },
  button: {
    margin: 20
  }
});

export default LoginScreen;
