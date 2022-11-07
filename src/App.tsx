import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Header } from './components/Header';
import useMediaQuery from './core/hooks/useMediaQuery';
import { useAppFonts } from './resources/Fonts';
const App = () => {
  const { fontsLoaded } = useAppFonts();
  const media = useMediaQuery();

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <Header media={media} />
    </SafeAreaProvider>
  );

  // return <View >
  //   <Text style={styles.header}>Window Dimensions</Text>
  //   {Object.entries(dimensions.window).map(([key, value]) => (
  //     <Text>{key} - {value}</Text>
  //   ))}
  //   <Text style={styles.header}>Screen Dimensions</Text>
  //   {Object.entries(dimensions.screen).map(([key, value]) => (
  //     <Text>{key} - {value}</Text>
  //   ))}
  //   <Text>{fontSize}</Text>
  // </View>
};

// This demo is using a external compiler that will only work in Expo Snacks.
// You may see flashes of unstyled content, this will not occur under normal use!
// Please see the documentation to setup your application
//export default withExpoSnack(App);
export default App;
