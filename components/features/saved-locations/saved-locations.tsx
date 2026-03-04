import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { usePlaceStore } from '@/utils/stores'

import { SavedLocationsItem } from './components/saved-locations-item'
import { SavedLocationsSearch } from './components/saved-locations-search'

export const SavedLocations = () => {
    const places = usePlaceStore(state => state.places)
    const loadPlaces = usePlaceStore(state => state.load)

    useEffect(() => {
        loadPlaces()
    }, [])

    const regular = places.filter(place => !place.pinned).sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))

    return (
        <View style={styles.base}>
            <View style={styles.search}>
                <SavedLocationsSearch />
            </View>

            <FlatList
                data={regular}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <SavedLocationsItem place={item} />}
                ListEmptyComponent={() =>
                    places.length === 0 ? (
                        <Text style={styles.emptyText}>You have no saved locations yet.</Text>
                    ) : (
                        <Text style={styles.emptyText}>No locations match your search.</Text>
                    )
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 8,
    },
    search: {
        padding: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6B7280',
        marginTop: 16,
    },
})
