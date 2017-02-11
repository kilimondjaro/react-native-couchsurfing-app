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
      >
        <TabBarIOS.Item
          icon={require('./img/hosting.png')}
          selected={this.props.tab === 'hosting'}
          onPress={() => this.onTabPress('hosting')}
        >
          <HostingScreen />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={require('./img/search.png')}
          selected={this.props.tab === 'search'}
          onPress={() => this.onTabPress('search')}>
        <SearchScreen />
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
