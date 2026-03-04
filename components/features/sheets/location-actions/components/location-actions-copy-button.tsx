import { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import * as Clipboard from 'expo-clipboard'
import { CheckIcon } from 'lucide-react-native'

import { Button } from '@/components/ui/button'

type LocationActionsCopyButtonProps = {
    link: string
}

export const LocationActionsCopyButton = ({ link }: LocationActionsCopyButtonProps) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await Clipboard.setStringAsync(link)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy link', err)
            Alert.alert('Error', 'Failed to copy link')
        }
    }

    return (
        <Button variant="minor" onPress={handleCopy}>
            {copied ? (
                <View style={styles.base}>
                    <CheckIcon size={16} color="#16A34A" />
                    <Text style={styles.text}>Copied</Text>
                </View>
            ) : (
                'Copy link'
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
