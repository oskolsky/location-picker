import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import PinShadow from '@/assets/images/pin-shadow.svg'
import Pin from '@/assets/images/pin.svg'

export const LocationPickerMap = () => {
    const [isMoving, setIsMoving] = useState(false)

    return (
        <View style={styles.base}>
            <MapView
                style={StyleSheet.absoluteFill}
                initialRegion={{
                    latitude: 51.47722,
                    longitude: 0.0,
                    latitudeDelta: 20,
                    longitudeDelta: 20,
                }}
                provider={PROVIDER_GOOGLE}
                onRegionChange={() => setIsMoving(true)}
                onRegionChangeComplete={() => setIsMoving(false)}
            />

            <View pointerEvents="none" style={styles.pinWrapper}>
                <PinShadow width={27} height={41} style={styles.pinShadow} />
                <Pin width={27} height={41} style={[styles.pin, isMoving ? { bottom: 0 } : undefined]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    pinWrapper: {
        width: 27,
        height: 41,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -13.5 }, { translateY: -41 }],
    },
    pin: {
        position: 'absolute',
        bottom: -6,
        width: 27,
        height: 41,
        resizeMode: 'contain',
    },
    pinIsMoving: {
        bottom: 0,
    },
    pinShadow: {
        position: 'absolute',
        bottom: -7,
    },
})
