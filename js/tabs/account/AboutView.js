// @flow
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {monthNames} from '../../helpers';

const template = {
  aboutMe: 'About Me',
  teachLearnShare: 'Teach, Learn, Share',
  oneAmazingThingIveDone: 'One Amazing Thing I\'ve Done',
  musicMoviesBooks: 'Music, Movies & Books',
  whyImOnCouchsurfing: 'Why I\'m On Couchsurfing',
  whatIcanShareWithHosts: 'What I Can Offer Hosts',
};


function TextWithIcon(props) {
  return (
    <View style={[styles.textWithIconContainer, styles.item]}>
      <Image style={{marginRight: 20}} source={props.icon}/>
      <View style={styles.cellsRightSide}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );
}

function InterestBubble(props) {
  return (
    <View style={styles.interestBubble}>
      <Text style={styles.interestBubbleText}>{props.text}</Text>
    </View>
  );
}

export default function AboutView(props) {
  const {account} = props;

  const hostedCount = account.experience.hosted.length;
  const stayedWithCount = account.experience.stayedWith.length;
  const wouldSurfAgainCount = account.experience.hosted
    .filter(ref => ref.star === true).length;
  const wouldHostAgainCount = account.experience.stayedWith
    .filter(ref => ref.star === true).length;

  var hosted, stayedWith;
  if (hostedCount > 0) {
    hosted = (
      <View style={styles.item}>
        <Text style={styles.text}>{`I\'ve hosted ${hostedCount} surfer${hostedCount > 1 ? 's' : ''}`}</Text>
        <View style={styles.wouldStayAgainContainer}>
          <Image style={{marginRight: 5, tintColor: '#47b769'}} source={require('./img/star.png')} />
          <Text style={styles.starredText}>{`${wouldSurfAgainCount} would surf with me again`}</Text>
        </View>
      </View>
    );
  }

  if (stayedWithCount > 0) {
    stayedWith = (
      <View style={styles.item}>
        <Text style={styles.text}>{`I\'ve stayed with ${stayedWithCount} host${stayedWithCount > 1 ? 's' : ''}`}</Text>
        <View style={styles.wouldStayAgainContainer}>
          <Image style={{marginRight: 5, tintColor: '#47b769'}} source={require('./img/star.png')} />
          <Text style={styles.starredText}>{`${wouldHostAgainCount} would host me again`}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{'Experience'.toUpperCase()}</Text>
        {
          !hosted && !stayedWith ? (
            <Text>I haven't hosted or surfed yet.</Text>
          ) : null
        }
        {
          hosted
        }
        {
          stayedWith
        }
      </View>

      <Text style={[styles.title, styles.item]}>{'Overview'.toUpperCase()}</Text>
      <TextWithIcon
        icon={require('../../components/img/gender.png')}
        text={`${account.gender[0].toUpperCase()}, ${account.age}`}
      />
      <TextWithIcon
        icon={require('../../components/img/geopoint.png')}
        text={`Member since ${monthNames[account.createdAt.getMonth()]} ${account.createdAt.getFullYear()}`}
      />
      <TextWithIcon
        icon={require('../../components/img/geopoint.png')}
        text={`${account.friends.length > 0 ? account.friends.length : 'No'} Couchsurfing Friends`}
      />
      {
        account.languagesImFluentIn ? (
          <TextWithIcon
            icon={require('../../components/img/speaks.png')}
            text={`Fluent in ${account.languagesImFluentIn.join(', ')}`}
          />
        ) : null
      }
      {
        account.location ? (
          <TextWithIcon
            icon={require('../../components/img/geopoint.png')}
            text={`From ${account.location}`}
          />
        ) : null
      }

      <Text style={[styles.title, styles.item]}>{'Interests'.toUpperCase()}</Text>
      <Text style={[styles.key, styles.item]}>{account.interestsDescription}</Text>
      <View style={[styles.interestBubbleArea ,styles.item]}>
      {
        account.interests.map(interest => <InterestBubble key={interest} text={interest} />)
      }
      </View>

      <Text style={[styles.title, styles.item]}>{'Countries I\'ve Visited'.toUpperCase()}</Text>
      <Text style={[styles.key, styles.item]}>{account.countriesIveVisited.join(', ')}</Text>

      <Text style={[styles.title, styles.item]}>{'Countries I\'ve Lived In'.toUpperCase()}</Text>
      <Text style={[styles.key, styles.item]}>{account.countriesIveLivedIn.join(', ')}</Text>

      <Text style={[styles.title, styles.item]}>{'Groups'.toUpperCase()}</Text>
      <Text style={[styles.key, styles.item]}>{account.groups.join(', ')}</Text>

      <View>
        {
          Object.keys(template).map(key => {
            const value = props.account[key];
            if (!value) {
              return null;
            }

            return (
              <View key={key}>
                <Text style={[styles.title, styles.item]}>{`${template[key]}`.toUpperCase()}</Text>
                <Text style={[styles.key, styles.item]}>{value}</Text>
              </View>
            );
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  preferencesGroup: {
    marginTop: 8,
    marginBottom: 8
  },
  item: {
    marginTop: 8,
    marginBottom: 8
  },
  lineContainer: {
    marginTop: 10
  },
  title: {
    color: '#eb6547',
    fontWeight: 'bold'
  },
  text: {
    color: '#002042'
  },
  starredText: {
    color: '#47b769'
  },
  wouldStayAgainContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textWithIconContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  interestBubble: {
    height: 25,
    padding: 10,
    borderRadius: 25 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginBottom: 5,
    marginRight: 5,
  },
  interestBubbleText: {
    color: '#929eac',
    fontWeight: 'bold'
  },
  interestBubbleArea: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
});
