import React, { Component } from 'react';
import {
  Navigator,
  Platform,
  StyleSheet
} from 'react-native';
import TabsView from './tabs/TabsView';
import EnterScreen from './login/EnterScreen';
import LoginScreen from './login/LoginScreen';
import SignUpScreen from './login/SignUpScreen';
import SignUpAdressScreen from './login/SignUpAdressScreen';
import SignUpSearchScreen from './login/SignUpSearchScreen';
import FilterScreen from './tabs/search/FilterScreen';

class CSNavigator extends Component {
  render(){
    return (
        <Navigator
          style={styles.navigator}
          configureScene={(route) => {
            if (Platform.OS === 'android') {
              return Navigator.SceneConfigs.FloatFromBottomAndroid;
            }
            if (route.searchFilter) {
              return Navigator.SceneConfigs.FloatFromBottom;
            }
            return Navigator.SceneConfigs.PushFromRight;
          }}
          initialRoute={{}}
          renderScene={this.renderScene}
        />
    );
  }

  renderScene(route, navigator) {
    if (route.enter) {
      return (
        <EnterScreen
          navigator={navigator}
        />
      );
    }

    if (route.login) {
      return (
        <LoginScreen
          navigator={navigator}
        />
      );
    }

    if (route.signup) {
      return (
        <SignUpScreen
          navigator={navigator}
        />
      );
    }

    if (route.signupAdress) {
      return (
        <SignUpAdressScreen
          navigator={navigator}
        />
      );
    }

    if (route.signupSearch) {
      return (
        <SignUpSearchScreen
          navigator={navigator}
        />
      );
    }

    if (route.searchFilter) {
      return (
        <FilterScreen
          navigator={navigator}
        />
      );
    }

    return <TabsView navigator={navigator} />;
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

export default CSNavigator;
