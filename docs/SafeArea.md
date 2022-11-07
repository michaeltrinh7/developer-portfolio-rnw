Below code will fix the issue of safe area of react-native does not work with padding on android.

import { SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';


const App = () => {
  return (<SafeAreaProvider>
    <Header></Header>
  </SafeAreaProvider>
  );
}

function Header() {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingTop: insets.top }} />;
}