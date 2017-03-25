// @flow
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

type Props = {
  completion: number;
}

export default function ProfileProgressBar(props: Props) {
  const leftSideFlex = {flex: props.completion};
  const rightSideFlex = {flex: 1 - props.completion};

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.leftSide, leftSideFlex]}/>
        <View style={[styles.rightSide, rightSideFlex]}/>
        <View style={styles.absoluteTextContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.progressText}>
              {`Your profile is ${props.completion * 100}.0% complete`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const HEIGHT = 50;
const PADDING = 10;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    padding: PADDING,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressBarContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  absoluteTextContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: HEIGHT - 2 * PADDING
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressText: {
    fontSize: 16,
    color: 'white'
  },
  leftSide: {
    flex: 1,
    backgroundColor: '#47b769',
    borderTopLeftRadius: (HEIGHT - 2 * PADDING) / 2,
    borderBottomLeftRadius: (HEIGHT - 2 * PADDING) / 2
  },
  rightSide: {
    flex: 1,
    backgroundColor: '#aaaaaa',
    borderTopRightRadius: (HEIGHT - 2 * PADDING) / 2,
    borderBottomRightRadius: (HEIGHT - 2 * PADDING) / 2
  }
});
