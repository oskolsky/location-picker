import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

export const PreviewCancelButton = () => {
    const overlay = useOverlay()

    const handlePress = () => {
        overlay.close()
    }

    return (
        <Button variant="minor" onPress={handlePress}>
            Cancel
        </Button>
    )
}
