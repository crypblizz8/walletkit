import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  title: string;
}

export default function Button({ onPress, title, disabled }: ButtonProps) {
  return (
    <Pressable
      style={disabled ? styles.disabledButton : styles.button}
      onPress={!disabled ? onPress : null}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 8,
  },
  disabledButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'grey',
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
