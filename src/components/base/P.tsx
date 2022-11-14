import * as React from 'react';
import { StyleSheet } from 'react-native';
import { P as HEP, } from '@expo/html-elements';
import { ChildrenProps } from '../../props/ChildrenProps';
import { StyleProps } from '../../props/StyleProps';
import defaultStyles from '../../resources/DefaultStyles';

interface PProps extends ChildrenProps, StyleProps { }

export const P = ({ children, style }: PProps) => {
    return <HEP style={[{ ...styles.text }, { ...style }]}>{children}</HEP>;
};

const styles = StyleSheet.create({
    text: {
        ...defaultStyles.text,
    },
});
