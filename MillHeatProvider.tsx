import React, { useContext, useMemo, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const MillHeatContext = React.createContext({ });

interface Props {
  children?: any;
}

export interface Authorization {
  authorization_code?: string;
}

export interface Token {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
}

export const MillHeatProvider = (props: Props) => {
  const [authorization, setAuthorization] = useState({} as Authorization);
  const [token, setToken] = useState({} as Token);
  const [homeState, setHomeState] = useState([]);

  const getAuthorization = async () => {

    const params = new URLSearchParams();
    params.append('access_key', '<secret>');
    params.append('secret_token', '<secret>');

    return await axios
      .post(`https://api.millheat.com/share/applyAuthCode`, params, {
        headers: {
          'Content-Type': '*/*',
        },
      })
      .then((e) => {
        setAuthorization(e.data);
        AsyncStorage.setItem('millheat-authorization', JSON.stringify(e.data));
        return e.data;
      })
      .catch((err) => console.log('error', err));
  };

  const authorizationCode = () => {
    return authorization.authorization_code;
  };

  const getToken = async () => {

    const params = new URLSearchParams();
    params.append('authorization_code', authorizationCode());

    return await axios
      .post(`https://api.millheat.com/share/applyAccessToken?password=<secret>&username=<secret>`, params, {
        headers: {
          'Content-Type': '*/*',
        },
      })
      .then((e) => {
        setToken(e.data);
        AsyncStorage.setItem('millheat-access-token', JSON.stringify(e.data));
        return e.data;
      })
      .catch((err) => console.log('error', err));
  };

  const accessToken = () => {
    return token.access_token;
  };

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
    getAuthorization();
    const loadAuthorization = async () => {
      const data = await AsyncStorage.getItem('millheat-authorization');
      if (!!data) {
        const aut = JSON.parse(data) as Authorization;
        setAuthorization(aut);
      }
    };
    loadAuthorization();

    getToken();
    const loadToken = async () => {
      const data = await AsyncStorage.getItem('millheat-token');
      if (!!data) {
        const tkn = JSON.parse(data) as Token;
        setToken(tkn);
      }
    };
    loadToken();

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
      accessToken,
      authorizationCode,
      homes,
      setHomes,
    };
  }, [accessToken, authorizationCode, homeState ]);

  return (
    <MillHeatContext.Provider value={value}>
      {props.children}
    </MillHeatContext.Provider>
  );
};

const useMillHeat: any = () => useContext(MillHeatContext);
export { MillHeatContext, useMillHeat };
export default MillHeatProvider;
