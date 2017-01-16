import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ListView
} from 'react-native';

class CSTextInputList extends Component {
  constructor(props) {
    super(props);

    const dataSource = this.getDataSource(props);
    this.state = {
      length: dataSource.length,
      dataSource: dataSource.dataSource
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getDataSource(nextProps));
  }

  getDataSource(props) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const childrenArray = [].concat(props.children);
    return {
      dataSource: ds.cloneWithRows(childrenArray),
      length: childrenArray.length
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          scrollEnabled={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData, _, id) => (<View key={id}>{rowData}</View>)}
          renderSeparator={(_, id) =>
            parseInt(id, 10) < this.state.length - 1
              ? (<View key={id} style={styles.separator} />)
              : null
          }
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
