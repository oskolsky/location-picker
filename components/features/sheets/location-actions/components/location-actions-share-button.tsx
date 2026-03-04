import { Alert, Share } from 'react-native'

import { Button } from '@/components/ui/button'

type LocationActionsShareButtonProps = {
    link: string
}

export const LocationActionsShareButton = ({ link }: LocationActionsShareButtonProps) => {
    const handleShare = async () => {
        try {
            await Share.share({ message: link })
        } catch (err) {
            console.error('Failed to share link', err)
            Alert.alert('Error', 'Failed to share link')
        }
    }

    return <Button onPress={handleShare}>Share</Button>
}
