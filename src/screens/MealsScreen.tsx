import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import axios from 'axios';
import MealCard from '../components/MealCard';
import {Meal, RootStackParamList} from '../types';

type MealsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Meals'
>;
type MealsScreenRouteProp = RouteProp<RootStackParamList, 'Meals'>;

interface MealsScreenProps {
  navigation: MealsScreenNavigationProp;
  route: MealsScreenRouteProp;
}

const MealsScreen: React.FC<MealsScreenProps> = ({navigation, route}) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const {category} = route.params;

  useEffect(() => {
    fetchMeals();
  });

  const fetchMeals = async (): Promise<void> => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      setMeals(response.data.meals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        renderItem={({item}) => (
          <MealCard
            meal={item}
            onPress={() =>
              navigation.navigate('Details', {mealId: item.idMeal})
            }
          />
        )}
        keyExtractor={item => item.idMeal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default MealsScreen;
