import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { LocationPickerControls } from './components/location-picker-controls'
import { LocationPickerMap } from './components/location-picker-map'
import { SearchBar } from './components/search-bar'
import { SearchOverlay } from './components/search-overlay'

export const LocationPicker = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [query, setQuery] = useState('')

    return (
        <View style={styles.base}>
            <SearchBar value={query} onPress={() => setIsSearchOpen(true)} onClear={() => setQuery('')} />

            <LocationPickerMap />
            <LocationPickerControls />

            <SearchOverlay
                visible={isSearchOpen}
                query={query}
                setQuery={setQuery}
                onClose={() => setIsSearchOpen(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        padding: 16,
        gap: 16,
        backgroundColor: '#fff',
    },
})
