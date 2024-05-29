import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Appbar, Text, Card, Chip } from "react-native-paper";

const allergiesList = [
  { key: "lactose", label: "🥛 Lactose" },
  { key: "gluten", label: "🍞 Gluten" },
  { key: "eggs", label: "🥚 Eggs" },
  { key: "soy", label: "🌱 Soy" },
  { key: "fish_and_seafood", label: "🐟 Fish and Seafood" },
];

const ResultComp = ({ name, allergen_matches, child }) => {
  const getAllergyLabel = (key) => {
    const allergy = allergiesList.find((item) => item.key === key);
    return allergy ? allergy.label : `⚠️ ${key.replace(/_/g, " ")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {!child ? "Your allergies:" : `${name}'s allergies:`}
      </Text>
      {allergen_matches && allergen_matches.length > 0 ? (
        <View style={styles.chipContainer}>
          {allergen_matches.map((allergy, index) => (
            <Chip
              key={index}
              style={styles.allergyChip}
              textStyle={styles.allergyChipText}
            >
              {getAllergyLabel(allergy)}
            </Chip>
          ))}
        </View>
      ) : (
        <Text style={styles.safeText}>
          {!child ? "It's safe for you!" : `It's safe for ${name}!`}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  header: {
    fontSize: 18, 
    marginBottom: 8, 
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  allergyChip: {
    margin: 4,
  },
  allergyChipText: {
    fontSize: 14,
  },
  safeText: {
    fontStyle: "italic",
    fontSize: 14,
    color: "green",
  },
});

export default ResultComp;
