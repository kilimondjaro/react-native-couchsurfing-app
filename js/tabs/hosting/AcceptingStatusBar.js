// @flow
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {setSurferStatus} from '../../redux/actions';
import type {Dispatch} from '../../redux/actions/types';
import {statusMap} from '../../helpers';

type Props = {
  account: {
    [name: string]: any;
  };
  style?: any;
  dispatch: Dispatch;
};

class AcceptingStatusBar extends Component {
  props: Props;
  state: {
    showList: boolean;
    loading: boolean;
  };

  constructor(props) {
    super(props);

    this.state = {
      showList: false,
      loading: false
    };
  }

  onStatusCellPress(status: string) {
    this.setState({loading: true, showList: false});
    this.props.dispatch(setSurferStatus(status))
      .then(() => this.setState({loading: false}));
  }

  render() {
    const {showList, loading} = this.state;
    const {account} = this.props;
    const {label, color} = statusMap[account.status];

    return (
      <View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => this.setState({showList: !showList})}
          activeOpacity={0.6}
          style={[styles.container, this.props.style]}
        >
          <Text style={[styles.barLabel,  {color}]}>{label}</Text>
          {
            loading
              ? (<ActivityIndicator animating />)
              : (<Image source={require('./img/dropdown.png')}/>)
          }
        </TouchableOpacity>
        {
          showList ?
            Object.keys(statusMap).map((curStatus, i) => (
              <TouchableHighlight
                key={i}
                style={styles.listCell}
                underlayColor="#d9d9d9"
                onPress={() => this.onStatusCellPress(curStatus)}
              >
                <View style={styles.listCellContent}>
                  <Text style={styles.listLabel}>{statusMap[curStatus].label}</Text>
                  {
                    account.status === curStatus
                      ? (<Image source={require('./img/accept.png')}/>)
                      : null
                  }
                </View>
              </TouchableHighlight>
            )) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: '#bfcad2',
    backgroundColor: 'white'
  },
  barLabel: {
    color: '#bfcad1',
    fontSize: 18
  },
  listLabel: {
    color: '#273c53',
    fontSize: 16
  },
  listCell: {
    height: 50,
    padding: 20,
    marginLeft: 10,
    marginRight: 10
  },
  listCellContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default connect(
  (state) => ({
    account: state.account
  })
)(AcceptingStatusBar);
