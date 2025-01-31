# React Native Meals App - Implementation Guide

This guide assumes you have all the initial files (models, data, and empty component/screen files) and required dependencies installed. Let's implement the functionality step by step, following the data flow from top to bottom.

## 1. Setting up the Navigation Structure (App.js)

First, we'll set up the navigation structure using both Stack and Drawer navigation:

```javascript
// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { CATEGORIES } from "./data/dummy-data";
import CategoriesScreen from "./screens/CategoriesScreen";
import MealListScreen from "./screens/MealListScreen";
import MealDetailScreen from "./screens/MealDetailScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: { backgroundColor: "midnightblue" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "aliceblue" },
        drawerContentStyle: { backgroundColor: "ghostwhite" },
        drawerInactiveTintColor: "slategray",
        drawerActiveTintColor: "midnightblue",
        drawerActiveBackgroundColor: "lavender",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
        }}
      />
      {CATEGORIES.map((category) => (
        <Drawer.Screen
          key={category.id}
          name={category.title}
          component={MealListScreen}
          initialParams={{ categoryId: category.id }}
        />
      ))}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "saddlebrown" },
          headerTintColor: "white",
          cardStyle: { backgroundColor: "sienna" },
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MealDetail"
          component={MealDetailScreen}
          options={{
            title: "About the Meal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

Key features:

- Nested navigation (Drawer inside Stack)
- Dynamic drawer items for each category
- Consistent styling across navigators

## 2. Implementing the Categories Screen

The CategoriesScreen is our main entry point, displaying a grid of meal categories:

```javascript
// screens/CategoriesScreen.js
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryItem from "../components/CategoryItem";

function CategoriesScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate(itemData.item.title, {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryItem
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  // Add styles as needed
});
```

Key features:

- Grid layout using FlatList
- Navigation to specific category screens
- Efficient rendering of categories

## 3. Creating the CategoryItem Component

Now that we have our screen structure, let's create the CategoryItem component that will be rendered within the grid:

```javascript
// components/CategoryItem.js
function CategoryItem({ title, color, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
```

Key features:

- Platform-specific shadows and effects
- Consistent touch feedback
- Flexible grid layout styling

## 4. Creating the MealListItem Component

The `MealListItem` component displays a meal preview with image and details:

```javascript
// components/MealListItem.js

// MealListItem component receives several props to display meal information
function MealListItem({
  title, // Name of the meal
  imageUrl, // URL of the meal's image
  duration, // Cooking time in minutes
  complexity, // How difficult the meal is to prepare
  affordability, // How expensive the meal is
  onPress, // Function to handle tapping on the meal
}) {
  return (
    // Container for the entire meal item
    <View style={styles.mealItem}>
      {/* Pressable wrapper for touch handling */}
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          // Apply pressed style for iOS feedback
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <View>
            {/* Image component for loading remote images */}
            {/* source prop requires an object with uri for remote images */}
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          {/* Details section shows cooking information in a row */}
          <View style={styles.details}>
            <Text style={styles.detailItem}>{duration}m</Text>
            <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
            <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

// Styles for the MealListItem component
const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    // Platform-specific shadow implementation
    elevation: 4, // Android shadow
    // iOS shadow properties
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  image: {
    width: "100%", // Take full width of container
    height: 200, // Fixed height for consistency
    // Round top corners to match container
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
  details: {
    // Arrange items in a row
    flexDirection: "row",
    alignItems: "center", // Center items vertically
    justifyContent: "center", // Center items horizontally
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
```

## 5. Building the MealListScreen

The screen that displays meals for a selected category:

```javascript
// screens/MealListScreen.js

function MealListScreen({ route, navigation }) {
  // Get the categoryId passed through navigation params
  const catId = route.params.categoryId;

  // useLayoutEffect runs synchronously after render
  // Used here to set the screen title before visual changes
  useLayoutEffect(() => {
    // Find the category title using the ID
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;
    // Set the navigation header title
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]); // Re-run if these dependencies change

  // Filter meals to only show ones from this category
  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  // Function to render each meal item
  function renderMealItem(itemData) {
    const item = itemData.item;
    // Prepare props for MealListItem component
    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
      // Navigate to meal detail screen when pressed
      onPress: () => {
        navigation.navigate("MealDetail", { mealId: item.id });
      },
    };
    // Spread operator (...) passes all properties as individual props
    return <MealListItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      {/* FlatList for efficient rendering of scrollable lists */}
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}
```

## 6. Creating the MealDetailScreen

The detailed view of a selected meal:

```javascript
// screens/MealDetailScreen.js

function MealDetailScreen({ route, navigation }) {
  // Get the mealId from navigation params
  const mealId = route.params.mealId;
  // Find the selected meal in our data
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // Set the screen title to the meal name
  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
    });
  }, [selectedMeal.title, navigation]);

  return (
    // ScrollView allows content to scroll if it exceeds screen height
    // Unlike FlatList, it renders all content at once
    <ScrollView style={styles.rootContainer}>
      {/* Display the meal's image */}
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>

      {/* Meal details section */}
      <View style={styles.details}>
        <Text style={styles.detailItem}>{selectedMeal.duration}m</Text>
        <Text style={styles.detailItem}>
          {selectedMeal.complexity.toUpperCase()}
        </Text>
        <Text style={styles.detailItem}>
          {selectedMeal.affordability.toUpperCase()}
        </Text>
      </View>

      {/* Ingredients and Steps sections */}
      <View style={styles.listContainer}>
        {/* Ingredients section */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Ingredients</Text>
        </View>
        {/* map creates a new element for each ingredient */}
        {selectedMeal.ingredients.map((ingredient) => (
          <View key={ingredient} style={styles.listItem}>
            <Text style={styles.itemText}>{ingredient}</Text>
          </View>
        ))}

        {/* Steps section */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Steps</Text>
        </View>
        {/* map creates a new element for each step */}
        {selectedMeal.steps.map((step) => (
          <View key={step} style={styles.listItem}>
            <Text style={styles.itemText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
```

## Implementation Steps and Testing

1. **Setup and Navigation (App.js)**:

   - Install required navigation packages
   - Set up the navigation structure
   - Test basic navigation flow

2. **Categories Implementation**:

   - Implement CategoriesScreen
   - Create and style CategoryItem
   - Test category grid layout and navigation

3. **Meals List Implementation**:

   - Create MealListScreen
   - Implement MealListItem
   - Test category-to-meals navigation
   - Verify meal filtering

4. **Meal Details Implementation**:
   - Build MealDetailScreen
   - Style the detailed view
   - Test navigation and data display
