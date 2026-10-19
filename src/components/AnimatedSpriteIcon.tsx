import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';

// components/AnimatedSpriteIcon.tsx
//
// Anima un sprite sheet horizontal (todas las frames en una sola fila,
// del mismo ancho cada una) recortando una "ventana" y moviendo la
// imagen completa hacia la izquierda, frame por frame, en loop.
// Funciona igual en iOS y Android, sin dependencias nativas.

type Props = {
  source: any; // require('../assets/heart.png')
  frameSize: number; // ancho/alto de cada frame (25 en tu caso)
  frameCount: number; // cantidad de frames (5 en tu caso)
  fps?: number; // velocidad de la animación
  tintColor?: string;
};

export default function AnimatedSpriteIcon({
  source,
  frameSize,
  frameCount,
  fps = 8,
  tintColor,
}: Props) {
  const frame = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(frame, {
        toValue: frameCount,
        duration: (1000 / fps) * frameCount,
        useNativeDriver: true,
        // hace que salte de frame en frame en vez de deslizar suave
        easing: (t) => Math.floor(t * frameCount) / frameCount,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [frame, frameCount, fps]);

  const translateX = frame.interpolate({
    inputRange: [0, frameCount],
    outputRange: [0, -frameSize * frameCount],
  });

  return (
    <View style={[styles.window, { width: frameSize, height: frameSize }]}>
      <Animated.Image
        source={source}
        style={[
          { width: frameSize * frameCount, height: frameSize, transform: [{ translateX }] },
          tintColor ? { tintColor } : null,
        ]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  window: {
    overflow: 'hidden',
  },
});