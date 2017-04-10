// @flow
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {monthNames, capitalizeFirstLetter} from '../helpers';
import {connect} from 'react-redux';

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

function getAge(birthday){
  const now = new Date();
  const diff = now.getTime() - birthday.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

type Props = {
  account: {
    [name: string]: any;
  }
};

function AboutView(props: Props) {
  const {
    experience,
    languagesImFluentIn,
    location,
    gender,
    birthday,
    createdAt,
    friends,
    interestsDescription,
    interests,
    countriesIveVisited,
    countriesIveLivedIn,
    groups
  } = props.account;

  const hostedCount = experience.hosted.length;
  const stayedWithCount = experience.stayedWith.length;
  const wouldSurfAgainCount = experience.hosted
    .filter(ref => ref.star === true).length;
  const wouldHostAgainCount = experience.stayedWith
    .filter(ref => ref.star === true).length;

  const lngImFluentIn = Object.keys(languagesImFluentIn)
    .filter(key => languagesImFluentIn[key] === true);

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
        icon={require('../components/img/gender.png')}
        text={`${gender[0].toUpperCase()}, ${getAge(birthday)}`}
      />
      <TextWithIcon
        icon={require('../components/img/geopoint.png')}
        text={`Member since ${monthNames[createdAt.getMonth()]} ${createdAt.getFullYear()}`}
      />
      <TextWithIcon
        icon={require('../components/img/geopoint.png')}
        text={`${friends.length > 0 ? friends.length : 'No'} Couchsurfing Friends`}
      />
      {
        lngImFluentIn.length > 0 ? (
          <TextWithIcon
            icon={require('../components/img/speaks.png')}
            text={`Fluent in ${lngImFluentIn.map(name => `${name[0].toUpperCase()}${name.slice(1)}`).join(', ')}`}
          />
        ) : null
      }
      {
        location ? (
          <TextWithIcon
            icon={require('../components/img/geopoint.png')}
            text={`From ${location.description}`}
          />
        ) : null
      }

      <Text style={[styles.title, styles.item]}>{'Interests'.toUpperCase()}</Text>
      <Text style={[styles.key, styles.item]}>{interestsDescription}</Text>
      <View style={[styles.interestBubbleArea ,styles.item]}>
      {
        interests.map(interest => <InterestBubble key={interest} text={interest} />)
      }
      </View>

      {
        countriesIveVisited ? (
          <View>
            <Text style={[styles.title, styles.item]}>{'Countries I\'ve Visited'.toUpperCase()}</Text>
            <Text style={[styles.key, styles.item]}>
              {
                Object.keys(countriesIveVisited)
                  .filter(key => countriesIveVisited[key] === true)
                  .map(countries => capitalizeFirstLetter(countries))
                  .join(', ')
              }
            </Text>
          </View>
        ) : null
      }

      {
        countriesIveLivedIn ? (
          <View>
            <Text style={[styles.title, styles.item]}>{'Countries I\'ve Lived In'.toUpperCase()}</Text>
            <Text style={[styles.key, styles.item]}>
              {
                Object.keys(countriesIveLivedIn)
                  .filter(key => countriesIveLivedIn[key] === true)
                  .map(countries => capitalizeFirstLetter(countries))
                  .join(', ')
              }
            </Text>
          </View>
        ) : null
      }

      {
        groups ? (
          <View>
            <Text style={[styles.title, styles.item]}>{'Groups'.toUpperCase()}</Text>
            <Text style={[styles.key, styles.item]}>{groups.join(', ')}</Text>
          </View>
        ) : null
      }

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

export default AboutView;
