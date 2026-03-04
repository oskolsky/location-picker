import { ReactNode } from 'react'
import { Dimensions, PanResponder, Pressable, StyleSheet, View } from 'react-native'
import { useKeyboardHandler } from 'react-native-keyboard-controller'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scheduleOnRN } from 'react-native-worklets'

const SCREEN_HEIGHT = Dimensions.get('window').height

type BottomSheetProps = {
    content: ReactNode
    onClose: () => void
}

export const BottomSheet = ({ content, onClose }: BottomSheetProps) => {
    const insets = useSafeAreaInsets()

    const dragY = useSharedValue(SCREEN_HEIGHT)
    const keyboardHeight = useSharedValue(0)
    const overlayOpacity = useSharedValue(0)

    // Keyboard handling
    useKeyboardHandler(
        {
            onMove: event => {
                'worklet'
                keyboardHeight.value = Math.max(event.height - insets.bottom, 0)
            },
        },
        [],
    )

    // Animated styles
    const sheetStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: dragY.value - keyboardHeight.value,
                },
            ],
            paddingBottom: insets.bottom + 24,
        }
    })

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }))

    // Open animation
    dragY.value = withTiming(0, { duration: 300 })
    overlayOpacity.value = withTiming(1, { duration: 300 })

    // Close function
    const closeWithAnimation = () => {
        overlayOpacity.value = withTiming(0, { duration: 250 })
        dragY.value = withTiming(SCREEN_HEIGHT, { duration: 250 }, () => {
            scheduleOnRN(onClose)
        })
    }

    // PanResponder for drag
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => {
            return gesture.dy > 5
        },
        onPanResponderMove: (_, gesture) => {
            if (gesture.dy > 0) dragY.value = gesture.dy
        },
        onPanResponderRelease: (_, gesture) => {
            if (gesture.dy > 120) {
                scheduleOnRN(closeWithAnimation)
            } else {
                dragY.value = withSpring(0)
            }
        },
    })

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {/* Overlay */}
            <Pressable style={StyleSheet.absoluteFill} onPress={closeWithAnimation}>
                <Animated.View style={[styles.overlay, overlayStyle]} />
            </Pressable>

            {/* Sheet */}
            <Animated.View {...panResponder.panHandlers} style={[styles.sheet, sheetStyle]}>
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
