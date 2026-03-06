import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'

import { useRouter } from 'expo-router'
import { MapPinIcon } from 'lucide-react-native'

import { useOverlay } from '@/components/providers/overlay-provider'
import { SearchInput } from '@/components/ui/search-input'
import { usePlaceStore } from '@/utils/stores'
import { SearchItem } from '@/utils/types'

type SearchResponse = {
    items: SearchItem[]
}

const fetcher = async (query: string): Promise<SearchResponse> => {
    const res = await fetch(`https://location-picker.tripadvancer.com/api/search?q=${encodeURIComponent(query)}`)
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}

export const LocationPickerSearch = () => {
    const setRegion = usePlaceStore(state => state.setRegion)

    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)

    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            setIsDropdownVisible(false)
            return
        }

        const handler = setTimeout(async () => {
            setIsLoading(true)
            try {
                const data = await fetcher(query)
                const items = data.items ?? []
                setResults(items)
                setIsDropdownVisible(items.length > 0)
            } catch (err) {
                console.error(err)
                setResults([])
                setIsDropdownVisible(false)
            } finally {
                setIsLoading(false)
            }
        }, 500)

        return () => clearTimeout(handler)
    }, [query])

    const handleSelectItem = (item: SearchItem) => {
        setRegion({
            latitude: item.coordinates.lat,
            longitude: item.coordinates.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        })
        setIsDropdownVisible(false)
        Keyboard.dismiss()
    }

    const handleClear = () => {
        setQuery('')
        setResults([])
        setIsDropdownVisible(false)
    }

    return (
        <View style={styles.base}>
            <SearchInput
                value={query}
                placeholder="Enter location or coordinates"
                variant="gray"
                isLoading={isLoading}
                onChange={setQuery}
                onClear={handleClear}
            />

            {isDropdownVisible && (
                <View style={styles.dropdown}>
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={results}
                        keyExtractor={(_, idx) => `search-item-${idx}`}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => handleSelectItem(item)}
                                style={({ pressed }) => [styles.item, pressed ? styles.itemPressed : null]}
                            >
                                <MapPinIcon size={16} color="#9CA3AF" />
                                <View style={styles.itemText}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemDescription}>{item.description}</Text>
                                </View>
                            </Pressable>
                        )}
                        ListEmptyComponent={() => !isLoading && <Text style={styles.emptyText}>No results found</Text>}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        zIndex: 1000,
    },
    dropdown: {
        position: 'absolute',
        top: 52,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 10,
        maxHeight: 250,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 8,
    },
    itemPressed: {
        backgroundColor: '#F3F4F6',
    },
    itemText: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    itemDescription: {
        fontSize: 12,
        color: '#6B7280',
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 12,
    },
    emptyText: {
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 12,
        color: '#6B7280',
    },
})
