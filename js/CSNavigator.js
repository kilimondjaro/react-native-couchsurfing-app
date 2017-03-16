// @flow
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
import HostsFilterScreen from './tabs/search/host/HostsFilterScreen';
import TravelersFilterScreen from './tabs/search/traveler/TravelersFilterScreen';
import AccountSettingsScreen from './tabs/account/AccountSettingsScreen';
import ProfileScreen from './profile/ProfileScreen';
import ProfileEditorScreen from './profile/ProfileEditorScreen';
import AboutMeEditorScreen from './profile/AboutMeEditorScreen';
import YourHomeEditorScreen from './profile/YourHomeEditorScreen';
import AvailableNightsToHostScreen from './profile/AvailableNightsToHostScreen';
import MaximumGuestsScreen from './profile/MaximumGuestsScreen';
import PreferredGenderScreen from './profile/PreferredGenderScreen';
import SleepingArrangementsScreen from './profile/SleepingArrangementsScreen';

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
          initialRoute={{screen: 'yourHomeEtidor'}}
          renderScene={this.renderScene}
        />
    );
  }

  renderScene(route, navigator) {
    switch (route.screen) {
      case 'enter':
        return <EnterScreen navigator={navigator} />;
      case 'login':
        return <LoginScreen navigator={navigator} />;
      case 'signup':
        return <SignUpScreen navigator={navigator} />;
      case 'signupAdress':
        return <SignUpAdressScreen navigator={navigator} />;
      case 'signupSearch':
        return <SignUpSearchScreen navigator={navigator} />;
      case 'hostsFilter':
        return <HostsFilterScreen navigator={navigator} data={route.data} />;
      case 'travelersFilter':
        return <TravelersFilterScreen navigator={navigator} data={route.data} />;
      case 'accountSettings':
        return <AccountSettingsScreen navigator={navigator} />;
      case 'profile':
        return <ProfileScreen navigator={navigator} />;
      case 'editProfile':
        return <ProfileEditorScreen navigator={navigator} />;
      case 'aboutMeEditor':
        return <AboutMeEditorScreen navigator={navigator} />;
      case 'yourHomeEtidor':
        return <YourHomeEditorScreen navigator={navigator} />;
      case 'availableNightsToHost':
        return <AvailableNightsToHostScreen navigator={navigator} />;
      case 'maximumGuests':
        return <MaximumGuestsScreen navigator={navigator} />;
      case 'preferredGender':
        return <PreferredGenderScreen navigator={navigator} />;
      case 'sleepingArrangements':
        return <SleepingArrangementsScreen navigator={navigator} />;
      default:
        return <TabsView navigator={navigator} />;
    }
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

export default CSNavigator;
