import { loadAsync } from 'expo-font';
import { CodedError } from 'expo-modules-core';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const Fonts = {
  SansSerif: 'SansSerif',
};

export function loadFonts() {
  return [{ [Fonts.SansSerif]: require('../../assets/fonts/SourceSans3-Regular.ttf') }];
}

export function useAppFonts() {
  const fonts = exports?.loadFonts() ?? loadFonts();
  if (fonts === null || fonts.length === 0) throw new Error('Fonts not found');

  const [errors, setErrors] = useState<Error[] | null>(null);
  useEffect(() => {
    const _loadFonts = () => {
      _.each(fonts, (font) => {
        loadAsync(font)
          .then(() => {
            setErrors((previousErrors) => [...(previousErrors || []), null]);
          })
          .catch((err) => {
            const codedError = err as CodedError;
            if (
              codedError &&
              Platform.OS === 'web' &&
              codedError.message.startsWith(
                'Expected font asset of type `string | FontResource | Asset` (number is not supported on web)'
              )
            ) {
              console.log('Ignore FontResource error (number is not supported) on web !!!');
              setErrors((previousErrors) => [...(previousErrors || []), null]);
            } else {
              setErrors((previousErrors) => [...(previousErrors || []), err]);
            }
          });
      });
    };

    _loadFonts();
  }, []);
  const loaded =
    errors !== null && errors.length >= fonts.length && _.every(errors, (v) => v === null);
  return { fontsLoaded: loaded, errors };
}
