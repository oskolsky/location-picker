import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

export const PreviewCancelButton = () => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.close()
    }

    return (
        <Button variant="minor" onPress={handleClick}>
            Cancel
        </Button>
    )
}
