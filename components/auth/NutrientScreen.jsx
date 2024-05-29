import React from 'react';
import { Button, Appbar, Text, Card, Chip } from "react-native-paper";
import { View } from "react-native";

const NutrientScreen = ({ product_data, nutrients }) => {
  return (
    <View>
      <Text style={{ marginBottom: 8 }}>Ingredients:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {product_data[0].map((ingredient, index) => (
          <Chip key={index} style={{ marginRight: 8, marginBottom: 8 }}>{ingredient}</Chip>
        ))}
      </View>

      <Text style={{ marginBottom: 8 }}>Nutrients:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {nutrients.map((nutrient, index) => (
          <Chip key={index} style={{ marginRight: 8, marginBottom: 8 }}>{nutrient}</Chip>
        ))}
      </View>
    </View>
  );
}

export default NutrientScreen;
