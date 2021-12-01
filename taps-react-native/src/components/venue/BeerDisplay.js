import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { SHADOWS } from '../../styles/shadows';
import { SERVING_TYPES } from './consts';
import leftStar from '../../../assets/filter/left_star.png';
import rightStar from '../../../assets/filter/right_star.png';
import leftStarFilled from '../../../assets/filter/left_star_filled.png';
import rightStarFilled from '../../../assets/filter/right_star_filled.png';
import TruncatingText from '../widgets/TruncatingText';

const BeerDisplay = ({ beersAvailable }) => {
  const [servingTypeVisible, setServingTypeVisible] = React.useState(Object.keys(SERVING_TYPES)[0]);

  const renderStars = (rating) => {
    return (
      <View style={styles.starContainer}>
        {
          new Array(5).fill(0).map((num, index) => (
            <View style={styles.starContainer}
              key={`star-${index}`}>
              <Image
                source={index <= rating ? leftStarFilled : leftStar}
                style={styles.star} />
              <Image
                source={index < Math.floor(rating) ? rightStarFilled : rightStar}
                style={styles.star} />
            </View>
          ))
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {Object.keys(SERVING_TYPES).map(type => {
          const selectedColor = {
            border: { borderBottomColor: servingTypeVisible === type ? COLORS.purple : COLORS.gray },
            color: { color: servingTypeVisible === type ? COLORS.purple : COLORS.gray },
            tint: { tintColor: servingTypeVisible === type ? COLORS.purple : COLORS.gray },
          }
          return (
            <TouchableOpacity
              style={[styles.headerPadding, selectedColor.border]}
              onPress={() => setServingTypeVisible(type)}
              activeOpacity={1}
              key={type}>
              <View style={styles.headerButton}>
                <Image source={SERVING_TYPES[type]} style={[styles.headerImage, selectedColor.tint]} />
                <Text style={[styles.headerText, selectedColor.color]}>{type === "" ? 'Other' : type}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      {beersAvailable.map((beer, index) => {
        const { servingType, name, abv,
          ibu, gloablRatingScore, type } = beer;
        return (
          <View key={name + '-' + index}>
            {servingType === servingTypeVisible &&
              <TouchableOpacity
                style={styles.beerTextContainer}
                activeOpacity={1}
                onPress={() => beer.untappdWebsite && Linking.openURL(beer.untappdWebsite)}>
                <View>
                  <TruncatingText text={name} style={styles.beerText} max={30}/>
                  <Text style={styles.type}>
                    {type}
                  </Text>
                </View>
                <View style={styles.abvIbuContainer}>
                  <View style={styles.starContainer}>
                    {renderStars(gloablRatingScore)}
                  </View>
                  <Text style={styles.abv}>{abv}% abv</Text>
                  <Text style={styles.ibu}>{ibu === 0 ? 'No' : ibu} ibu</Text>
                </View>
              </TouchableOpacity>
            }
          </View>
        )
      })}
      {
        beersAvailable.filter((beer) => beer.servingType === servingTypeVisible).length === 0 &&
        <Text style={styles.errorText}>
          No beers found with the serving type of {servingTypeVisible === "" ? 'Other' : servingTypeVisible}
        </Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...SHADOWS.container,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  headerPadding: {
    width: '20%',
    borderBottomWidth: 2,
    paddingBottom: 2,
    paddingTop: 5,
  },
  headerButton: {
    alignItems: 'center'
  },
  headerImage: {
    width: 25,
    height: 25,
  },
  headerText: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 20,
    fontFamily: 'open-sans',
    color: COLORS.gray
  },
  beerTextContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.transgray,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  beerText: {
    fontSize: 15,
    fontFamily: 'open-sans-semi',
  },
  type: {
    fontFamily: 'open-sans-italic',
    color: COLORS.gray,
  },
  abv: {
    fontFamily: 'open-sans'
  },
  ibu: {
    fontFamily: 'open-sans'
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    width: 7,
    height: 14,
    resizeMode: 'center',
    tintColor: COLORS.gold
  },
  abvIbuContainer: {
    alignItems: 'flex-end'
  }
});

export default BeerDisplay;