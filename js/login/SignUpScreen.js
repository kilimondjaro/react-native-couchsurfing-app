// @flow
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
import {connect} from 'react-redux';
import CSTextInputList from '../components/CSTextInputList';
import CSTextInput from '../components/CSTextInput';
import {CSHeader} from '../components/CSHeader';
import CSDatePickerIOS from '../components/CSDatePickerIOS';
import {signupUpdate} from '../redux/actions/signup';

const genderTypes = ['Male', 'Female', 'Other'];

type Props = {
  navigator: Navigator;
  signupData: {
    firtname: string;
    lastname: string;
    email: string;
    password: string;
    gender: string;
    birthday: Date;
  };
  dispatch: (action: any) => void;
};

class LoginScreen extends Component {
  props: Props;
  state: {
    datePickerIsVisible: boolean;
    showBirthday: boolean;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      datePickerIsVisible: false,
      showBirthday: false
    };
  }

  onChangeField(data: string | Date, field: string) {
    this.props.dispatch(signupUpdate({[field]: data}));
    this.setState({[field]: data});
  }

  _onScroll() {
    if (this.state.datePickerIsVisible) {
      this.setState({datePickerIsVisible: false});
    }
  }

  _onDatepicker() {
    this.setState({datePickerIsVisible: true});
    this.setState({showBirthday: true});
  }

  render() {
    const {
      firtname,
      lastname,
      email,
      password,
      gender,
      birthday
    } = this.props.signupData;

    return (
      <View style={styles.container}>
        <CSHeader
          leftItem={[{
            icon: require('../components/img/back.png'),
            onPress: () => this.props.navigator.pop()
          }]}
          rightItem={[{
            text: 'Next',
            onPress: () => {
              this.props.navigator.push({signupAdress: true});
            }
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
              onChangeText={(text) => this.onChangeField(text, 'firtname')}
              value={firtname}
            />
            <CSTextInput
              placeholder="Last name"
              onChangeText={(text) => this.onChangeField(text, 'lastname')}
              value={lastname}
            />
          </CSTextInputList>
          <CSTextInputList
            style={{marginTop: 50}}
          >
            <CSTextInput
              placeholder="Email"
              onChangeText={(text) => this.onChangeField(text, 'email')}
              value={email}
            />
            <CSTextInput
              placeholder="Password"
              onChangeText={(text) => this.onChangeField(text, 'password')}
              value={password}
              secureTextEntry
            />
          </CSTextInputList>
          <CSTextInputList
            style={{marginTop: 50}}
          >
            <SegmentedControlIOS
              style={styles.segment}
              values={genderTypes}
              selectedIndex={genderTypes.indexOf(gender)}
              onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                this.onChangeField(genderTypes[index], 'gender');
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
              <Text style={{fontSize: 18}}>
                {
                  this.state.showBirthday ? birthday.toDateString() : null
                }
              </Text>
            </TouchableOpacity>
          </CSTextInputList>
        </ScrollView>
        <CSDatePickerIOS
          visible={this.state.datePickerIsVisible}
          date={birthday}
          onDateChange={(date) => this.onChangeField(date, 'birthday')}
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
});

export default connect(
  (state) => ({signupData: state.signup})
)(LoginScreen);
