import React, { useContext, useMemo, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

const MillHeatContext = React.createContext({ });

interface Props {
  children?: any;
}

export const MillHeatProvider = (props: Props) => {
  const [homeState, setHomeState] = useState([]);

  const homes = () => {
    return homeState;
  };

  const setHomes = (temps) => {
    const _storeData = async (c) => {
      try {
        await AsyncStorage.setItem('homeState', JSON.stringify(c));
      } catch (error) {
        console.log('save error', error);
      }
    };
    _storeData(temps);
    setHomeState(temps);
  };

  useEffect(() => {
    const loadHomes = async () => {
      const data = await AsyncStorage.getItem('homeState');
      if (!!data) {
        const tmps = JSON.parse(data);
        setHomes(tmps);
      }
    };
    loadHomes();
  }, []);

  const value = useMemo(() => {
    return {
      homes,
      setHomes,
    };
  }, [homeState ]);

  return (
    <MillHeatContext.Provider value={value}>
      {props.children}
    </MillHeatContext.Provider>
  );
};

const useMillHeat: any = () => useContext(MillHeatContext);
export { MillHeatContext, useMillHeat };
export default MillHeatProvider;
