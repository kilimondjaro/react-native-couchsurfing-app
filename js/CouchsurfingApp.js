// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Header from './components/Header';

class CouchsurfingApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          title="App"
          leftItem={{text: 'Back'}}
          rightItem={{icons: [require('./components/img/settings.png')]}}
        />
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default CouchsurfingApp;
