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

            <View style={styles.verticalLine} pointerEvents="none" />
            <View style={styles.horizontalLine} pointerEvents="none" />

            <View pointerEvents="none" style={styles.pinWrapper}>
                <PinShadow width={27} height={41} />
                <Pin width={27} height={41} style={isMoving ? { marginTop: -8 } : undefined} />
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
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -13.5 }, { translateY: -41 }],
    },
    pin: {
        width: 27,
        height: 41,
        resizeMode: 'contain',
        position: 'absolute',
    },
    verticalLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: 1,
        backgroundColor: 'red',
    },
    horizontalLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: 1,
        backgroundColor: 'red',
    },
})
