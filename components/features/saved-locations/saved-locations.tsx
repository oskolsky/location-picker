import { useEffect, useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { PencilIcon, PinIcon } from 'lucide-react-native'

import { getPlaces, updatePlace } from '@/utils/db'
import { Place } from '@/utils/types'

export const SavedLocations = ({ onSelectPlace }: { onSelectPlace?: (place: Place) => void }) => {
    const [places, setPlaces] = useState<Place[]>([])
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadPlaces()
    }, [])

    const loadPlaces = async () => {
        setIsLoading(true)
        const savedPlaces = await getPlaces()
        setPlaces(savedPlaces)
        setIsLoading(false)
    }

    const { pinnedPlaces, regularPlaces } = useMemo(() => {
        let result = [...places]
        if (search.trim()) {
            result = result.filter(place => place.name.toLowerCase().includes(search.toLowerCase()))
        }
        const pinned = result.filter(p => p.pinned).sort((a, b) => (b.pinnedAt ?? 0) - (a.pinnedAt ?? 0))
        const regular = result.filter(p => !p.pinned).sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
        return { pinnedPlaces: pinned, regularPlaces: regular }
    }, [places, search])

    const handleClear = () => setSearch('')

    return (
        <View style={{ flex: 1, padding: 12 }}>
            {places.length > 0 && (
                <TextInput
                    style={styles.searchInput}
                    value={search}
                    placeholder="Search by name..."
                    onChangeText={setSearch}
                />
            )}

            <FlatList
                data={[...pinnedPlaces, ...regularPlaces]}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <SavedLocationsItem place={item} onLoadPlaces={loadPlaces} onSelectPlace={onSelectPlace} />
                )}
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

const SavedLocationsItem = ({
    place,
    onLoadPlaces,
    onSelectPlace,
}: {
    place: Place
    onLoadPlaces: () => void
    onSelectPlace?: (place: Place) => void
}) => {
    const handleTogglePin = async () => {
        const isPinned = !!place.pinned
        await updatePlace({ ...place, pinned: !isPinned, pinnedAt: !isPinned ? Date.now() : undefined })
        onLoadPlaces()
    }

    const handleEdit = () => {
        // Здесь можно открыть bottom sheet с EditLocation
        console.log('Edit location', place.name)
    }

    const handleSelect = () => {
        if (onSelectPlace) onSelectPlace(place)
    }

    return (
        <Pressable style={styles.item} onPress={handleSelect}>
            <Text style={styles.name}>{place.name}</Text>
            <View style={styles.actions}>
                <Pressable onPress={handleEdit} style={styles.iconButton}>
                    <PencilIcon size={18} color="#6B7280" />
                </Pressable>
                <Pressable onPress={handleTogglePin} style={styles.iconButton}>
                    <PinIcon size={18} color={place.pinned ? '#000000' : '#9CA3AF'} />
                </Pressable>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 8,
        backgroundColor: '#F9FAFB',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        marginBottom: 6,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        padding: 4,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6B7280',
        marginTop: 16,
    },
})
