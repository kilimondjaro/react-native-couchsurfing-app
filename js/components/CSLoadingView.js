// @flow
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

function CSLoadingView() {
  return (
    <View style={styles.container}>
      <Image source={require('./img/logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CSLoadingView;
