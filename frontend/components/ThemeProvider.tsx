import { PropsWithChildren, useEffect } from "react";
import { View } from "react-native";
import { configureFonts, MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import "../global.css"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/* const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Inter-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Inter-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter-Light',
      fontWeight: 'normal',
    },
    black: {
      fontFamily: 'Inter-Black',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Inter-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Inter-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter-Light',
      fontWeight: 'normal',
    },
    black: {
      fontFamily: 'Inter-Black',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Inter-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Inter-Bold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter-Light',
      fontWeight: 'normal',
    },
    black: {
      fontFamily: 'Inter-Black',
      fontWeight: 'normal',
    },
  },
};
 */
const theme = {
  ...DefaultTheme,
  //Weird type error that should not be there, tries to add missing properties, still does not work
  //@ts-ignore
  /*   fonts: configureFonts({ config: fontConfig, isV3: false }), */
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    primary: '#FFD200',
  },
};

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </PaperProvider>
  );
}