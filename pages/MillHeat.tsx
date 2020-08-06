import React from 'react';
import { View, Container } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import MillHeatProvider from '../MillHeatProvider';
import HomeList from '../components/HomeList';
import variable from '../../../native-base-theme/variables/material';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logo: {
    width: 110,
    height: 50,
  },
});

export const MillHeat = () => {
  const logo = require ('../assets/MillHeatLogo.png');
  return (
    <MillHeatProvider>
      <Container>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo}/>
          <View style={{ borderBottomColor: variable.kraftCyan, borderBottomWidth: 1, paddingTop: 10}}
/>
          <HomeList />
        </View>
      </Container>
    </MillHeatProvider>
  );
};

export default MillHeat;
