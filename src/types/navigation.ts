export type RootStackParamList = {
  IngredientCategory: undefined;
  IngredientSelection: {
    categoryId: string;
  };
  RecipeResults: {
    selectedIngredients: string[];
  };
}; 