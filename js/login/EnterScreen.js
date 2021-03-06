// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import {signupReset} from '../redux/actions/signup';

class EnterScreen extends Component {
  props: {
    navigator: Navigator;
    dispatch: (action: any) => void;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonArea}>
          <Button
            onPress={() => this.props.navigator.push({screen: 'login'})}
            title="Log in"
            color="white"
          />
          <Button
            onPress={() => {
              this.props.dispatch(signupReset());
              this.props.navigator.push({screen: 'signup'});
            }}
            title="Sign Up"
            color="white"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  buttonArea: {
    marginBottom: 30
  }
});

export default connect()(EnterScreen);
