export interface Media {
    rem: number,
}

const useMediaQuery = (): Media => {
    const getMediaFunc = (windowWidth: number): Media => {
        const defaultRem = 16;

        if (windowWidth <= defaultRem * 56.25) {
            return { rem: 16 * 56 / 100 };
        }
        if (windowWidth <= defaultRem * 75) {
            return { rem: 16 * 59 / 100 };
        }

        if (windowWidth >= defaultRem * 112.5) {
            return { rem: 16 * 65 / 100 };
        }

        return { rem: 16 * 62.5 / 100 };
    }

    const [_, setDimensions] = useState({ window, screen });
    const defaultMedia = getMediaFunc(window.width);
    const [media, setMediaValue] = useState(defaultMedia);


    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            (size) => {
                setDimensions({ window: size.window, screen: size.screen });

                const newMedia = getMediaFunc(size.window.width);
                setMediaValue(newMedia);
            }
        );
        return () => subscription?.remove();
    });

    return media;
}

const App = () => {
    const media = useMediaQuery();
    return ( <Header media={media}></Header>);
}

function Header({media}) {
  const styles = stylesFunc(media);

  return <View style={styles.header} />;
}

const stylesFunc = (media: Media) => StyleSheet.create({
    header: {
        lineHeight: 1.5 * media.rem,
    }
})