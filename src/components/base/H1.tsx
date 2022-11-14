import * as React from 'react';
import { StyleSheet } from 'react-native';
import { H1 as HEH1, } from '@expo/html-elements';
import { ChildrenProps } from '../../props/ChildrenProps';
import { StyleProps } from '../../props/StyleProps';
import defaultStyles from '../../resources/DefaultStyles';

interface H1Props extends ChildrenProps, StyleProps { }

export const H1 = ({ children, style }: H1Props) => {
    return <HEH1 style={[{ ...styles.text }, { ...style }]}>{children}</HEH1>;
};

const styles = StyleSheet.create({
    text: {
        ...defaultStyles.text,
    },
});
