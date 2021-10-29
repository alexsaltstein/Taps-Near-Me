import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Logo from '../widgets/Logo';
import filter from '../../../assets/navigation/adjust-alt.png';
import settings from '../../../assets/navigation/settings.png';
import map from '../../../assets/navigation/map.png'
import NavIcons from '../widgets/NavIcons';
import setStatusBarColor from '../utils/StatusBarColorFunctions';
import { COLORS } from '../../styles/COLORS';

const HomeScreen = ({ navigation }) => {
  const [setColor] = setStatusBarColor();

  React.useEffect(() => {
    navigation.addListener(
      'focus',
      () => {
        setColor(COLORS.white);
      },
    );
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <View style={styles.buttonsContainer}>
          {
            [{ icon: filter, to: 'Filter' },
            { icon: settings, to: 'Settings' }, 
            { icon: map, to: 'Map'}].map(i => (
              <NavIcons
                key={i.to}
                source={i.icon}
                to={i.to}
                navigation={navigation} />
            ))
          }
        </View>
      </View>
      <Text>How to Use Taps Near Me</Text>
      <Text>1. Click on the Filter Icon</Text>
      <Text>2. Choose your desired search flter</Text>
      <Text>ABV Range: How strong do you want your beer to be?</Text>
      <Text>IBU Range: How bitter do you want your beer to be?</Text>
      <Text>Style: What type do you want your beer to be?</Text>
      <Text>Minimum Global Rating: How good do you want your beer to be?</Text>
      <Text>Distance: How far do you want your beer to be?</Text>
      <Text>3. Save your search flter</Text>
      <Text>4. Click on the Map Icon</Text>
      <Text>5. Find where the taps are near you!</Text>
      <Text>No taps found? No problem! Just refine your search until taps are found.</Text>
      <Text>There are currently over 150 beers available!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
export default HomeScreen;