// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Navigator
} from 'react-native';
import {connect} from 'react-redux';
import {CSHeader} from '../components/CSHeader';
import CSInputList from '../components/CSInputList';
import CSButton from '../components/CSButton';
import {signUp} from '../redux/actions';

type Props = {
  navigator: Navigator;
  location: string;
};


class SignUpAdressScreen extends Component {
  props: Props;
  render() {
    return (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            icon: require('../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          title="where do you live?"
        />
        <CSInputList>
          <TouchableOpacity
            style={styles.segment}
            onPress={() => this.props.navigator.push({screen: 'signupSearch'})}
          >
            <Text style={{fontSize: 16}}>City or Address</Text>
            <Text style={{fontSize: 16}}>{this.props.location}</Text>
          </TouchableOpacity>
        </CSInputList>
        <CSButton
          style={styles.button}
          text="Create Account"
          active={!!this.props.location}
          onPress={() => {
            this.props.dispatch(signUp(this.props.signUpData))
              .then(() =>  this.props.navigator.push({screen: 'tabs'}));
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf1f2'
  },
  button: {
    margin: 20
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  }
});

export default connect(
  (state) => ({location: state.signup.location.description, signUpData: state.signup})
)(SignUpAdressScreen);
