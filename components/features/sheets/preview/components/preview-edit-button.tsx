import { EditLocation } from '@/components/features/sheets/edit-location/edit-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Place } from '@/utils/types'

type PreviewEditButtonProps = {
    place: Place
    onCancel: () => void
}

export const PreviewEditButton = ({ place, onCancel }: PreviewEditButtonProps) => {
    const overlay = useOverlay()

    const handleClick = () => {
        overlay.open(<EditLocation place={place} onCancel={onCancel} />)
    }

    return (
        <Button variant="minor" onPress={handleClick}>
            Edit
        </Button>
    )
}
