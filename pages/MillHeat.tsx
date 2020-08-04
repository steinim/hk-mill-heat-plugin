import React from 'react';
import { Container } from 'native-base';
import MillHeatProvider from '../MillHeatProvider';
import HomeList from '../components/HomeList';

export const MillHeat = () => {
  return (
    <MillHeatProvider>
      <Container style={{ padding: 20 }}>
        <HomeList />
      </Container>
    </MillHeatProvider>
  );
};

export default MillHeat;
