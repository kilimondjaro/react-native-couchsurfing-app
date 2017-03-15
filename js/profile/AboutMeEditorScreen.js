// @flow
import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import {CSHeader} from '../components/CSHeader';
import CSInputList from '../components/CSInputList';
import CSTextInput from '../components/CSTextInput';
import CSSettingCell from '../components/CSSettingCell';
import CSSwitchCell from '../components/CSSwitchCell';

type Props = {
  account: {
    [name: string]: any;
  }
};

export default class AboutMeEditorScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val: '',
      children: false
    }
  }

  static defaultProps = {
    account: {
      interests: []
    }
  }

  render() {
    const {account} = this.props;

    return (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            icon: require('../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          title="About Me"
        />
        <CSInputList
          style={[styles.inputList, {marginTop: 20}]}
        >
          <CSTextInput
            multiline={true}
            placeholder="About Me"
            onChangeText={(text) => this.setState({val: text})}
            value={this.state.val}
          />
          <CSTextInput
            multiline={true}
            placeholder="One Amazing Thing I've Done"
            onChangeText={(text) => this.setState({val: text})}
            value={''}
          />
          <CSTextInput
            multiline={true}
            placeholder="Music, Movies & Books"
            onChangeText={(text) => this.setState({val: text})}
            value={''}
          />
          <CSTextInput
            multiline={true}
            placeholder="Teach, Learn, Share"
            onChangeText={(text) => this.setState({val: text})}
            value={''}
          />
          <CSTextInput
            multiline={true}
            placeholder="Why I'm on Couchsurfing"
            onChangeText={(text) => this.setState({val: text})}
            value={''}
          />
          <CSTextInput
            multiline={true}
            placeholder="What I Can Share With Hosts"
            onChangeText={(text) => this.setState({val: text})}
            value={''}
          />
          <CSTextInput
            multiline={true}
            placeholder="My Interests"
            onChangeText={(text) => this.setState({val: text})}
            value={''}
          />
          <CSSettingCell
            title="Interests"
            value={account.interests.length > 0 ? account.interests.length : 'None'}
            showIcon={false}
            onPress={() => {}}
          />
          <CSSwitchCell
            title="I have children"
            onChange={() => this.setState({ children: !this.state.children })}
            value={this.state.children}
          />
          <CSSwitchCell
            title="I have pets"
            onChange={() => {}}
            value={false}
          />
          <CSSwitchCell
            title="I'm a smoker"
            onChange={() => {}}
            value={false}
          />
        </CSInputList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf1f2'
  },
  inputList: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC'
  }
});
