import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {Meal} from '../types';

interface MealCardProps {
  meal: Meal;
  onPress: () => void;
}

const MealCard: React.FC<MealCardProps> = ({meal, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: meal.strMealThumb}} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    padding: 10,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default MealCard;
