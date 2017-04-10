import React, { Component } from 'react';
var Parse = require('parse/react-native');
import { Provider } from 'react-redux';
import CouchsurfingApp from './CouchsurfingApp';
import configureStore from './redux/index';
import {parse} from '../server/config';
import {logIn} from './redux/actions';

function setup() {
  Parse.initialize(parse.app_id);
  Parse.serverURL = `${'http://localhost:8080'}/parse`; // TODO Move to config

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

  return Root;
}

export default setup;
