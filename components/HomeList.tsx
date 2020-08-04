import React, { useState, useEffect } from 'react';
import { Text, ListItem, Icon, View } from 'native-base';
import { MillHeatContext, useMillHeat } from '../MillHeatProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import axios from 'axios';

export const TemperatureList = () => {
  const { accessToken, homes } = useMillHeat();
  const [shouldRefresh, setShouldRefresh] = useState(0);
  const [fetching, setShouldFetch] = useState(false);

  const fetchHomes = async () => {
    let token = accessToken();
    if (!token) {
      return;
    }
    setShouldFetch(true);
    let fetchUrl = 'https://api.millheat.com/uds/selectHomeList';
    console.log('Fetching homes from', fetchUrl);

    return '[{id: 1, Name: "Soverom"}, {id: 2, Name: "Stue" }, {id: 3, Name: "Bad" }]';

/*     axios
      .get(fetchUrl, {
        headers: {
          authorization_code: `${token}`,
          accept: `application/json`,
        },
      })
      .then((e) => {
        console.log(e.data);
        setShouldFetch(false);
      })
      .catch((err) => {
        console.log('error fetching homes', err);
      }); */
  };
  const onRefresh = () => {
    // Increment number just to trigger a refresh
    const increment = shouldRefresh + 1;
    setShouldRefresh(increment);
    fetchHomes();
  };

  useEffect(() => {
      fetchHomes();
  }, []);

  const styles = StyleSheet.create({
    loading: {
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

  return (
    <MillHeatContext.Consumer>
      {() => (
        <View>
          {fetching &&
          <View style={styles.loading}>
            <Text>{'\n'}</Text>
            <ActivityIndicator size = "large" color = "#008cc2"/>
            <Text>{'\n'}Henter dine hjem...</Text>
          </View>
          }
          {!fetching &&
          <ScrollView contentContainerStyle={{paddingBottom: 160}}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
          >
            {homes() &&
              homes().length > 0 &&
              homes()
                .map((item, key) => (
                  <ListItem key={key} accessibilityLabel={item.id + ' item'}>
                    <Text refresh={shouldRefresh} {...item}></Text>
                    <Text style={{ fontWeight: 'bold' }}>{item.Name}</Text>
                  </ListItem>
                ))}
          </ScrollView>
        }
        </View>
      )}
    </MillHeatContext.Consumer>
  );
};

export default HomeList;
