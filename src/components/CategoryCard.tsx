import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {Category} from '../types';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({category, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: category.strCategoryThumb}} style={styles.image} />
      <Text style={styles.title}>{category.strCategory}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default CategoryCard;
