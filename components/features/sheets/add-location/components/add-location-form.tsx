import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateDefaultName } from '@/utils/helpers'
import { usePlaceStore } from '@/utils/store'
import { Coordinates, PLACE_TYPES } from '@/utils/types'

type AddLocationFormProps = {
    coordinates: Coordinates
}

export const AddLocationForm = ({ coordinates }: AddLocationFormProps) => {
    const overlay = useOverlay()
    const addPlace = usePlaceStore(state => state.add)

    const [name, setName] = useState(generateDefaultName())
    const [error, setError] = useState<string | null>(null)

    const handlePress = async () => {
        const trimmed = name.trim()

        if (!trimmed) {
            setError('Location name cannot be empty')
            return
        }

        try {
            await addPlace({
                id: Date.now(),
                name: trimmed,
                coordinates,
                categories: null,
                type: PLACE_TYPES.DEFAULT,
                pinned: false,
                createdAt: Date.now(),
            })
            overlay.close()
        } catch (err) {
            console.error('Failed to save location', err)
        }
    }

    return (
        <View style={styles.base}>
            <Input
                value={name}
                error={error}
                placeholder="Location name"
                onChangeText={value => {
                    setName(value)
                    if (error) setError(null)
                }}
            />
            <Button onPress={handlePress} variant="major">
                Save
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        gap: 12,
    },
})
