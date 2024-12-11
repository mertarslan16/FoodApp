import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';
import {Category, RootStackParamList} from '../types';

type CategoriesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Categories'
>;

interface CategoriesScreenProps {
  navigation: CategoriesScreenNavigationProp;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({navigation}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  });

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <CategoryCard
            category={item}
            onPress={() =>
              navigation.navigate('Meals', {category: item.strCategory})
            }
          />
        )}
        keyExtractor={item => item.idCategory}
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

export default CategoriesScreen;
