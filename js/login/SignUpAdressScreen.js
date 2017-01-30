// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {CSHeader} from '../components/CSHeader';
import CSTextInputList from '../components/CSTextInputList';
import CSButton from '../components/CSButton';

class SignUpAdressScreen extends Component {
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
        <CSTextInputList>
          <TouchableOpacity
            style={styles.segment}
            onPress={() => this.props.navigator.push({signupSearch: true})}
          >
            <Text style={{fontSize: 16}}>City or Address</Text>
          </TouchableOpacity>
        </CSTextInputList>
        <CSButton
          style={styles.button}
          text="Create Account"
          active={false}
          onPress={() => null}
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  }
});

export default SignUpAdressScreen;
