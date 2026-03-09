import { useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Camera, MapView, UserLocation } from '@maplibre/maplibre-react-native'
import { LocateFixedIcon } from 'lucide-react-native'

import PinShadow from '@/assets/images/pin-shadow.svg'
import Pin from '@/assets/images/pin.svg'
import { usePlaceStore } from '@/utils/stores'

export const LocationPickerMap = () => {
    const camera = usePlaceStore(state => state.camera)
    const setCamera = usePlaceStore(state => state.setCamera)

    const cameraRef = useRef(null)
    const isProgrammaticRef = useRef(false)

    const [isMoving, setIsMoving] = useState(false)
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

    useEffect(() => {
        const { lat, lng } = camera.coordinates

        isProgrammaticRef.current = true
        cameraRef.current?.setCamera({
            centerCoordinate: [lng, lat],
            zoomLevel: camera.zoom,
            animationDuration: 200,
        })
    }, [camera.coordinates.lat, camera.coordinates.lng, camera.zoom])

    const zoomIn = () => {
        cameraRef.current?.setCamera({
            zoomLevel: camera.zoom + 1,
        })
    }

    const zoomOut = () => {
        cameraRef.current?.setCamera({
            zoomLevel: camera.zoom - 1,
        })
    }

    const goToUserLocation = async () => {
        if (!userLocation) {
            return
        }

        setCamera({ coordinates: { lat: userLocation.lat, lng: userLocation.lng }, zoom: 15 })
    }

    return (
        <View style={styles.base}>
            <MapView
                style={StyleSheet.absoluteFill}
                mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json?api_key=db2f024d-45de-461f-b8c0-f337b13545a4"
                attributionEnabled={false}
                zoomEnabled={true}
                regionDidChangeDebounceTime={10}
                onRegionWillChange={() => setIsMoving(true)}
                onRegionDidChange={feature => {
                    setIsMoving(false)

                    if (isProgrammaticRef.current) {
                        isProgrammaticRef.current = false
                        return
                    }

                    const [lng, lat] = feature.geometry.coordinates
                    const zoom = feature.properties.zoomLevel

                    setCamera({ coordinates: { lat, lng }, zoom })
                }}
            >
                <Camera
                    ref={cameraRef}
                    defaultSettings={{
                        centerCoordinate: [camera.coordinates.lng, camera.coordinates.lat],
                        zoomLevel: camera.zoom,
                    }}
                />

                <UserLocation
                    visible={true}
                    showsUserHeadingIndicator={true}
                    onUpdate={location => {
                        setUserLocation({ lat: location.coords.latitude, lng: location.coords.longitude })
                    }}
                />
            </MapView>

            <View pointerEvents="none" style={styles.pinWrapper}>
                <PinShadow width={27} height={41} style={styles.pinShadow} />
                <Pin width={27} height={41} style={[styles.pin, isMoving ? { bottom: 0 } : undefined]} />
            </View>

            <View style={styles.mapControls}>
                <Pressable style={styles.mapButton} onPress={zoomIn}>
                    <Text style={styles.mapButtonText}>+</Text>
                </Pressable>

                <Pressable style={[styles.mapButton, { marginBottom: 16 }]} onPress={zoomOut}>
                    <Text style={styles.mapButtonText}>−</Text>
                </Pressable>

                <Pressable style={styles.mapButton} onPress={goToUserLocation}>
                    <LocateFixedIcon />
                </Pressable>
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
    mapControls: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        gap: 8,
    },
    mapButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    mapButtonText: {
        fontSize: 22,
        fontWeight: '600',
    },
})
