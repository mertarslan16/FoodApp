export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail extends Meal {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube?: string;
}
export type RootStackParamList = {
  Categories: undefined;
  Meals: {category: string};
  Details: {mealId: string};
};
