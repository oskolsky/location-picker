import { Alert, Linking } from 'react-native'

import { Button } from '@/components/ui/button'

type LocationActionsOpenButtonProps = {
    link: string
}

export const LocationActionsOpenButton = ({ link }: LocationActionsOpenButtonProps) => {
    const handlePress = async () => {
        try {
            const supported = await Linking.canOpenURL(link)
            if (supported) {
                await Linking.openURL(link)
            } else {
                Alert.alert('Cannot open link', 'This URL cannot be opened on your device.')
            }
        } catch (err) {
            console.error('Failed to open link', err)
            Alert.alert('Error', 'Failed to open link')
        }
    }

    return (
        <Button variant="orange" onPress={handlePress}>
            Open
        </Button>
    )
}
