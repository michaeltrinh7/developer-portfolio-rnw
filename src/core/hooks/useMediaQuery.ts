import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

type WindowWidth = 'Max37_5' | 'Max56_25' | 'Max75' | 'Min112_5' | 'normal';
export interface Media {
  rem: number;
  width: WindowWidth;
}

const useMediaQuery = (): Media => {
  const getMediaFunc = (windowWidth: number): Media => {
    const defaultRem = 16;
    if (windowWidth <= defaultRem * 37.5) {
      return { rem: (16 * 62.5) / 100, width: 'Max37_5' };
    }

    if (windowWidth <= defaultRem * 56.25) {
      return { rem: (16 * 56) / 100, width: 'Max56_25' };
    }
    if (windowWidth <= defaultRem * 75) {
      return { rem: (16 * 59) / 100, width: 'Max75' };
    }

    if (windowWidth >= defaultRem * 112.5) {
      return { rem: (16 * 65) / 100, width: 'Min112_5' };
    }

    return { rem: (16 * 62.5) / 100, width: 'normal' };
  };

  const [_, setDimensions] = useState({ window, screen });
  const defaultMedia = getMediaFunc(window.width);
  const [media, setMediaValue] = useState(defaultMedia);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', (size) => {
      setDimensions({ window: size.window, screen: size.screen });

      const newMedia = getMediaFunc(size.window.width);
      setMediaValue(newMedia);
    });
    return () => subscription?.remove();
  });

  return media;
};

export default useMediaQuery;
