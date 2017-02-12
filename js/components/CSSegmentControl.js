// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

type Props = {
  children?: any;
  active?: string;
  onPress?: (value: string) => void;
  style: any;
}

class CSSegmentControl extends Component {
  props: Props;

  render() {
    const {children, style, active, onPress} = this.props;

    const separatorStyle = style.height
      ? {height: style.height - style.padding || 0 * 2}
      : null;

    return (
      <View style={[styles.container, style]}>
        {
          children ? children.map((child, i) => {
            if (i < children.length - 1) {
              return (
                <View style={{flex: 1, flexDirection: 'row'}} key={i}>
                  {
                    React.cloneElement(child, {active, onPress})
                  }
                  <View style={[styles.separator, separatorStyle]} />
                </View>
              );
            }
            return (
              <View style={{flex: 1}} key={i}>
                {React.cloneElement(child, {active, onPress})}
              </View>
            );
          }) : null
        }
      </View>
    );
  }
}

const CONTAINER_HIGHT = 60;
const CONTAINER_PADDING = 5;

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HIGHT,
    padding: CONTAINER_PADDING,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#bfcad2'
  },
  separator: {
    width: 1,
    height: CONTAINER_HIGHT - CONTAINER_PADDING * 2,
    backgroundColor: '#CCCCCC'
  }
});

export default CSSegmentControl;
