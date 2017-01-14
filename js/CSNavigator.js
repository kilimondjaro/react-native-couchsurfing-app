import React, { Component } from 'react';
import {
  Navigator,
  Platform,
  StyleSheet
} from 'react-native';
import TabsView from './tabs/TabsView';

class CSNavigator extends Component {
  render(){
    return (
        <Navigator
          style={styles.navigator}
          configureScene={(route) => {
            if (Platform.OS === 'android') {
              return Navigator.SceneConfigs.FloatFromBottomAndroid;
            }
            return Navigator.SceneConfigs.FloatFromBottom;
          }}
          initialRoute={{}}
          renderScene={this.renderScene}
        />
    );
  }

  renderScene() {
    return <TabsView navigator={navigator} />;
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

export default CSNavigator;
