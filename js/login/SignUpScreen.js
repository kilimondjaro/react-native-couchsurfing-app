import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Navigator,
  SegmentedControlIOS,
  TouchableOpacity,
  Text
} from 'react-native';
import CSTextInputList from '../components/CSTextInputList';
import CSTextInput from '../components/CSTextInput';
import CSHeader from '../components/Header';
import CSDatePickerIOS from '../components/CSDatePickerIOS';

const gender = ['Male', 'Female', 'Other'];

class LoginScreen extends Component {
  props: {
    navigator: Navigator
  };

  constructor(props) {
    super(props);

    this.state = {
      firtname: '',
      lastname: '',
      email: '',
      password: '',
      gender: '',
      birthday: new Date(),
      selectedIndex: 0,
      datePickerIsVisible: false,
    };
  }

  onChangeText(text, field) {
    this.setState({[field]: text});
  }

  _onScroll() {
    if (this.state.datePickerIsVisible) {
      this.setState({datePickerIsVisible: false});
    }
  }

  _onDatepicker() {
    this.setState({datePickerIsVisible: true});
  }

  render() {
    return (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            icon: require('../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          rightItem={[{
            text: 'Next',
            onPress: () => this.props.navigator.push({signupAdress: true})
          }]}
          style={styles.header}
          title="sign up"
        />
        <ScrollView
          keyboardDismissMode="on-drag"
          onScroll={() => this._onScroll()}
        >
          <CSTextInputList>
            <CSTextInput
              placeholder="First name"
              onChangeText={(text) => this.onChangeText(text, 'firtname')}
              value={this.state.firtname}
            />
            <CSTextInput
              placeholder="Last name"
              onChangeText={(text) => this.onChangeText(text, 'lastname')}
              value={this.state.lastname}
            />
          </CSTextInputList>
          <CSTextInputList
            style={{marginTop: 50}}
          >
            <CSTextInput
              placeholder="Email"
              onChangeText={(text) => this.onChangeText(text, 'email')}
              value={this.state.email}
            />
            <CSTextInput
              placeholder="Password"
              onChangeText={(text) => this.onChangeText(text, 'password')}
              value={this.state.password}
              secureTextEntry
            />
          </CSTextInputList>
          <CSTextInputList
            style={{marginTop: 50}}
          >
            <SegmentedControlIOS
              style={styles.segment}
              values={gender}
              selectedIndex={this.state.selectedIndex}
              onChange={(event) => {
                this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
              }}
            />
          </CSTextInputList>
          <CSTextInputList
            style={{marginTop: 50, marginBottom: 300}}
          >
            <TouchableOpacity
              style={styles.segment}
              onPress={() => this._onDatepicker()}
            >
              <Text style={{fontSize: 18}}>Birthday</Text>
            </TouchableOpacity>
          </CSTextInputList>
        </ScrollView>
        <CSDatePickerIOS
          visible={this.state.datePickerIsVisible}
          date={this.state.birthday}
          onDateChange={(date) => this.setState({birthday: date})}
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
  textInput: {
    paddingLeft: 20,
    height: 30
  },
  header: {
    backgroundColor: '#f5f7f7'
  },
  segmentContainer: {
    marginTop: 30,
    height: 45,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  segment: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
});

export default LoginScreen;
