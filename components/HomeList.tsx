import React, { useState, useEffect } from 'react';
import { Text, ListItem, View } from 'native-base';
import { MillHeatContext, useMillHeat } from '../MillHeatProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { typography } from '../../../src/styles';
import variable from '../../../native-base-theme/variables/material';

export const HomeList = () => {

  const { homes, setHomes, isLoggedIn } = useMillHeat();
  const [shouldRefresh, setShouldRefresh] = useState(0);
  const [fetching, setShouldFetch] = useState(false);

  const homesList = [
    {id: 1, Name: 'Lunavegen 6'},
    {id: 2, Name: 'Skjoldastraumsvegen 492'},
    {id: 3, Name: 'Trondheimsveien 6 A'},
  ];

  const fetchHomes = async () => {
    setHomes(homesList);
    setShouldFetch(true);
    setTimeout(function () {
      console.log('Fetching homes...');
      setShouldFetch(false);
  }, 2000);
  };

  const onRefresh = () => {
    // Increment number just to trigger a refresh
    const increment = shouldRefresh + 1;
    setShouldRefresh(increment);
    fetchHomes();
  };

  useEffect(() => {
    if (isLoggedIn() !== undefined || isLoggedIn()) {
      fetchHomes();
    }
  }, []);

  const styles = StyleSheet.create({
    loading: {
      justifyContent: 'center',
      alignSelf: 'center',
    },
    textLarge: {
      fontSize: 18,
    },
    textSmall: {
      fontSize: 16,
      fontWeight: 'normal',
    },
    header: {
      paddingTop: 20,
    },
    scrollview: {
      paddingBottom: 160,
    },
    icon: {
      color: variable.kraftCyan,
      fontSize: 16,
      marginLeft: -2,
      marginRight: 10,
      marginTop: 4,
    },
  });

  return (
    <MillHeatContext.Consumer>
      {() => (
        <View>
          {fetching &&
          <View style={styles.loading}>
            <Text>{'\n'}</Text>
            <ActivityIndicator size = "large" color = {variable.kraftCyan}/>
            <Text>{'\n'}Henter dine hjem...</Text>
          </View>
          }
          {!fetching && homes() && homes().length > 0 &&
          <View>
          <Text style={[typography.textBold, styles.textLarge, styles.header]}>Dine hjem</Text>
          <ScrollView contentContainerStyle={styles.scrollview}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} tintColor="transparent" colors={[ 'transparent' ]}/>
            }
          >
            {homes().map((item, key) => (
                  <ListItem key={key} accessibilityLabel={item.id + ' item'}>
                    <Icon name="home" style={styles.icon} /><Text style={[typography.textLight, styles.textSmall]}>{item.Name}</Text>
                  </ListItem>
                ))}
          </ScrollView>
          </View>
          }
        </View>
      )}
    </MillHeatContext.Consumer>
  );
};

export default HomeList;
