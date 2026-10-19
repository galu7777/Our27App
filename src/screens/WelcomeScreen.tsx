import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../components/AppText';
import AnimatedSprite from '../components/AnimatedSprite';

// screens/WelcomeScreen.tsx
// La imagen/ilustración pixel art (estrellitas, nubes, etc.) la importas tú
// y la pones como capa encima del gradiente, ej:
// import bgArt from '../assets/welcome-art.png';
// <Image source={bgArt} style={styles.artOverlay} resizeMode="contain" />

const envelopeSprite = require('../../assets/heart-p.png');

export default function WelcomeScreen({ navigation }: any) {
  return (
    <LinearGradient
      colors={['#BDCFFF', '#B8C0FF', '#C8B6FE', '#E7C5FF', '#FED5FF']}
      locations={[0, 0.25, 0.5, 0.75, 1]}
      style={styles.container}
    >
      {/* Aquí va tu imagen/pixel art importada, si quieres que quede detrás del texto */}
      {/* <Image source={bgArt} style={styles.artOverlay} resizeMode="contain" /> */}

      <View style={styles.content}>
        <AppText style={styles.title}>Para Reichelin</AppText>
        <AppText style={styles.subtitle}>tengo algo para ti...</AppText>

        <AnimatedSprite
            source={envelopeSprite}
            frameWidth={25}
            frameCount={5}
            size={300}
            fps={5}
            introStart={1}
            introEnd={5}
          />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Reasons')}
        >
          <AppText style={styles.buttonText}>Entrar</AppText>
        </TouchableOpacity>
      </View>
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
  artOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#26215C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#3C3489',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#534AB7',
  },
});