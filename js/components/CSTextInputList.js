import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ListView
} from 'react-native';

class CSTextInputList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.children)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
        scrollEnabled={false}
        dataSource={this.state.dataSource}
        renderRow={(rowData, _, id) => (<View key={id}>{rowData}</View>)}
        renderSeparator={(_, id) =>
          parseInt(id) < this.props.children.length - 1
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
    borderTopColor: '#CCCCCC'
  },
  separator: {
    marginLeft: 20,
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});

export default CSTextInputList;
