import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { CATEGORIES } from "../data/dummy-data";
import CategoryItem from "../components/CategoryItem";

//Show all the categories
//User clicks on one and goes to a CategoryItem

export default function CategoriesScreen({ navigation }) {
  //I can make a function that navigates to a given Item
  //We call a method called navigate
  //console.log(CATEGORIES);
  const renderCategoryItem = (itemData) => {
    function pressHandler() {
      console.log(itemData);
      navigation.navigate(itemData.item.title, {
        categoryId: itemData.item.id,
      });
    }
    //console.log(itemData);
    return (
      <CategoryItem
        title={itemData.item.title}
        id={itemData.item.id}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  };
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    ></FlatList>
  );
}

const styles = StyleSheet.create({});
