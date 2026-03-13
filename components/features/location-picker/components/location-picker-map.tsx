import { useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { Camera, CircleLayer, MapView, ShapeSource, UserLocation } from '@maplibre/maplibre-react-native'
import { CameraRef } from '@maplibre/maplibre-react-native'
import { FeatureCollection, Point } from 'geojson'
import { LocateFixedIcon } from 'lucide-react-native'

import PinShadow from '@/assets/images/pin-shadow.svg'
import Pin from '@/assets/images/pin.svg'
import { usePlaceStore } from '@/utils/store'

export const LocationPickerMap = () => {
    const camera = usePlaceStore(state => state.camera)
    const places = usePlaceStore(state => state.places)
    const setCamera = usePlaceStore(state => state.setCamera)
    const loadPlaces = usePlaceStore(state => state.load)

    const cameraRef = useRef<CameraRef | null>(null)
    const hasCenteredOnUser = useRef(false)
    const isProgrammaticRef = useRef(false)

    const [isMoving, setIsMoving] = useState(false)
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

    useEffect(() => {
        loadPlaces()
    }, [])

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

    const goToUserLocation = () => {
        if (!userLocation) return

        setCamera({
            coordinates: {
                lat: userLocation.lat,
                lng: userLocation.lng,
            },
            zoom: 15,
        })
    }

    const placesGeoJSON: FeatureCollection<Point> = useMemo(
        () => ({
            type: 'FeatureCollection',
            features: places.map(place => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [place.coordinates.lng, place.coordinates.lat],
                },
                properties: {
                    id: place.id,
                    name: place.name,
                },
            })),
        }),
        [places],
    )

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
                    visible
                    showsUserHeadingIndicator={false}
                    onUpdate={location => {
                        const lat = location.coords.latitude
                        const lng = location.coords.longitude

                        setUserLocation({ lat, lng })

                        if (!hasCenteredOnUser.current) {
                            hasCenteredOnUser.current = true

                            setCamera({
                                coordinates: { lat, lng },
                                zoom: 15,
                            })
                        }
                    }}
                />

                <ShapeSource id="places-source" shape={placesGeoJSON}>
                    <CircleLayer
                        id="places-layer"
                        style={{
                            circleRadius: 6,
                            circleColor: '#F97316',
                            circleStrokeWidth: 2,
                            circleStrokeColor: '#ffffff',
                        }}
                    />
                </ShapeSource>
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
