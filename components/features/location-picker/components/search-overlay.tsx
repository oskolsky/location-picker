import { useEffect, useState } from 'react'
import { FlatList, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native'

import { SearchInput } from '@/components/ui/search-input'
import { usePlaceStore } from '@/utils/stores'
import { SearchItem } from '@/utils/types'

type SearchOverlayProps = {
    visible: boolean
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
    onClose: () => void
}

type SearchResponse = {
    items: SearchItem[]
}

export const SearchOverlay = ({ visible, query, setQuery, onClose }: SearchOverlayProps) => {
    const setCamera = usePlaceStore(state => state.setCamera)

    const [results, setResults] = useState<SearchItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!visible) return

        if (query.length < 2) {
            setResults([])
            setError(null)
            return
        }

        const timeout = setTimeout(async () => {
            setLoading(true)
            setError(null)

            try {
                const res = await fetch(
                    `https://location-picker.tripadvancer.com/api/search?q=${encodeURIComponent(query)}`,
                )

                if (!res.ok) throw new Error('Failed to fetch locations')

                const data: SearchResponse = await res.json()
                setResults(data.items ?? [])
            } catch (e) {
                console.error(e)
                setError('Failed to load results')
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 400)

        return () => clearTimeout(timeout)
    }, [query, visible])

    const selectItem = (item: SearchItem) => {
        setCamera({
            coordinates: {
                lat: Number(item.coordinates.lat),
                lng: Number(item.coordinates.lng),
            },
            zoom: 15,
        })

        setQuery(item.title)

        Keyboard.dismiss()
        onClose()
    }

    if (!visible) return null

    const renderEmptyState = () => {
        if (loading) return null

        if (error) {
            return <Text style={styles.message}>{error}</Text>
        }

        if (query.length === 0) {
            return <Text style={styles.message}>Start typing to search for a location</Text>
        }

        if (query.length < 2) {
            return <Text style={styles.message}>Enter at least 2 characters</Text>
        }

        return <Text style={styles.message}>No locations found</Text>
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <SearchInput
                        value={query}
                        placeholder="Enter location or coordinates"
                        variant="gray"
                        isLoading={loading}
                        autoFocus
                        onChange={setQuery}
                        onClear={() => setQuery('')}
                    />
                </View>

                <Pressable onPress={onClose}>
                    <Text style={styles.cancel}>Cancel</Text>
                </Pressable>
            </View>

            <FlatList
                keyboardShouldPersistTaps="handled"
                data={results}
                keyExtractor={(_, i) => String(i)}
                style={styles.result}
                renderItem={({ item }) => (
                    <Pressable style={styles.item} onPress={() => selectItem(item)}>
                        <View style={styles.itemText}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.desc}>{item.description}</Text>
                        </View>
                    </Pressable>
                )}
                ListEmptyComponent={renderEmptyState}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cancel: {
        color: '#2563EB',
        fontSize: 16,
    },
    result: {
        padding: 12,
    },
    item: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 8,
    },
    itemText: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
    },
    desc: {
        fontSize: 12,
        color: '#6B7280',
    },
    message: {
        textAlign: 'center',
        color: '#6B7280',
        marginTop: 32,
        fontSize: 14,
    },
})
