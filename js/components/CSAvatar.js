// @flow
import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

type Props = {
  image: any;
  firstLine?: string;
  secondLine?: string;
  style: any;
  verified?: boolean;
  children?: any;
}

export default function CSAvatar(props: Props) {
  return (
    <View style={props.style}>
      <Image style={styles.image} source={props.image} />
      <View style={styles.absoluteContainer}>
        <View style={styles.textArea}>
          <View style={styles.firstLineContainer}>
            <Text style={styles.firstLine}>{props.firstLine}</Text>
            {
              props.verified
                ?  (
                  <Image
                    source={require('./img/verified.png')}
                  />
                ) : null
            }
          </View>
          <Text style={styles.secondLine}>{props.secondLine}</Text>
        </View>
        <View style={styles.absoluteChildrenContainer}>
          <View style={styles.childrenContainer}>
            {
              props.children
            }
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  absoluteContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  textArea: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10
  },
  firstLineContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  firstLine: {
    color: 'white',
    fontSize: 20,
    marginRight: 5
  },
  secondLine: {
    color: 'white',
    fontSize: 18
  },
  absoluteChildrenContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  childrenContainer: {
    flex: 1
  }
});
