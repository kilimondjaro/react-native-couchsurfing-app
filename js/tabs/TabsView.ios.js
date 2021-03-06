import React, {Component} from 'react';
import {
  TabBarIOS,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import type {Tab} from '../redux/reducers/navigation';
import {switchTab} from '../redux/actions';
import HostingScreen from './hosting/HostingScreen';
import SearchScreen from './search/SearchScreen';
import AccountScreen from './account/AccountScreen';
import DashboardScreen from './dashboard/DashboardScreen';
import MessagesScreen from './messages/MessagesScreen';

class TabsView extends Component {
  props: {
    navigator: Navigator,
    tab: Tab,
    switchTab: (tab: Tab) => void;
  };

  constructor(props) {
    super(props);

    this.onTabPress.bind(this);
  }

  onTabPress(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.switchTab(tab);
    }
  }

  render() {
    return (
      <TabBarIOS
        tintColor="#eb6648"
        style={{overflow: 'hidden'}}
      >
        <TabBarIOS.Item
          icon={require('./img/dashboard.png')}
          title="Dashboard"
          selected={this.props.tab === 'dashboard'}
          onPress={() => this.onTabPress('dashboard')}
        >
          <DashboardScreen
            navigator={this.props.navigator}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Hosting"
          icon={require('./img/hosting.png')}
          selected={this.props.tab === 'hosting'}
          onPress={() => this.onTabPress('hosting')}
        >
          <HostingScreen
            navigator={this.props.navigator}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./img/search.png')}
          title="Search"
          selected={this.props.tab === 'search'}
          onPress={() => this.onTabPress('search')}>
        <SearchScreen
          navigator={this.props.navigator}
        />
      </TabBarIOS.Item>
      <TabBarIOS.Item
        icon={require('./img/messages.png')}
        title="Messages"
        selected={this.props.tab === 'messages'}
        onPress={() => this.onTabPress('messages')}>
      <MessagesScreen
        navigator={this.props.navigator}
      />
    </TabBarIOS.Item>
      <TabBarIOS.Item
        icon={require('./img/account.png')}
        title="Account"
        selected={this.props.tab === 'account'}
        onPress={() => this.onTabPress('account')}>
      <AccountScreen
        navigator={this.props.navigator}
      />
    </TabBarIOS.Item>
    </TabBarIOS>
    );
  }
}

function mapStateToProps(state) {
  return {
    tab: state.navigation.tab
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchTab: (tab) => dispatch(switchTab(tab))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsView);
