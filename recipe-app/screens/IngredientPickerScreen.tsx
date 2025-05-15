import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IngredientCheckbox from '../components/IngredientCheckbox';
import { RootStackParamList } from '../App';

type PickerScreenRouteProp = RouteProp<RootStackParamList, 'Picker'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Picker'>;

const ingredientMap: Record<string, string[]> = {
  Meats: ['Chicken', 'Beef', 'Pork', 'Turkey', 'Lamb'],
  Vegetables: ['Carrot', 'Broccoli', 'Spinach', 'Peas', 'Zucchini'],
  Grains: ['Rice', 'Quinoa', 'Bread', 'Pasta', 'Barley'],
  Herbs: ['Basil', 'Cilantro', 'Parsley', 'Mint', 'Rosemary'],
  Spices: ['Salt', 'Pepper', 'Cumin', 'Paprika', 'Turmeric'],
};

export default function IngredientPickerScreen() {
  const route = useRoute<PickerScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { category, onDone } = route.params as any;

  const ingredients = ingredientMap[category] || [];
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (ingredient: string) => {
    setSelected((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleDone = () => {
    onDone(); // notify the category screen
    navigation.goBack(); // return to previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select ingredients for {category}</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <IngredientCheckbox
            label={item}
            checked={selected.includes(item)}
            onToggle={() => toggleSelection(item)}
          />
        )}
      />
      <Button title="Done" onPress={handleDone} disabled={selected.length === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
