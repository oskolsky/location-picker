import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePlaceStore } from '@/utils/stores'
import { Place } from '@/utils/types'

type EditLocationFormProps = {
    place: Place
}

export const EditLocationForm = ({ place }: EditLocationFormProps) => {
    const overlay = useOverlay()
    const updatePlace = usePlaceStore(state => state.update)

    const [name, setName] = useState(place.name)
    const [error, setError] = useState<string | null>(null)

    const handlePress = async () => {
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
            <Input
                value={name}
                error={error}
                placeholder="Location name"
                onChangeText={value => {
                    setName(value)
                    if (error) setError(null)
                }}
            />
            <Button variant="major" onPress={handlePress}>
                Save changes
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        gap: 12,
    },
})
