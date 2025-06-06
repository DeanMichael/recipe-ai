import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

type Props = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export default function IngredientCheckbox({ label, checked, onToggle }: Props) {
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Text style={styles.check}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  check: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
  },
});
