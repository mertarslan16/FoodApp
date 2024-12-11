// src/screens/DetailsScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import axios from 'axios';
import {MealDetail, RootStackParamList} from '../types';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({route}) => {
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const {mealId} = route.params;

  useEffect(() => {
    fetchMealDetails();
  });

  const fetchMealDetails = async (): Promise<void> => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
      );
      setMeal(response.data.meals[0]);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  const handleWatchVideo = async () => {
    if (meal?.strYoutube) {
      try {
        await Linking.openURL(meal.strYoutube);
      } catch (error) {
        console.error('Error opening YouTube link:', error);
      }
    }
  };

  if (!meal) return null;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: meal.strMealThumb}} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.category}>{meal.strCategory}</Text>
      <Text style={styles.subtitle}>Instructions:</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>

      {meal.strYoutube && (
        <TouchableOpacity style={styles.watchButton} onPress={handleWatchVideo}>
          <Text style={styles.watchButtonText}>Watch on YouTube</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  category: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    padding: 16,
    paddingBottom: 8,
  },
  instructions: {
    fontSize: 16,
    padding: 16,
    paddingTop: 0,
    lineHeight: 24,
  },
  watchButton: {
    backgroundColor: '#FF0000',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  watchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
