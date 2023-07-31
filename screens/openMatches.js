import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';
import { Picker } from '@react-native-picker/picker';

const OpenMatchesScreen = ({ navigation, route }) => {
  const [ageGroup, setAgeGroup] = useState('');
  const [matches, setMatches] = useState([]);
  const [ageGroups, setAgeGroups] = useState('U-6');
  const { userID } = route.params;
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    if (ageGroup) {
      axios
        .get(`${IP_ADDRESS}:5000/api/matchPost/openMatches`, { params: { ageGroup, userID } })
        .then(response => setMatches(response.data.matchPosts))
        .catch(error => console.error('There was an error!', error));
    }
  }, [ageGroup]);


    const MatchItem = ({ item }) => {
      const [isInterested, setIsInterested] = useState(false);

      const dateObject = new Date(item.date);
      const timeObject = new Date(item.time);

      // Adjust for timezone
      timeObject.setHours(timeObject.getHours() - 1);

      const formattedDate = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const formattedTime = timeObject.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });

      const toggleInterest = () => {
          axios
              .post(`${IP_ADDRESS}:5000/api/matchPost/Interested`, { matchPostID: item._id, userID, isInterested: !isInterested })
              .then(response => {
                  setIsInterested(!isInterested);
              }
              )
              .catch(error => console.error('There was an error!', error));
      };
      useEffect(() => {
        if (item.interested_users.includes(userID)) {
            setIsInterested(true);
        }
    }, [item]);

      return (
          <View style={styles.matchContainer}>
              <Text>{item.pitchName}</Text>
              <Text>{item.pitchLocation}</Text>
              <Text>{formattedDate}</Text>
              <Text>{formattedTime}</Text>
              <Button
                  title={isInterested ? 'Not Interested' : 'Interested'}
                  onPress={toggleInterest}
                  color={isInterested ? 'green' : null}
              />
          </View>
      );
  };

  // ...

  const renderMatch = ({ item }) => <MatchItem item={item} />;

  return (
    <View style={styles.container}>
        <Text>Select age group: </Text>
      <Picker
        selectedValue={ageGroup}
        onValueChange={(itemValue, itemIndex) => setAgeGroup(itemValue)}
        style={styles.picker}
       >
        <Picker.Item label="Under 6" value="U-6" />
        <Picker.Item label="Under 7" value="U-7" />
        <Picker.Item label="Under 8" value="U-8" />
        <Picker.Item label="Under 9" value="U-9" />
        <Picker.Item label="Under 10" value="U-10" />
        <Picker.Item label="Under 11" value="U-11" />
        <Picker.Item label="Under 12" value="U-12" />
        <Picker.Item label="Under 13" value="U-13" />
        <Picker.Item label="Under 14" value="U-14" />
        <Picker.Item label="Under 15" value="U-15" />
        <Picker.Item label="Under 16" value="U-16" />
        <Picker.Item label="Under 17" value="U-17" />
        <Picker.Item label="Under 18" value="U-18" />
      </Picker>

        {
        matches.length > 0 ?
        (
            <FlatList
            data={matches}
            renderItem={renderMatch}
            keyExtractor={item => item._id}
            />
        ) : 
        (
            <Text style={styles.noMatchesText}>No available matches in this age group</Text>
        )
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  
  matchContainer: {
    backgroundColor: '#1fff1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height : 75,
    width : 350,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  picker: {
    height: 50,
    width: 150,
  },

  noMatchesText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default OpenMatchesScreen;
