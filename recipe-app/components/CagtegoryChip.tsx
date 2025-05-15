import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

type Props = {
  label: string;
  completed?: boolean;
  onPress: () => void;
};

export default function CategoryChip({ label, completed, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.chip}>
      <Text style={styles.label}>{label}</Text>
      {completed && <Text style={styles.done}>✔</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
  },
  done: {
    fontSize: 16,
    color: 'green',
  },
});
