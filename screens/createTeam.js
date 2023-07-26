import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {styles} from '../components/styles.js'
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';

function CreateTeam({ route, navigation }) {
  const [teamName, setTeamName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState("1");
  const [kitColor, setKitColor] = useState('');
  const [loading, setLoading] = useState(false);
  const { token, userID } = route.params;

  const validateForm = () => {
    if (teamName.trim() === '' || ageGroup.trim() === '' || proficiencyLevel.trim() === '' || kitColor.trim() === '') {
        Alert.alert('Validation Error', 'All fields are required');
        return false;
        }
        
        return true;
    };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const team = {
      teamName,
      ageGroup,
      proficiencyLevel,
      kitColor,
      coachID: userID,
    };
    
    axios
      .post(`${IP_ADDRESS}:5000/api/teams`, team)
        .then((response) => {
            setLoading(false);
            if (response.data.status === 'success') {
                Alert.alert('Success', 'Team created successfully');
                navigation.navigate('Home', { token, userID});
            } else {
                Alert.alert('Error', 'Something went wrong!');
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error('There was an error!', error);
            Alert.alert('Error', 'Something went wrong! Please try again later.');
        });
    };
        

  return (
    <View style={styles.containerCreateTeam}>
      <Text>Team Name:</Text>
      <TextInput style={styles.inputCreateTeam} value={teamName} onChangeText={setTeamName} />

      <Text>Age Group:</Text>
      <TextInput style={styles.inputCreateTeam} value={ageGroup} onChangeText={setAgeGroup} />

      <Text>Proficiency Level:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={proficiencyLevel}
          onValueChange={(itemValue, itemIndex) =>
            setProficiencyLevel(itemValue)
          }>
          <Picker.Item label="1 - lowest" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5 - highest" value="5" />
        </Picker>
      </View>

      <Text>Kit Colours:</Text>
      <TextInput style={styles.inputCreateTeam} value={kitColor} onChangeText={setKitColor} />

      <Button title="Create Team" onPress={handleSubmit} disabled={loading}/>
    </View>
  );
}

export default CreateTeam;
