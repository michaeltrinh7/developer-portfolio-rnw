import { renderHook } from '@testing-library/react-native';
import * as ExpoFont from 'expo-font';
import { Platform } from 'react-native';
import renderer from 'react-test-renderer';

import * as FontsLoader from './Fonts';

const { loadAsync } = jest.requireActual('expo-font');
const { loadFonts, useAppFonts } = jest.requireActual('./Fonts');
jest.mock('expo-font');

function setupMocks({
  loadAsyncMock = loadAsync,
  loadFontsMock = loadFonts,
  useAppFontsMock = useAppFonts,
}) {
  jest.spyOn(ExpoFont, 'loadAsync').mockImplementation((v) => loadAsyncMock(v));
  jest.spyOn(FontsLoader, 'loadFonts').mockImplementation(() => loadFontsMock());
  jest.spyOn(FontsLoader, 'useAppFonts').mockImplementation(() => useAppFontsMock());
}

// function TestApp() {
//   const { fontsLoaded, errors } = FontsLoader.useAppFonts();
//   console.log('errors=', errors);
//   if (!fontsLoaded) return null;

//   return (
//     <View>
//       <Text style={{ fontSize: 30 }}>{Platform.OS}</Text>
//     </View>
//   );
// }

it(`should load font(s) properly (${Platform.OS})`, async () => {
  setupMocks({
    loadFontsMock: () => [{ font1: 1 }, { font2: 2 }],
  });

  // let tree: any;
  // await renderer.act(() => {
  //   tree = renderer.create(<TestApp />);
  // });
  // expect(tree.toJSON()).toMatchSnapshot();

  const { result, rerender } = renderHook(() => FontsLoader.useAppFonts());
  await renderer.act(() => {
    rerender({});
  });
  expect(result.current.fontsLoaded).toBe(true);
  console.log('result.current.errors=', result.current.errors);
  expect(result.current.errors).toStrictEqual([null, null]);
});

it(`should not load font(s) if there are errors (${Platform.OS})`, async () => {
  const err = new Error('Custom error occurs');
  setupMocks({
    loadAsyncMock: async () => {
      const asyncMock = jest.fn().mockRejectedValue(err);
      await asyncMock(); // throws "Async error"
    },
    loadFontsMock: () => [{ font1: 1 }, { font2: 2 }],
  });

  // let tree: any;
  // await renderer.act(() => {
  //   tree = renderer.create(<TestApp />);
  // });
  // expect(tree.toJSON()).toMatchSnapshot();

  const { result, rerender } = renderHook(() => FontsLoader.useAppFonts());
  await renderer.act(() => {
    rerender({});
  });
  expect(result.current.fontsLoaded).toBe(false);
  expect(result.current.errors.length).toBe(2);
  expect(result.current.errors[0].message).toBe(err.message);
  expect(result.current.errors[1].message).toBe(err.message);
});
