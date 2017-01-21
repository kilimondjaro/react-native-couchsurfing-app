import React, {Component} from 'react';
import {
  Animated,
  DatePickerIOS,
  StyleSheet
} from 'react-native';

class CSDatePickerIOS extends Component {
  props: {
    visible: bool,
    height?: number,
    date: Date,
    onDateChange: () => Date
  };

  constructor(props) {
    super(props);

    this.state = {
      height: new Animated.Value(0),
      visible: true
    };
  }

  componentWillReceiveProps(nextProps) {
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
