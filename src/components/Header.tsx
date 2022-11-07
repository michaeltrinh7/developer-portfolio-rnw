import * as HE from '@expo/html-elements';
import { UL, LI } from '@expo/html-elements';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useHamburgerMenu from '../core/hooks/useHamburgerMenu';
import { Media } from '../core/hooks/useMediaQuery';
import { ChildrenProps } from '../props/ChildrenProps';
import { MediaProps } from '../props/MediaProps';
import { paddingStyle } from '../resources/AppStyleSheet';
import { Link } from './base/Link';
import { Text } from './base/Text';

interface HeaderProps extends ChildrenProps, MediaProps {}

export const Header = ({ children, media }: HeaderProps) => {
  const { showMenu, setShowMemu } = useHamburgerMenu();

  const insets = useSafeAreaInsets();
  const styles = stylesFunc(media, insets.top, showMenu);
  return (
    <HE.Section style={styles.header}>
      {children}
      <View style={styles.headerLeft}>
        <View style={styles.headerLogo}>
          <Image style={styles.headerLogoImg} source={require('../../assets/png/john-doe.png')} />
        </View>
        <Text style={styles.headerSub}>John Doe</Text>
        <View style={styles.headerSeperator} />
        <Ionicons
          style={styles.headerHamburger}
          name={showMenu ? 'close' : 'menu'}
          size={32}
          color="black"
          onPress={() => {
            setShowMemu(!showMenu);
          }}
        />
      </View>
      <View style={styles.headerSeperator} />

      <UL style={styles.headerNav}>
        <LI>
          <Link style={styles.headerNavItemLink} href="/">
            Home
          </Link>
        </LI>
        <LI>
          <Link style={styles.headerNavItemLink} href="/#about">
            About
          </Link>
        </LI>
        <LI>
          <Link style={styles.headerNavItemLink} href="/#projects">
            Projects
          </Link>
        </LI>
        <LI>
          <Link style={styles.headerNavItemLink} href="/#contact">
            Contact
          </Link>
        </LI>
      </UL>
    </HE.Section>
  );
};

const linkByMedia = (media: Media) => {
  const style =
    media.width === 'Max56_25'
      ? {
          fontSize: 1.5 * media.rem,

          ...paddingStyle(3 * media.rem, 1.8 * media.rem),
        }
      : {
          fontSize: 1.6 * media.rem,
          ...paddingStyle(2.2 * media.rem, 3 * media.rem),
        };

  return {
    ...style,
    lineHeight: 1.5 * style.fontSize,
  };
};
// Good link for flexbox style: https://stackoverflow.com/questions/39527485/css3-flexbox-left-and-right-floating-items
const stylesFunc = (media: Media, top: number, showMenu: boolean) =>
  StyleSheet.create({
    header: {
      lineHeight: 1.5 * media.rem,
      ...(media.width === 'Max56_25'
        ? paddingStyle(0, 2 * media.rem)
        : paddingStyle(Math.max(media.rem, top), 5 * media.rem, media.rem)),

      display: 'flex',
      position: 'absolute',
      width: '100%',

      ...(media.width === 'Max37_5'
        ? {
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }
        : {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }),
    },
    headerLeft: {
      flexDirection: 'row',
      flexGrow: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
      ...(media.width === 'Max37_5'
        ? {
            width: '100%',
          }
        : {}),
    },
    headerLogo: {
      borderRadius: 50,
      overflow: 'hidden',
      backgroundColor: '#0062b9',
      ...(media.width === 'Max56_25'
        ? {
            width: 4.5 * media.rem,
            height: 4.5 * media.rem,
            marginRight: 1.2 * media.rem,
          }
        : {
            width: 5 * media.rem,
            height: 5 * media.rem,
            marginRight: 1.5 * media.rem,
          }),
    },
    headerLogoImg: {
      width: '100%',
      height: '100%',
    },
    headerSub: {
      flexGrow: 0,
      fontSize: 1.8 * media.rem,
      lineHeight: 1.5 * 1.8 * media.rem,
      //fontWeight: 700,
      letterSpacing: 1,
      textTransform: 'uppercase',
      justifyContent: 'space-between',
    },

    headerHamburger: {
      flexGrow: 0,
      ...(media.width === 'Max37_5'
        ? {
            display: 'flex',
          }
        : {
            display: 'none',
          }),
    },
    headerSeperator: {
      flexGrow: 1,
    },

    headerNav: {
      flexGrow: 0,
      alignItems: 'center',
      ...(media.width != 'Max37_5'
        ? {
            flexDirection: 'row',
          }
        : showMenu
        ? {}
        : {
            display: 'none',
          }),
    },
    headerNavItem: {
      ...(media.width === 'Max37_5'
        ? {
            //display: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            marginTop: 50,
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
          }
        : {
            flexDirection: 'row',
          }),
    },
    headerNavItemLink: {
      ...linkByMedia(media),
      textTransform: 'uppercase',
      letterSpacing: 1,
      //fontWeight: 700
    },
    hamMenu: {
      width: 3 * media.rem,
      ...paddingStyle(2.2, 0),
      ...(media.width === 'Max37_5'
        ? {
            display: 'flex',
          }
        : {
            display: 'none',
          }),
    },
    hamMenuImg: {
      width: '100%',
      height: '100%',
    },
    hamMenuCloseImg: {
      width: '100%',
      height: '100%',
    },
  });
