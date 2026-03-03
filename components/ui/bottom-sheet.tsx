import { ReactNode, useEffect, useRef } from 'react'
import { Animated, Dimensions, PanResponder, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SCREEN_HEIGHT = Dimensions.get('window').height

type BottomSheetProps = {
    content: ReactNode
    onClose: () => void
}

export const BottomSheet = ({ content, onClose }: BottomSheetProps) => {
    const insets = useSafeAreaInsets()

    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current
    const overlayOpacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start()
    }, [])

    const closeWithAnimation = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(onClose)
    }

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) => {
                return gesture.dy > 5
            },
            onPanResponderMove: (_, gesture) => {
                if (gesture.dy > 0) {
                    translateY.setValue(gesture.dy)
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dy > 120) {
                    closeWithAnimation()
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start()
                }
            },
        }),
    ).current

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {/* Overlay */}
            <Pressable style={StyleSheet.absoluteFill} onPress={closeWithAnimation}>
                <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
            </Pressable>

            {/* Sheet */}
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.sheet,
                    {
                        paddingBottom: insets.bottom + 24,
                        transform: [{ translateY }],
                    },
                ]}
            >
                <View style={styles.handle} />
                {content}
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 20,
    },
    handle: {
        alignSelf: 'center',
        width: 48,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#d1d5db',
        marginBottom: 16,
    },
})
