import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Chip, Button } from 'react-native-paper';
import axios from 'axios';

const allergiesList = [
  { key: 'lactose', label: '🥛 Lactose' },
  { key: 'gluten', label: '🍞 Gluten' },
  { key: 'eggs', label: '🥚 Eggs' },
  { key: 'soy', label: '🌱 Soy' },
  { key: 'fish_and_seafood', label: '🐟 Fish and Seafood' },
];

const ProfileScreen = () => {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/profile/')
      .then(response => {
        setSelectedAllergies(response.data.allergies);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching allergies:', error);
        setIsLoading(false);
      });
  }, []);

  const toggleAllergy = (allergyKey) => {
    setSelectedAllergies((prevSelected) =>
      prevSelected.includes(allergyKey)
        ? prevSelected.filter((key) => key !== allergyKey)
        : [...prevSelected, allergyKey]
    );
  };

  const handleSave = () => {
    axios.put('/set_allergies/', { allergies: selectedAllergies })
      .then(response => {
        console.log('Allergies saved:', response.data);
      })
      .catch(error => {
        console.error('Error saving allergies:', error);
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Allergies</Text>
      <View style={styles.chipContainer}>
        {allergiesList.map((allergy) => (
          <Chip
            key={allergy.key}
            style={styles.chip}
            selected={selectedAllergies.includes(allergy.key)}
            onPress={() => toggleAllergy(allergy.key)}
          >
            {allergy.label}
          </Chip>
        ))}
      </View>
      <Button mode="contained" onPress={handleSave}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    margin: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
