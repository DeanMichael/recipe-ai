import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import IngredientCategoryScreen from './src/screens/IngredientCategoryScreen';
import IngredientSelectionScreen from './src/screens/IngredientSelectionScreen';
import RecipeResultsScreen from './src/screens/RecipeResultsScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="IngredientCategory"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#007AFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="IngredientCategory"
            component={IngredientCategoryScreen}
            options={{ title: 'Recipe Finder' }}
          />
          <Stack.Screen
            name="IngredientSelection"
            component={IngredientSelectionScreen}
            options={{ title: 'Select Ingredients' }}
          />
          <Stack.Screen
            name="RecipeResults"
            component={RecipeResultsScreen}
            options={{ title: 'Matching Recipes' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}