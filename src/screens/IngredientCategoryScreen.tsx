import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const categories = [
  { id: 'proteins', name: 'Proteins', emoji: '🥩' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥕' },
  { id: 'fruits', name: 'Fruits', emoji: '🍎' },
  { id: 'grains', name: 'Grains & Pasta', emoji: '🍚' },
  { id: 'dairy', name: 'Dairy', emoji: '🧀' },
  { id: 'spices', name: 'Spices & Herbs', emoji: '🌿' },
  { id: 'pantry', name: 'Pantry Items', emoji: '🥫' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'IngredientCategory'>;

const IngredientCategoryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Ingredient Category</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('IngredientSelection', { categoryId: category.id })}
          >
            <Text style={styles.emoji}>{category.emoji}</Text>
            <Text style={styles.categoryName}>{category.name}</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default IngredientCategoryScreen; 