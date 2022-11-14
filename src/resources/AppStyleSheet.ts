import { ViewStyle, TextStyle, ImageStyle, FlexStyle } from 'react-native';

export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function styleMedia<T extends NamedStyles<T> | NamedStyles<any>>(
  condition: boolean,
  styleIfTrue: T | NamedStyles<T>,
  styleElse: T | NamedStyles<T>
) {
  return condition ? styleIfTrue : styleElse;
}

export const paddingStyle = (
  top: number | string,
  right: number | string,
  bottom?: number | string,
  left?: number | string
): FlexStyle => {
  return {
    paddingTop: top,
    paddingBottom: bottom ?? top,
    paddingLeft: right,
    paddingRight: left ?? right,
  };
};

export const marginStyle = (
  top: number | string,
  right: number | string,
  bottom?: number | string,
  left?: number | string
): FlexStyle => {
  return {
    marginTop: top,
    marginBottom: bottom ?? top,
    marginLeft: right,
    marginRight: left ?? right,
  };
};
