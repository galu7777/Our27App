import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

// components/AnimatedSprite.tsx
//
// Componente generico para animar CUALQUIER sprite sheet horizontal
// (todas las frames en una fila, mismo ancho/alto cada una).
//
// - Puedes agrandar o achicar la animacion con "size", sin importar el
//   tamaño real de cada frame en el archivo.
// - Soporta un loop simple (frame A al frame B, en loop infinito), o un
//   modo de dos fases: la primera vez reproduce un rango "intro" completo
//   una sola vez (ej. frame 1 al 8), y despues cambia para siempre a un
//   loop mas corto (ej. frame 4 al 8). Si no pasas introStart/introEnd,
//   simplemente hace loop normal de loopStart a loopEnd.
//
// Los numeros de frame son en base 1 (frame 1 = la primera de la izquierda).
//
// Ejemplo, sobre que abre con intro completo y despues loop del 4 al 8:
//
// <AnimatedSprite
//   source={require('../assets/letter-purple.png')}
//   frameWidth={25}
//   frameCount={8}
//   size={120}
//   fps={10}
//   introStart={1}
//   introEnd={8}
//   loopStart={4}
//   loopEnd={8}
// />
//
// Ejemplo simple, solo loop del corazon (5 frames, todas en loop):
//
// <AnimatedSprite
//   source={require('../assets/heart.png')}
//   frameWidth={25}
//   frameCount={5}
//   size={25}
// />

type Props = {
  source: any;
  frameWidth: number; // ancho de UNA frame en el archivo original (px reales)
  frameHeight?: number; // alto de una frame; por defecto igual a frameWidth
  frameCount: number; // cantidad total de frames en el sprite sheet
  size?: number; // tamaño final en pantalla (ancho y alto); por defecto frameWidth
  fps?: number; // velocidad de la animación, frames por segundo
  tintColor?: string;
  loopStart?: number; // frame donde empieza el loop normal (base 1). Default: 1
  loopEnd?: number; // frame donde termina el loop normal (base 1). Default: frameCount
  introStart?: number; // opcional: frame donde empieza la reproduccion unica inicial
  introEnd?: number; // opcional: frame donde termina la reproduccion unica inicial
  onIntroComplete?: () => void; // opcional: se llama una vez cuando termina el intro
  playing?: boolean; // por si quieres pausar la animación (default true)
};

export default function AnimatedSprite({
  source,
  frameWidth,
  frameHeight,
  frameCount,
  size,
  fps = 8,
  tintColor,
  loopStart = 1,
  loopEnd,
  introStart,
  introEnd,
  onIntroComplete,
  playing = true,
}: Props) {
  const resolvedLoopEnd = loopEnd ?? frameCount;
  const hasIntro = introStart != null && introEnd != null;
  const [frame, setFrame] = useState(hasIntro ? introStart! : loopStart);
  const introDone = useRef(!hasIntro);

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setFrame((prev) => {
        const next = prev + 1;

        if (!introDone.current) {
          if (next > introEnd!) {
            introDone.current = true;
            onIntroComplete?.();
            return loopStart;
          }
          return next;
        }

        if (next > resolvedLoopEnd) {
          return loopStart;
        }
        return next;
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, fps, loopStart, resolvedLoopEnd, introEnd]);

  const renderHeight = frameHeight ?? frameWidth;
  const displaySize = size ?? frameWidth;
  const scale = displaySize / frameWidth;

  const scaledFrameWidth = frameWidth * scale;
  const scaledFrameHeight = renderHeight * scale;
  const translateX = -(frame - 1) * scaledFrameWidth;

  return (
    <View
      style={[
        styles.window,
        { width: scaledFrameWidth, height: scaledFrameHeight },
      ]}
    >
      <Image
        source={source}
        style={[
          {
            width: scaledFrameWidth * frameCount,
            height: scaledFrameHeight,
            transform: [{ translateX }],
          },
          tintColor ? { tintColor } : null,
        ]}
        resizeMode="stretch"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  window: {
    overflow: 'hidden',
  },
});