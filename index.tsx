// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);



import 'expo/build/Expo.fx';
import { AppRegistry, Platform } from 'react-native';
import withExpoRoot from 'expo/build/launch/withExpoRoot';
import { StrictMode } from "react";

import App from './src/App';
import { createRoot } from "react-dom/client";

AppRegistry.registerComponent('main', () => withExpoRoot(App));
if (Platform.OS === 'web') {
    // const rootTag = createRoot(document.getElementById('root') ?? document.getElementById('main'));
    // const RootComponent = withExpoRoot(App);
    // rootTag.render(<RootComponent />);

    const rootElement = document.getElementById("root");
    const root = createRoot(rootElement!);

    root.render(<StrictMode><App /></StrictMode>);
}