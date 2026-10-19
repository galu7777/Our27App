import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../components/AppText';
import { reasons } from '../data/reasons';

// screens/ReasonsScreen.tsx
// La tarjeta pixel art la dibujas tú en Pixilart y la importas aquí, ej:
// import reasonCard from '../assets/reason-card.png';


export default function ReasonsScreen({ navigation }: any) {
  const [index, setIndex] = useState(0);

  const nextReason = () => {
    setIndex((prev) => (prev + 1) % reasons.length);
  };

  return (
    <LinearGradient colors={['#C8B6FE', '#E7C5FF']} style={styles.container}>
      <AppText style={styles.header}>Razones para Amarte</AppText>

      <View style={styles.card}>
        {/* Reemplaza esto por tu imagen/tarjeta pixel art importada */}
        {/* <Image source={reasonCard} style={styles.cardArt} resizeMode="contain" /> */}
        <AppText style={styles.cardAppText}>{reasons[index]}</AppText>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={nextReason}>
        <AppText style={styles.buttonAppText}>Otra razon</AppText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Letter')}>
        <AppText style={styles.link}>Ir a la carta →</AppText>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    color: '#26215C',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    minHeight: 180,
    backgroundColor: '#FED5FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 24,
  },
  cardArt: {
    width: '100%',
    height: 140,
    marginBottom: 12,
  },
  cardAppText: {
    fontSize: 15,
    color: '#4B1528',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
    marginBottom: 16,
  },
  buttonAppText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#534AB7',
  },
  link: {
    fontSize: 13,
    color: '#26215C',
    textDecorationLine: 'underline',
  },
});