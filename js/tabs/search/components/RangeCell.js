// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import CheckCell from './CheckCell';

type Props = {
  text: string;
  values: Array<{label: string, value: string}> | Array<string>;
  selected: {[name: string]: boolean} | string;
  multipleChoice: boolean;
  onPress: (value: string) => void;
}

type State = {
  pressed: boolean;
}

class RangeCell extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      pressed: false
    };
  }

  static defaultProps = {
    multipleChoice: true
  }

  onCheckCellPress(value: string) {
    if (!this.props.multipleChoice) {
      this.setState({pressed: false});
    }
    this.props.onPress(value);
  }

  render() {
    const {text, values, selected, multipleChoice} = this.props;
    const {pressed} = this.state;

    var valueText = '';

    if (!pressed) {
      valueText = multipleChoice
        ? values.reduce((res, cur) => selected[cur.value]
            ? res.concat([cur.label])
            : res.concat([]), [])
          .join(', ') || 'Any'
        : selected;
    }

    return (
      <View>
        <TouchableHighlight
          underlayColor="#d9d9d9"
          onPress={() => this.setState({pressed: !pressed})}
        >
          <View
            style={styles.container}
          >
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.valueText}>{valueText}</Text>
          </View>
        </TouchableHighlight>
        {
          pressed ? values.map((val, i) => (
            <CheckCell
              key={i}
              style={{backgroundColor: '#f8f8f8'}}
              checked={multipleChoice ? selected[val.value] : selected === val}
              onPress={() => this.onCheckCellPress(multipleChoice ? val.value : val)}
              text={multipleChoice ? val.label : val}
            />
          )) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: '#000030'
  },
  valueText: {
    color: '#2f81b7'
  }
});

export default RangeCell;
