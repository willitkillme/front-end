import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Chip, Button, TextInput } from "react-native-paper";
import axios from "axios";
import { router } from "expo-router";

const allergiesList = [
  { key: "lactose", label: "🥛 Lactose" },
  { key: "gluten", label: "🍞 Gluten" },
  { key: "eggs", label: "🥚 Eggs" },
  { key: "soy", label: "🌱 Soy" },
  { key: "fish_and_seafood", label: "🐟 Fish and Seafood" },
];

const AllergiesComp = ({ username, allergies, child, id = null }) => {
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [childName, setChildName] = useState(username || "");

  useEffect(() => {
    const allergyNames = allergies.map((allergy) => allergy.name);
    setSelectedAllergies(allergyNames);
  }, [allergies]);

  const toggleAllergy = (allergyKey) => {
    setSelectedAllergies((prevSelected) =>
      prevSelected.includes(allergyKey)
        ? prevSelected.filter((key) => key !== allergyKey)
        : [...prevSelected, allergyKey]
    );
  };

  const handleSave = () => {
    const payload = {
      new_name: childName,
      allergies: selectedAllergies,
    };

    const url = child
      ? `/children/${id}/set_allergies/`
      : "/set_allergies/";

    axios
      .put(url, payload)
      .then((response) => {
        console.log("Data saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`/delete-children/${id}`)
      .then(() => {
        router.replace("/profile");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server error:", error.response.data);
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Request setup error:", error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      {child ? (
        <>
          <Text style={styles.title}>Select {childName}'s Allergies</Text>
          <TextInput
            label="Child's Name"
            value={childName}
            onChangeText={setChildName}
            style={styles.input}
          />
        </>
      ) : (
        <Text style={styles.title}>Select Your Allergies</Text>
      )}
      <View style={styles.chipContainer}>
        {allergiesList.map((allergy) => (
          <Chip
            key={allergy.key}
            style={styles.chip}
            icon={selectedAllergies.includes(allergy.key) ? "check" : "cancel"}
            mode={selectedAllergies.includes(allergy.key) ? "outlined" : "flat"}
            selected={selectedAllergies.includes(allergy.key)}
            onPress={() => toggleAllergy(allergy.key)}
          >
            {allergy.label}
          </Chip>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save
        </Button>
        {child && (
          <Button
            mode="contained"
            onPress={handleDelete}
            style={[styles.button, { backgroundColor: "red", color: "white" }]}
          >
            Delete Child
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chip: {
    margin: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 20,
  },
});

export default AllergiesComp;
