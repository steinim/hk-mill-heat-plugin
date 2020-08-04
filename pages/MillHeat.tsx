import React from 'react';
import { View, Container } from 'native-base';
import MillHeatProvider from '../MillHeatProvider';
import HomeList from '../components/HomeList';
import { StyleSheet } from 'react-native';
import { typography } from 'styles';
import MillHeatLogo from '../assets/MillHeatLogo';

const styles = StyleSheet.create({
  title: {
    ...typography.textLight,
    marginBottom: 20,
  },
});

export const MillHeat = () => {
  return (
    <MillHeatProvider>
      <Container style={{ padding: 20 }}>
        <View>
          <View style={{ marginBottom: 20 }}>
            <MillHeatLogo />
          </View>
          <HomeList />
        </View>
      </Container>
    </MillHeatProvider>
  );
};

export default MillHeat;
