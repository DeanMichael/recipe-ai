import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Sample ingredients by category (we'll replace this with data from your embeddings later)
const ingredientsByCategory: Record<string, string[]> = {
  proteins: ['Chicken', 'Beef', 'Fish', 'Tofu', 'Eggs', 'Pork', 'Shrimp', 'Turkey'],
  vegetables: ['Carrot', 'Broccoli', 'Spinach', 'Tomato', 'Onion', 'Bell Pepper', 'Garlic', 'Potato'],
  fruits: ['Apple', 'Banana', 'Orange', 'Lemon', 'Lime', 'Berries', 'Mango', 'Pineapple'],
  grains: ['Rice', 'Pasta', 'Bread', 'Quinoa', 'Oats', 'Couscous', 'Noodles', 'Flour'],
  dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Sour Cream', 'Cream Cheese'],
  spices: ['Salt', 'Pepper', 'Cumin', 'Paprika', 'Oregano', 'Basil', 'Thyme', 'Cinnamon'],
  pantry: ['Oil', 'Vinegar', 'Soy Sauce', 'Sugar', 'Flour', 'Canned Tomatoes', 'Stock']
};

type Props = NativeStackScreenProps<RootStackParamList, 'IngredientSelection'>;

const IngredientSelectionScreen: React.FC<Props> = ({ route, navigation }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const { categoryId } = route.params;
  const ingredients = ingredientsByCategory[categoryId] || [];

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Ingredients</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.grid}>
          {ingredients.map((ingredient) => (
            <TouchableOpacity
              key={ingredient}
              style={[
                styles.ingredientCard,
                selectedIngredients.includes(ingredient) && styles.selectedCard
              ]}
              onPress={() => toggleIngredient(ingredient)}
            >
              <Text style={[
                styles.ingredientText,
                selectedIngredients.includes(ingredient) && styles.selectedText
              ]}>
                {ingredient}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedIngredients.length === 0 && styles.disabledButton
          ]}
          disabled={selectedIngredients.length === 0}
          onPress={() => navigation.navigate('RecipeResults', { selectedIngredients })}
        >
          <Text style={styles.buttonText}>Find Recipes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  ingredientCard: {
    width: '45%',
    margin: '2.5%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    backgroundColor: '#007AFF',
  },
  ingredientText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default IngredientSelectionScreen; 