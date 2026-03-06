import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePlaceStore } from '@/utils/stores'
import { Place } from '@/utils/types'

type EditLocationProps = {
    place: Place
    onCancel: () => void
}

export const EditLocation = ({ place, onCancel }: EditLocationProps) => {
    const overlay = useOverlay()
    const updatePlace = usePlaceStore(state => state.update)

    const [name, setName] = useState(place.name)
    const [error, setError] = useState<string | null>(null)

    const handleSave = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        try {
            await updatePlace({ ...place, name: trimmed })
            overlay.close()
        } catch (err) {
            console.error('Failed to save location', err)
        }
    }

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Text style={styles.title}>Edit location</Text>
                <Text style={styles.message}>Update the name or delete this location</Text>
            </View>

            <View style={styles.body}>
                <Input
                    value={name}
                    error={error}
                    placeholder="Location name"
                    onChangeText={value => {
                        setName(value)
                        if (error) setError(null)
                    }}
                />
                <Button variant="major" onPress={handleSave}>
                    Save changes
                </Button>
                <Button variant="minor" onPress={onCancel}>
                    Cancel
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
        flexDirection: 'column',
        gap: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 16,
        marginBottom: 16,
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
        flexDirection: 'column',
        gap: 12,
    },
})
