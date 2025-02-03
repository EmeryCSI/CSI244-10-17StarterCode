import React, { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealListItem from "../components/MealListItem";

/**
 * MealListScreen Component
 * Displays a list of meals for a selected category
 *
 * @param {Object} props
 * @param {Object} props.route - Route prop from React Navigation containing params
 * @param {Object} props.navigation - Navigation prop from React Navigation
 */
function MealListScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  // Set the screen title to the category name
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  // Filter meals that belong to the selected category
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  /**
   * Renders a single meal item
   * @param {Object} itemData - Data for the meal item
   */
  function renderMealItem(itemData) {
    const item = itemData.item;

    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
      onPress: () => {
        navigation.navigate("MealDetail", {
          mealId: item.id,
        });
      },
    };

    return <MealListItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
