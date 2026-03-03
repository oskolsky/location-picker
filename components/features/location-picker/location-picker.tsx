import { StyleSheet, View } from 'react-native'

import { LocationPickerControls } from './components/location-picker-controls'
import { LocationPickerMap } from './components/location-picker-map'
import { LocationPickerSaveButton } from './components/location-picker-save-button'
import { LocationPickerSearch } from './components/location-picker-search'

export const LocationPicker = () => {
    return (
        <View style={styles.base}>
            <LocationPickerSearch />
            <LocationPickerMap />
            <LocationPickerControls />
            <LocationPickerSaveButton />
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
