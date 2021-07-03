import React from 'react';
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {useSelector } from 'react-redux'

import MealList from '../components/MealList'
import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'

const FavoriteScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals)

    if (favMeals.length === 0 || !favMeals) {
        return <View style={styles.content}>
            <DefaultText>No Favorite meals found. Start Adding some!</DefaultText>
        </View>
    }

    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    )
}

FavoriteScreen.navigationOptions = (navData) => {

    return {
        title: "Your Favorites",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Favorites" color="#ccc" iconName="ios-menu" onPress={() => navData.navigation.toggleDrawer()} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        fontFamily: 'open-sans-bold'
    }
})

export default FavoriteScreen