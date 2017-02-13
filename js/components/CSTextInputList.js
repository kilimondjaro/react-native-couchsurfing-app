// @flow
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ListView
} from 'react-native';

type Props = {
  style?: any;
  children?: any;
  separatorStyle?: any;
};

class CSTextInputList extends Component {
  props: Props;
  state: {
    length: number;
    dataSource: ListView.DataSource;
  };

  constructor(props: Props) {
    super(props);

    const dataSource = this.getDataSource(props);
    this.state = {
      length: dataSource.length,
      dataSource: dataSource.dataSource
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState(this.getDataSource(nextProps));
  }

  getDataSource(props: Props) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const childrenArray = [].concat(props.children);
    return {
      dataSource: ds.cloneWithRows(childrenArray),
      length: childrenArray.length
    };
  }

  render() {
    const {separatorStyle} = this.props || null;
    const separator = (id) => Number(id) < this.state.length - 1
      ? (<View key={id} style={[styles.separator, separatorStyle]} />)
      : null;


    return (
      <View style={[this.state.length ? styles.container : null, this.props.style]}>
        <ListView
          enableEmptySections
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          dataSource={this.state.dataSource}
          renderRow={(rowData, _, id) => (<View key={id}>{rowData}</View>)}
          renderSeparator={(_, id) => separator(id)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: 'white'
  },
  separator: {
    marginLeft: 20,
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});

export default CSTextInputList;
