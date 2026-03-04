import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { usePlaceStore } from '@/utils/stores'

import { SavedLocationsItem } from './saved-locations-item'

export const SavedLocationsList = () => {
    const places = usePlaceStore(state => state.places)
    const setCoordinates = usePlaceStore(state => state.setCoordinates)

    return (
        <ScrollView style={styles.base}>
            {places.map(place => (
                <TouchableOpacity
                    key={place.id}
                    onPress={() => {
                        setCoordinates({ lat: place.coordinates.lat, lng: place.coordinates.lng })
                    }}
                >
                    <SavedLocationsItem place={place} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'column',
        columnGap: 8,
    },
})
