import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './src/screens/WelcomeScreen';
import ReasonsScreen from './src/screens/ReasonsScreen';
import LetterScreen from './src/screens/LetterScreen';
import AnimatedSpriteIcon from './src/components/AnimatedSpriteIcon';

// App.tsx
// Reemplaza al par app-tabs.tsx + _layout.tsx de Expo Router.
// Instala: @react-navigation/native @react-navigation/bottom-tabs
//          react-native-screens react-native-safe-area-context
// (react-native-safe-area-context y react-native-screens necesitan
// pod install en iOS si usas RN CLI)

const Tab = createBottomTabNavigator();

const palette = {
  background: '#E7C5FF',
  active: '#26215C',
  inactive: '#9A8FC9',
};

// Pon tus íconos pixel art aquí (mismo tamaño, ej. 24x24 o 32x32)
// heart usa el sprite sheet (heart.png, 5 frames de 25x25 en fila) para
// poder animarlo cuando el tab esta activo; home y envelope son estaticos.
const icons = {
  home: require('./assets/home.png'),
  heart: require('./assets/heart.png'), // sprite sheet 125x25 (5 frames de 25x25)
  envelope: require('./assets/letter.png'), // sprite sheet 200x25 (8 frames de 25x25)
};

function TabIcon({
  source,
  focused,
  frameSize,
  frameCount,
}: {
  source: any;
  focused: boolean;
  frameSize?: number; // pásalo cuando "source" es un sprite sheet, para mostrar solo la 1ra frame
  frameCount?: number; // cantidad total de frames del sprite (necesario para recortar bien)
}) {
  if (frameSize && frameCount) {
    // Ventana recortada: la imagen se muestra a su ancho REAL (todas las
    // frames juntas), pero el contenedor solo deja ver frameSize x frameSize,
    // es decir, solo la primera frame. Sin esto, el <Image> se estira/aplasta
    // completo dentro de la cajita y se ve "cortado" y deforme.
    return (
      <View style={{ width: frameSize, height: frameSize, overflow: 'hidden' }}>
        <Image
          source={source}
          style={{
            width: frameSize * frameCount,
            height: frameSize,
            tintColor: focused ? palette.active : palette.inactive,
          }}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={[styles.icon, { tintColor: focused ? palette.active : palette.inactive }]}
      resizeMode="contain"
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: palette.background },
          tabBarActiveTintColor: palette.active,
          tabBarInactiveTintColor: palette.inactive,
          // Fuente pixel tambien en los labels de las tabs (Bienvenida/Razones/Carta).
          // fontSize chico porque Press Start 2P es muy "ancha" comparada con
          // una fuente normal al mismo tamaño.
          tabBarLabelStyle: {
            fontFamily: 'PressStart2P-Regular',
            fontSize: 8,
            letterSpacing: 0.3,
          },
        }}
      >
        <Tab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarLabel: 'Bienvenida',
            tabBarIcon: ({ focused }) => <TabIcon source={icons.home} focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Reasons"
          component={ReasonsScreen}
          options={{
            tabBarLabel: 'Razones',
            // Cuando el tab esta activo, el corazon se anima frame a frame
            // usando el sprite sheet (heart.png, 5 frames de 25x25).
            // Cuando no esta activo, se queda como icono fijo (TabIcon).
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AnimatedSpriteIcon
                  source={icons.heart}
                  frameSize={25}
                  frameCount={5}
                  fps={8}
                  tintColor={palette.active}
                />
              ) : (
                <TabIcon source={icons.heart} focused={focused} frameSize={25} frameCount={5} />
              ),
          }}
        />
        <Tab.Screen
          name="Letter"
          component={LetterScreen}
          options={{
            tabBarLabel: 'Carta',
            // Igual que Razones, pero con 8 frames en vez de 5.
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AnimatedSpriteIcon
                  source={icons.envelope}
                  frameSize={25}
                  frameCount={8}
                  fps={8}
                  tintColor={palette.active}
                />
              ) : (
                <TabIcon source={icons.envelope} focused={focused} frameSize={25} frameCount={8} />
              ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
});