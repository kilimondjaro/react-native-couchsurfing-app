// @flow
import React, {Component} from 'react';
import {
  Animated,
  DatePickerIOS,
  StyleSheet
} from 'react-native';

type Props = {
  visible: boolean;
  height?: number;
  date: Date;
  onDateChange: (date: Date) => void;
};

class CSDatePickerIOS extends Component {
  props: Props;
  state: {
    height: number;
    visible: boolean;
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      height: new Animated.Value(0),
      visible: true
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.visible) {
      Animated.timing(
         this.state.height,
         {toValue: 240}
       ).start();
    }
    else {
      Animated.timing(
         this.state.height,
         {toValue: 0}
       ).start(() => {
         this.setState({visible: true});
       });
    }
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <Animated.View
        style={[styles.container, {height: this.state.height}]}
      >
        <DatePickerIOS
         date={this.props.date}
         mode="date"
         onDateChange={this.props.onDateChange}
       />
     </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 240
  }
});

export default CSDatePickerIOS;
