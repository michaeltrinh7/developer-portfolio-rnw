import { A } from '@expo/html-elements';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { ChildrenProps } from '../../props/ChildrenProps';
import { StyleProps } from '../../props/StyleProps';
import defaultStyles from '../../resources/DefaultStyles';

interface LinkProps extends ChildrenProps, StyleProps {
  /** @platform web */
  href?: string;
  /** @platform web */
  target?: string;
}

export const Link = ({ children, style, href, target }: LinkProps) => {
  return (
    <A style={[{ ...styles.text }, { ...style }]} href={href} target={target}>
      {children}
    </A>
  );
};

const styles = StyleSheet.create({
  text: {
    ...defaultStyles.text,
  },
});
