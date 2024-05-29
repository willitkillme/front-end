import React, { useState,useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, BackHandler } from "react-native";
import { TextInput, Button, Chip } from "react-native-paper";
import axios from "axios";
import {router} from "expo-router"

const AddChildScreen = () => {
  const [name, setName] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        router.replace("/profile");
        return true; 
      }
    );

    return () => backHandler.remove(); 
  }, [router]);


  const allergiesList = [
    { key: "lactose", label: "🥛 Lactose" },
    { key: "gluten", label: "🍞 Gluten" },
    { key: "eggs", label: "🥚 Eggs" },
    { key: "soy", label: "🌱 Soy" },
    { key: "fish_and_seafood", label: "🐟 Fish and Seafood" },
  ];

  const handleSave = () => {
    const formattedAllergies = selectedAllergies.map(allergy => ({ name: allergy }));
    axios.post('/set-children/', {
      name: name,
      allergies: formattedAllergies
    })
    .then((response) => {
      console.log(response.data);
      router.replace('/profile');
    })
    .catch((error) => {
      console.log(error);
    })
  };
  

  const toggleAllergy = (allergy) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter(a => a !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Child</Text>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <Text style={styles.label}>Select Allergies:</Text>
      <View style={styles.chipContainer}>
        {allergiesList.map((allergy) => (
          <Chip
            key={allergy.key}
            icon={selectedAllergies.includes(allergy.key) ? "check" : "cancel"}
            mode={selectedAllergies.includes(allergy.key) ? "outlined" : "flat"}
            onPress={() => toggleAllergy(allergy.key)}
            style={styles.chip}
          >
            {allergy.label}
          </Chip>
        ))}
      </View>
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  chip: {
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    width: 150,
  },
});

export default AddChildScreen;
