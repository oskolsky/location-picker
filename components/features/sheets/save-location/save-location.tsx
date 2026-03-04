import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addPlace } from '@/utils/db'
import { Coordinates, Place } from '@/utils/types'

type SaveLocationProps = {
    coordinates: Coordinates
}

export const SaveLocation = ({ coordinates }: SaveLocationProps) => {
    const overlay = useOverlay()

    const [name, setName] = useState(generateDefaultName())
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    function generateDefaultName() {
        const now = new Date()
        const date = now.toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        const time = now.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        })
        return `${date} • ${time}`
    }

    const savePlace = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        try {
            setLoading(true)

            const place: Omit<Place, 'id'> = {
                name: trimmed,
                coordinates: coordinates,
                pinned: false,
                createdAt: Date.now(),
                pinnedAt: undefined,
            }

            await addPlace(place)
            overlay.close()
        } catch (err) {
            console.error('Failed to save location', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Text style={styles.title}>Save location</Text>
                <Text style={styles.message}>Enter a name for this place</Text>
            </View>

            <View style={styles.body}>
                <Input
                    placeholder="Location name"
                    value={name}
                    onChangeText={text => {
                        setName(text)
                        if (error) setError(null)
                    }}
                    error={error}
                />
                <Button onPress={savePlace} disabled={loading} variant="orange">
                    Save
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        width: '100%',
    },
    header: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 16,
        gap: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    message: {
        fontSize: 12,
        color: '#6B7280',
    },
    body: {
        gap: 12,
    },
})
