# Our27App 💜

![Logo](./assets/logo.png)

Una app móvil hecha a mano, pixel art por pixel art, como regalo. Tres pantallas, una paleta pastel y un montón de detalles pensados uno por uno.

## ✨ Características

- **Bienvenida** — pantalla de entrada con gradiente pastel y animación de pixel art.
- **Razones** — tarjeta rotativa con razones random, con sprite animado.
- **Carta** — un sobre pixel art animado (abre con una secuencia de frames) que revela una carta escrita a mano, con música de fondo que solo suena en esta pantalla y se puede mutear.
- Navegación por tabs inferiores con íconos animados.
- Fuente pixel art personalizada en toda la app (estilo retro 8-bit).

## 🛠️ Stack

- [React Native CLI](https://reactnative.dev/) (sin Expo) + TypeScript
- [`@react-navigation/native`](https://reactnavigation.org/) + `bottom-tabs`
- [`react-native-linear-gradient`](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
- [`react-native-video`](https://github.com/TheWidlarzGroup/react-native-video) (reproducción de audio en loop)
- Sprites y fuente pixel art dibujados a mano en Pixilart

## 📋 Prerrequisitos

- Node.js y npm
- Android Studio con el SDK de Android instalado
- Variable de entorno `ANDROID_HOME` configurada
- Un emulador de Android o un dispositivo físico con depuración USB habilitada

## 🚀 Instalación

```bash
npm install
```

### Android

```bash
npm run android
```

> En Windows: si ves un error de "Filename longer than 260 characters" al compilar, mueve el proyecto a una ruta corta (ej. `C:\rn\Our27App`) antes de compilar — es una limitación conocida de `ninja`/CMake en rutas largas de Windows.

## 📁 Estructura del proyecto

```
Our27App/
├── android/                  # Proyecto nativo de Android
├── assets/
│   ├── logo.png
│   ├── fonts/                # Fuente pixel art
│   └── music/                # Audio de fondo
├── src/
│   ├── assets/                # Sprites (home, heart, letter, etc.)
│   ├── components/
│   │   ├── AnimatedSprite.tsx     # Componente genérico para animar sprite sheets
│   │   ├── AppText.tsx            # Texto con la fuente pixel art aplicada
│   │   └── ...
│   ├── data/
│   │   └── letter.ts          # Texto de la carta
│   └── screens/
│       ├── WelcomeScreen.tsx
│       ├── ReasonsScreen.tsx
│       └── LetterScreen.tsx
├── App.tsx                   # Navegador de tabs
└── README.md
```

## 🎨 Sobre los sprites

Todos los sprites son sheets horizontales (todas las frames en una sola fila, mismo ancho cada una), dibujados en Pixilart y animados con `AnimatedSprite`, un componente genérico que soporta:

- Escalar el tamaño mostrado sin perder nitidez (sprites pre-exportados a distintas resoluciones con nearest-neighbor, para evitar blur).
- Una reproducción única de introducción (ej. abrir el sobre) seguida de un loop más corto.

## 📝 Licencia

Proyecto personal — no destinado a distribución pública.