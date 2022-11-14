import * as React from 'react';
import * as HE from '@expo/html-elements';
import { UL, LI } from '@expo/html-elements';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useHamburgerMenu from '../core/hooks/useHamburgerMenu';
import { Media } from '../core/hooks/useMediaQuery';
import { MediaProps } from '../props/MediaProps';
import { paddingStyle } from '../resources/AppStyleSheet';
import { Link, Text } from './base/components';

interface HeaderProps extends MediaProps { }

export const Header = ({ media }: HeaderProps) => {
  const { showMenu, setShowMemu } = useHamburgerMenu();

  console.log('media= ', media);
  console.log('media.width.isMax37_5() ', media.width.isMax37_5em());

  const h = (media.width.isMax37_5em()
    ? {
      flexDirection: 'row',
    }
    : showMenu
      ? {}
      : {
        display: 'none',
      });
  console.log('h=', h);

  const insets = useSafeAreaInsets();

  console.log('media.rem', media.rem);
  const styles = stylesFunc(media, insets.top, showMenu);
  return (
    <HE.Header style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.headerLogo}>
          <Image style={styles.headerLogoImg} source={require('../../assets/png/john-doe.png')} />
        </View>
        <Text style={styles.headerSub}>John Doe</Text>
        <View style={styles.headerSeperator} />

        <View style={styles.headerHamburgerWrapper}>
          <TouchableOpacity onPress={() => {
            setShowMemu(!showMenu);
          }}>
            <Image
              style={styles.headerHamburger}
              source={require(showMenu ? '../../assets/svg/ham-menu-close.svg' : '../../assets/svg/ham-menu.svg')}
            />
          </TouchableOpacity>
        </View>
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
    </HE.Header>
  );
};

const linkByMedia = (media: Media) => {
  const style =
    media.width.isMax56_25em()
      ? {
        letterSpacing: 2,
        fontSize: 1.6 * media.rem,
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: '#EEEEEE',
        ...paddingStyle(2.5 * media.rem, 3 * media.rem),
      }
      : {
        letterSpacing: 1,
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
      backgroundColor: '#FFFFFF',
      zIndex: 10000,
      lineHeight: 1.5 * media.rem,

      display: 'flex',
      position: 'relative',
      width: '100%',

      ...(media.width.isMax37_5em()
        ? {
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }
        : {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }),

      ...(!media.width.isMax56_25em()
        ? paddingStyle(Math.max(media.rem, top), 5 * media.rem, media.rem) : {}),

    },
    headerLeft: {
      flexDirection: 'row',
      flexGrow: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
      ...(media.width.isMax56_25em()
        ? paddingStyle(0, 2 * media.rem)
        : {}),

      ...(media.width.isMax37_5em()
        ? {
          width: '100%',
        }
        : {}),
    },
    headerLogo: {
      borderRadius: 50,
      overflow: 'hidden',
      backgroundColor: '#0062b9',
      ...(media.width.isMax56_25em()
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
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
      justifyContent: 'space-between',
    },
    headerHamburgerWrapper: {
      width: 3 * media.rem,
      ...paddingStyle(2.2 * media.rem, 0)
    },
    headerHamburger: {
      width: 3 * media.rem,
      height: 3 * media.rem,
      flexGrow: 0,
      ...(media.width.isMax37_5em()
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
      ...(!media.width.isMax37_5em()
        ? {
          alignItems: 'center',
          flexDirection: 'row',
        }
        : showMenu
          ? {}
          : {
            alignItems: 'flex-end',
            display: 'none',
          }),
    },
    headerNavItem: {
      ...(media.width.isMax37_5em()
        ? {
          position: 'absolute',
          top: 0,
          left: 0,
          marginTop: 50,
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'flex-end',
          alignContent: 'flex-end',
        }
        : {
          flexDirection: 'row',
        }),
    },
    headerNavItemLink: {
      ...linkByMedia(media),
      textTransform: 'uppercase',
      fontWeight: '700',
      flexGrow: 0,
      textAlign: 'right'
    },
    hamMenu: {
      width: 3 * media.rem,
      ...paddingStyle(2.2, 0),
      ...(media.width.isMax37_5em()
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
