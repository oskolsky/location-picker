import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import PinShadow from '@/assets/images/pin-shadow.svg'
import Pin from '@/assets/images/pin.svg'
import { usePlaceStore } from '@/utils/stores'

export const LocationPickerMap = () => {
    const region = usePlaceStore(state => state.region)
    const setRegion = usePlaceStore(state => state.setRegion)
    const [isMoving, setIsMoving] = useState(false)

    return (
        <View style={styles.base}>
            <MapView
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                region={region}
                onRegionChange={() => setIsMoving(true)}
                onRegionChangeComplete={region => {
                    setIsMoving(false)
                    setRegion(region)
                }}
                showsUserLocation
                showsMyLocationButton={true}
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
    pinShadow: {
        position: 'absolute',
        bottom: -7,
    },
})
