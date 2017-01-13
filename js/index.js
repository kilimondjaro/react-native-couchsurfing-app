import React, { Component } from 'react';
import { Provider } from 'react-redux';
import CouchsurfingApp from './CouchsurfingApp';
import configureStore from './redux/index';

class Root extends Component {
  state: {
    isLoading: boolean;
    store: any;
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }
  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <CouchsurfingApp />
      </Provider>
    );
  }
}

export default Root;
