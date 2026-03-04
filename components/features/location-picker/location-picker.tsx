import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Coordinates } from '@/utils/types'

import { LocationPickerControls } from './components/location-picker-controls'
import { LocationPickerMap } from './components/location-picker-map'
import { LocationPickerSaveButton } from './components/location-picker-save-button'
import { LocationPickerSearch } from './components/location-picker-search'

export const LocationPicker = () => {
    const [coordinates, setCoordinates] = useState<Coordinates>({
        lat: 51.47722,
        lng: 0.0,
    })

    return (
        <View style={styles.base}>
            <LocationPickerSearch />
            <LocationPickerMap
                coordinates={coordinates}
                onRegionChangeComplete={coordinates => {
                    setCoordinates(coordinates)
                }}
            />
            <LocationPickerControls coordinates={coordinates} />
            <LocationPickerSaveButton coordinates={coordinates} />
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        gap: 16,
        padding: 16,
        backgroundColor: '#fff',
    },
})
