import React, { useCallback, useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import AnimatedSprite from '../components/AnimatedSprite';
import AppText from '../components/AppText';
import { letterText } from '../data/letter';

// screens/LetterScreen.tsx
// El sprite del sobre: letter-purple.png, 200x25, 8 frames de 25x25.
// La musica: letter_theme.mp3 (42s), puesta en:
//   android/app/src/main/res/raw/letter_theme.mp3
//
// Usamos react-native-video en modo "solo audio" en vez de react-native-sound,
// porque react-native-sound no tiene soporte para la Nueva Arquitectura de
// React Native (rompe el build). react-native-video si es compatible.

const envelopeSprite = require('../../assets/letter-purple.png');

export default function LetterScreen() {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // El <Video> (en modo audio) solo se monta mientras esta pantalla tiene
  // el foco. Al montarse, arranca a sonar en loop; al desmontarse (el
  // usuario sale a otro tab), se detiene y libera solo, porque ya no
  // existe el componente.
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, []),
  );

  const toggleMute = () => setMuted((prev) => !prev);

  return (
    <LinearGradient colors={['#E7C5FF', '#FED5FF']} style={styles.container}>
      {isFocused && (
        <Video
          source={{ uri: 'letter_theme' }} // busca android/app/src/main/res/raw/letter_theme.mp3
          repeat
          muted={muted}
          paused={false}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          style={styles.hiddenVideo}
        />
      )}

      <TouchableOpacity style={styles.muteButton} onPress={toggleMute} activeOpacity={0.7}>
        <AppText style={styles.muteIcon}>{muted ? '🔇' : '🔊'}</AppText>
      </TouchableOpacity>

      {!opened ? (
        <TouchableOpacity
          style={styles.envelopeWrap}
          activeOpacity={0.85}
          onPress={() => setOpened(true)}
        >
          <AnimatedSprite
            source={envelopeSprite}
            frameWidth={25}
            frameCount={8}
            size={300}
            fps={8}
            introStart={4}
            introEnd={8}
            loopStart={4}
            loopEnd={8}
          />
          <AppText style={styles.hint}>toca para abrir</AppText>
        </TouchableOpacity>
      ) : (
        <ScrollView contentContainerStyle={styles.letterWrap}>
          <AppText style={styles.letterText}>{letterText}</AppText>
        </ScrollView>
      )}
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
  hiddenVideo: {
    width: 0,
    height: 0,
  },
  muteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  muteIcon: {
    fontSize: 16,
  },
  envelopeWrap: {
    alignItems: 'center',
  },
  hint: {
    fontSize: 13,
    color: '#3C3489',
    marginTop: 16,
  },
  letterWrap: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  letterText: {
    fontSize: 15,
    color: '#4B1528',
    lineHeight: 24,
    textAlign: 'left',
  },
});