import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Chip, Button } from "react-native-paper";
import axios from "axios";
import {router} from "expo-router";
const allergiesList = [
  { key: "lactose", label: "🥛 Lactose" },
  { key: "gluten", label: "🍞 Gluten" },
  { key: "eggs", label: "🥚 Eggs" },
  { key: "soy", label: "🌱 Soy" },
  { key: "fish_and_seafood", label: "🐟 Fish and Seafood" },
];

const AllergiesComp = ({ username, allergies, child, id = null }) => {
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  useEffect(() => {
    const allergyNames = allergies.map((allergy) => allergy.name);
    setSelectedAllergies(allergyNames);
  }, []);

  const toggleAllergy = (allergyKey) => {
    setSelectedAllergies((prevSelected) =>
      prevSelected.includes(allergyKey)
        ? prevSelected.filter((key) => key !== allergyKey)
        : [...prevSelected, allergyKey]
    );
  };

  const handleSave = () => {
    if (!child) {
      axios
        .put("/set_allergies/", { allergies: selectedAllergies })
        .then((response) => {
          console.log("Allergies saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving allergies:", error);
        });
    } else {
      axios
        .put("/children/" + id + "/set_allergies/", {
          allergies: selectedAllergies,
        })
        .then((response) => {
          console.log("Allergies saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving allergies:", error);
        });
    }
  };

  const handleDelete = () => {
    axios
      .delete("/delete-children/"+id)
      .then(() => {
        router.replace("/profile");
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // other than 2xx. Handle server errors here.
          console.error("Server error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response from server:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Request setup error:", error.message);
        }
      });
  };
  

  return (
    <View style={styles.container}>
      {!child ? (
        <>
          <Text style={styles.title}>Select Your Allergies</Text>
        </>
      ) : (
        <Text style={styles.title}>Select {username}'s Allergies</Text>
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
        {child &&

        <Button
          mode="contained"
          onPress={handleDelete}
          style={[styles.button, { backgroundColor: "red", color: "white" }]}
        >
          Delete Child
        </Button>
        }
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Adjusted to 'flex-start'
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
