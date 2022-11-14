import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
const window = Dimensions.get('window');
//const screen = Dimensions.get('screen');

class MediaWidthNumber {
  defaultRem = 16;
  constructor(private width: Number) {
  }
  isMax37_5em() {
    return this.width <= 37.5 * this.defaultRem;
  }

  isMax56_25em() {
    return this.width <= 56.25 * this.defaultRem;
  }

  isMax75em() {
    return this.width <= 75 * this.defaultRem;
  }

  isMin112_5() {
    return this.width >= 112.5 * this.defaultRem;
  }

  toRem(): Float {
    // if (this.width <= this.defaultRem * 37.5) {
    //   console.log('37.5');
    //   return (this.defaultRem * 62.5) / 100;
    // }

    if (this.width <= this.defaultRem * 56.25) {
      console.log('56.25');
      return (this.defaultRem * 56) / 100;
    }
    if (this.width <= this.defaultRem * 75) {
      console.log('75');
      return (this.defaultRem * 59) / 100;
    }

    if (this.width >= this.defaultRem * 112.5) {
      console.log('112.5');
      return (this.defaultRem * 65) / 100;
    }

    console.log('Other');
    return (this.defaultRem * 62.5) / 100;
  }
}

export interface Media {
  rem: number;
  height: number;
  width: MediaWidthNumber;
}

interface Size {
  width: number;
  height: number;
}

const getMediaFunc = (size: Size): Media => {
  const width = new MediaWidthNumber(size.width);
  return { height: size.height, rem: width.toRem(), width };
};

const useMediaQuery = () => {
  const [_, setDimensions] = useState({ window });
  const defaultMedia = getMediaFunc({ width: window.width, height: window.height });
  const [media, setMediaValue] = useState(defaultMedia);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', (size) => {
      setDimensions({ window: size.window });

      const newMedia = getMediaFunc({ width: size.window.width, height: size.window.height });
      setMediaValue(newMedia);
    });
    return () => subscription?.remove();
  });

  return media;
};

export default useMediaQuery;
