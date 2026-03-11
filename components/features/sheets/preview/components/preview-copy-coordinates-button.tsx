import { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import * as Clipboard from 'expo-clipboard'
import { CheckIcon } from 'lucide-react-native'

import { Button } from '@/components/ui/button'
import { Place } from '@/utils/types'

type PreviewCopyCoordinatesButtonProps = {
    place: Place
}

export const PreviewCopyCoordinatesButton = ({ place }: PreviewCopyCoordinatesButtonProps) => {
    const [copied, setCopied] = useState(false)

    const handlePress = async () => {
        try {
            await Clipboard.setStringAsync(`${place.coordinates.lat}, ${place.coordinates.lng}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy coordinates', err)
            Alert.alert('Error', 'Failed to copy coordinates')
        }
    }

    return (
        <Button variant="minor" onPress={handlePress}>
            {copied ? (
                <View style={styles.base}>
                    <CheckIcon size={16} color="#16A34A" />
                    <Text style={styles.text}>Copied</Text>
                </View>
            ) : (
                'Copy coordinates'
            )}
        </Button>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    text: {
        color: '#16A34A',
    },
})
