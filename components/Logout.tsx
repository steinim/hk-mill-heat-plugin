import React from 'react';
import { Text, View, Button } from 'native-base';
import { MillHeatContext, useMillHeat } from '../MillHeatProvider';

export const Logout = () => {
  const { handleLogout, isLoggedIn } = useMillHeat();
  const logout = () => {
    handleLogout();
  };
  return (
    <MillHeatContext.Consumer>
      {() => (
        <View>
          {isLoggedIn() && (
            <View>
              <Button onPress={logout}>
                <Text>Logg ut</Text>
              </Button>
            </View>
          )}
        </View>
      )}
    </MillHeatContext.Consumer>
  );
};

export default Logout;