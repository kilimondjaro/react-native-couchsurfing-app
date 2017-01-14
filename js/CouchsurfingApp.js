import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class CouchsurfingApp extends Component {

  render() {
    return (
      <View style={styles.container}>
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
