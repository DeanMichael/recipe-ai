import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  matchScore: number;
};

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeResults'>;

const RecipeResultsScreen: React.FC<Props> = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { selectedIngredients } = route.params;

  useEffect(() => {
    // TODO: Implement recipe matching logic using your embeddings
    const findMatchingRecipes = async () => {
      try {
        setLoading(true);
        // Temporary mock data
        const mockRecipes: Recipe[] = [
          {
            id: '1',
            title: 'Sample Recipe 1',
            ingredients: selectedIngredients,
            instructions: ['Step 1...', 'Step 2...'],
            matchScore: 0.95,
          },
          {
            id: '2',
            title: 'Sample Recipe 2',
            ingredients: [...selectedIngredients, 'Additional Ingredient'],
            instructions: ['Step 1...', 'Step 2...'],
            matchScore: 0.85,
          },
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRecipes(mockRecipes);
      } catch (error) {
        console.error('Error finding recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    findMatchingRecipes();
  }, [selectedIngredients]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Finding the best recipes...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Matching Recipes</Text>
      <View style={styles.selectedIngredients}>
        <Text style={styles.subtitle}>Your Ingredients:</Text>
        <View style={styles.ingredientTags}>
          {selectedIngredients.map((ingredient) => (
            <View key={ingredient} style={styles.tag}>
              <Text style={styles.tagText}>{ingredient}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.recipeList}>
        {recipes.map((recipe) => (
          <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.matchScore}>
              Match Score: {Math.round(recipe.matchScore * 100)}%
            </Text>
            <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            {recipe.ingredients.map((ingredient) => (
              <Text
                key={ingredient}
                style={[
                  styles.ingredient,
                  selectedIngredients.includes(ingredient)
                    ? styles.availableIngredient
                    : styles.missingIngredient,
                ]}
              >
                • {ingredient}
              </Text>
            ))}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  selectedIngredients: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  ingredientTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  recipeList: {
    padding: 16,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  matchScore: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 12,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 8,
  },
  availableIngredient: {
    color: '#4CAF50',
  },
  missingIngredient: {
    color: '#FF9800',
  },
});

export default RecipeResultsScreen; 