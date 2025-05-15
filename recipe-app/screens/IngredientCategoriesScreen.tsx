import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CategoryChip from '../components/CategoryChip';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const categories = ['Meats', 'Vegetables', 'Grains', 'Herbs', 'Spices'];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Categories'>;

export default function IngredientCategoriesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [completed, setCompleted] = useState<string[]>([]);

  const handleDone = (category: string) => {
    if (!completed.includes(category)) {
      setCompleted([...completed, category]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Ingredients by Category</Text>
      {categories.map((category) => (
        <CategoryChip
          key={category}
          label={category}
          completed={completed.includes(category)}
          onPress={() =>
            navigation.navigate('Picker', {
              category,
              onDone: () => handleDone(category),
            } as never)
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
