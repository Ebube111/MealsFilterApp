import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {useSelector, useDispatch } from 'react-redux'
import { toogleFavorite } from '../store/actions/meals'

import HeaderButton from "../components/HeaderButton";
import DefaultText from '../components/DefaultText'

const ListItem = props => {
    return <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}

const MealDetailScreen = (props) => {
  const availableMeals = useSelector(state => state.meals.meals)
  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch()

  const toogleFavoriteHandle = useCallback(() => {
      dispatch(toogleFavorite(mealId))
  }, [dispatch, mealId])


  useEffect(() => {
    props.navigation.setParams({toogleFav: toogleFavoriteHandle })
}, [toogleFavoriteHandle])

  useEffect(() => {
      props.navigation.setParams({isFav: currentMealIsFavorite})
  }, [currentMealIsFavorite])

  return (
      <ScrollView>
          <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
          <View style={styles.details}>
            <DefaultText>{selectedMeal.duration}m</DefaultText>
            <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
          </View>
          <Text style={styles.title}>Ingredients</Text>
  {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
          <Text style={styles.title}>Steps</Text>
  {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  const toogleFavorite = navigationData.navigation.getParam('toogleFav')
  const isFavorite = navigationData.navigation.getParam('isFav')

  return {
    title: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favorite" iconName={isFavorite ? 'ios-star': "ios-star-outline"} onPress={toogleFavorite} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
    image: {
       width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: "space-around"
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: "center"
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;
