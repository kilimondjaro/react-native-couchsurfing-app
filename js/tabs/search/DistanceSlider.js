// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  Slider,
  StyleSheet
} from 'react-native';

const distanceArr = [5, 10, 15, 25, 50];

type Props = {
  value: number;
  onChange: (value: number) => void;
}

type State = {
  sliderValue: number;
}

class DistanceSlider extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      sliderValue: props.value
    };
  }

  onSlidingComplete(value: number) {
    this.setState({sliderValue: distanceArr[value]});
    this.props.onChange(distanceArr[value]);
  }

  render() {
    return (
      <View style={styles.container}>
        <Slider
          maximumValue={4}
          minimumValue={0}
          minimumTrackTintColor={'#bdc8d0'}
          maximumTrackTintColor={'#bdc8d0'}
          step={1}
          value={distanceArr.indexOf(this.props.value)}
          onSlidingComplete={(value) => this.onSlidingComplete(value)}
        />
        <View style={styles.labelsContainer}>
          {
            distanceArr.map(val => {
              var textStyle;
              if (this.state.sliderValue === val) {
                textStyle = {color: '#2f81b7'};
              }

              return (
                <Text style={[styles.text, textStyle]} key={val}>{`${val}km`}</Text>
              );
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#bfcad2'
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: '#bfcad1'
  }
});

export default DistanceSlider;
