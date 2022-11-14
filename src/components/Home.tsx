import { Section } from '@expo/html-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Media } from '../core/hooks/useMediaQuery';
import { MediaProps } from '../props/MediaProps';
import { marginStyle, paddingStyle } from '../resources/AppStyleSheet';
import { H1, Link, Text, P } from './base/components';

interface HomeProps extends MediaProps { }

export const Home = ({ media }: HomeProps) => {
    const styles = stylesFunc(media)

    console.log('media=', media);
    return <Section style={styles.home}>
        <LinearGradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={['rgba(0,98,185,0.8)', 'rgba(0,98,185,0.8)']}
            style={styles.homeLinearGradient}
        >

            <View style={styles.homeContent}>
                <View style={styles.homeContentWrapper}>
                    <H1 style={styles.homeContentH1}>Hey, My name is John Doe</H1>
                    <View style={styles.homeContentHeroInfo}>
                        <Text style={styles.homeContentTextPrimary}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis
                            tempora explicabo quae quod deserunt eius sapiente solutions for
                            complex problems
                        </Text>
                    </View>

                    <View style={styles.homeContentHeroCta}>
                        <View style={styles.homeContentHeroCtaWrapper}>
                            <Link href="./#projects" style={styles.homeContentHeroCtaLink}>Projects</Link>
                        </View>
                    </View>
                </View>
            </View>
        </LinearGradient>
    </Section >
}
const stylesFunc = (media: Media) =>
    StyleSheet.create({
        home: {
            top: 0,
            position: 'absolute',
            // ...(media.widthType != 'Max37_5' ?
            //     {
            //         height: media.height,
            //     } : {
            //         height: 'unset',
            //         minHeight: 'unset',
            //     }),
            maxHeight: 120 * media.rem,
            width: '100%'

        },
        homeLinearGradient: {
            top: 0,
            height: media.height,

            ...(!media.width.isMax37_5em() ?
                {
                    minHeight: 80 * media.rem,
                    maxHeight: 120 * media.rem,
                } : {
                    height: 'unset',
                    minHeight: 'unset',
                }),
            position: 'relative'
        },
        homeContent: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",

            ...(media.width.isMax37_5em() ?
                {
                    ...paddingStyle(19 * media.rem, 0, 13 * media.rem),
                    margin: 'auto'
                } : {
                }),
        },
        homeContentWrapper: {
            maxWidth: 90 * media.rem,
            width: '92%'
        },
        homeContentH1: {
            ...(!media.width.isMax37_5em() ?
                {
                    fontSize: 6 * media.rem,
                } : {
                    fontSize: 4.5 * media.rem,
                }),

            textTransform: 'uppercase',
            letterSpacing: 3,
            textAlign: 'center',
            color: '#ffffff'
        },
        homeContentHeroInfo: {
            ...marginStyle(3 * media.rem, 'auto', 0, 'auto'),
            maxWidth: 80 * media.rem,
        },
        homeContentTextPrimary: {
            color: '#ffffff',
            fontSize: 2.2 * media.rem,
            textAlign: 'center',
            width: '100%',
            lineHeight: 1.6 * 2.2 * media.rem,
        },
        homeContentHeroCta: {
            marginTop: 5 * media.rem,
            textAlign: 'center',
            alignItems: 'center',
        },
        homeContentHeroCtaWrapper: {
            flexDirection: 'row',
        },
        homeContentHeroCtaLink: {
            ...paddingStyle(1.5 * media.rem, 8 * media.rem),
            fontSize: 2 * media.rem,
            flex: 0,

            backgroundColor: '#FFFFFF',
            color: '#333',
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontWeight: '700',
            borderRadius: 5,
            // box-shadow: 0 5px 15px 0 rgb(0 0 0 / 15%);
            // transition: transform .3s;
        }
    });