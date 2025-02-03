import React, { useLayoutEffect } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { MEALS } from "../data/dummy-data";

/**
 * MealDetailScreen Component
 * Displays detailed information about a selected meal including
 * image, ingredients, and preparation steps
 *
 * @param {Object} props
 * @param {Object} props.route - Route prop from React Navigation containing params
 * @param {Object} props.navigation - Navigation prop from React Navigation
 */
function MealDetailScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
    });
  }, [selectedMeal.title, navigation]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View style={styles.details}>
        <Text style={styles.detailItem}>{selectedMeal.duration}m</Text>
        <Text style={styles.detailItem}>
          {selectedMeal.complexity.toUpperCase()}
        </Text>
        <Text style={styles.detailItem}>
          {selectedMeal.affordability.toUpperCase()}
        </Text>
      </View>

      <View style={styles.listContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Ingredients</Text>
        </View>
        {selectedMeal.ingredients.map((ingredient) => (
          <View key={ingredient} style={styles.listItem}>
            <Text style={styles.itemText}>{ingredient}</Text>
          </View>
        ))}

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Steps</Text>
        </View>
        {selectedMeal.steps.map((step) => (
          <View key={step} style={styles.listItem}>
            <Text style={styles.itemText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "#351401",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
    color: "#351401",
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  subtitleContainer: {
    marginVertical: 4,
    marginHorizontal: 24,
    padding: 6,
    borderBottomColor: "#351401",
    borderBottomWidth: 2,
  },
  subtitle: {
    color: "#351401",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});
