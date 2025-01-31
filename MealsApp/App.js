import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { CATEGORIES } from "./data/dummy-data";
import CategoriesScreen from "./screens/CategoriesScreen";
import MealListScreen from "./screens/MealListScreen";
import MealDetailScreen from "./screens/MealDetailScreen";

// Create a Drawer navigator for categories
const Drawer = createDrawerNavigator();
// Create a Stack navigator for overall navigation
const Stack = createStackNavigator();

// Function to set up the drawer menu with all categories
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Categories"
      screenOptions={{
        // Apply styling to the Drawer navigator
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
      {/* Dynamically create drawer items for each category */}
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
          // Apply styling to the Stack navigator
          headerStyle: { backgroundColor: "saddlebrown" },
          headerTintColor: "white",
          cardStyle: { backgroundColor: "sienna" },
        }}
      >
        {/* 
        Nesting navigators: Adding the Drawer to the Stack
        - The DrawerNavigator is set as a screen within the Stack.Navigator
        - This allows the drawer to be accessible from any screen in the stack
        - The headerShown: false option hides the stack header for the drawer screen
        */}
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        {/* 
        Additional stack screens can be added here
        - These screens will be pushed on top of the drawer when navigated to
        - They can have their own headers and navigation options
        */}
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
