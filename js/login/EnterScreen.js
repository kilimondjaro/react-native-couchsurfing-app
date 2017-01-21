// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Navigator
} from 'react-native';

class EnterScreen extends Component {
  props: {
    navigator: Navigator
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonArea}>
          <Button
            onPress={() => this.props.navigator.push({login: true})}
            title="Log in"
            color="white"
          />
          <Button
            onPress={() => this.props.navigator.push({signup: true})}
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

export default EnterScreen;
//
// <Header
//           title="App"
//           leftItem={{text: 'Back'}}
//           rightItem={{icons: [require('./components/img/settings.png')]}}
//         />
