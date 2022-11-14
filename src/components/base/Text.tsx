import * as React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

import { ChildrenProps } from '../../props/ChildrenProps';
import { StyleProps } from '../../props/StyleProps';
import defaultStyles from '../../resources/DefaultStyles';

interface TextProps extends ChildrenProps, StyleProps { }

export const Text = ({ children, style }: TextProps) => {
  return <RNText style={[{ ...styles.text }, { ...style }]}>{children}</RNText>;
};

const styles = StyleSheet.create({
  text: {
    ...defaultStyles.text,
  },
});
