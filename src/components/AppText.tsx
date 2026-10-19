import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

// components/AppText.tsx
//
// Reemplaza el <Text> normal de RN por este en tus pantallas, así toda
// la app usa la fuente pixel sin repetir fontFamily en cada estilo.
// Uso: import AppText from '../components/AppText';  <AppText>Hola</AppText>

export default function AppText({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.base, style]} />;
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'PressStart2P-Regular',
    // Las fuentes pixel suelen verse muy grandes/apretadas por defecto,
    // así que bajamos un poco el tamaño y damos aire entre letras.
    letterSpacing: 0.5,
  },
});