import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

export const AddLocationCancelButton = () => {
    const overlay = useOverlay()

    const handlePress = () => {
        overlay.close()
    }

    return (
        <Button onPress={handlePress} variant="minor">
            Cancel
        </Button>
    )
}
