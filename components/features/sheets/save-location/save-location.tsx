import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateDefaultName } from '@/utils/helpers'
import { usePlaceStore } from '@/utils/stores'
import { Coordinates } from '@/utils/types'

type SaveLocationProps = {
    coordinates: Coordinates
}

export const SaveLocation = ({ coordinates }: SaveLocationProps) => {
    const overlay = useOverlay()
    const addPlace = usePlaceStore(state => state.add)

    const [name, setName] = useState(generateDefaultName())
    const [error, setError] = useState<string | null>(null)

    const handleSave = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        try {
            await addPlace({ name: trimmed, coordinates })
            overlay.close()
        } catch (err) {
            console.error('Failed to save location', err)
        }
    }

    const handleCancel = () => {
        overlay.close()
    }

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Text style={styles.title}>Save location</Text>
                <Text style={styles.message}>Enter a name for this place</Text>
            </View>

            <View style={styles.body}>
                <Input
                    value={name}
                    error={error}
                    placeholder="Location name"
                    onChangeText={text => {
                        setName(text)
                        if (error) setError(null)
                    }}
                />
                <Button onPress={handleSave} variant="major">
                    Save
                </Button>
                <Button onPress={handleCancel} variant="minor">
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
