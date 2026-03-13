import { Confirmation } from '@/components/features/sheets/confirmation/confirmation'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { usePlaceStore } from '@/utils/store'
import { Place } from '@/utils/types'

type PreviewCarParkDeleteButtonProps = {
    place: Place
    onCancel: () => void
}

export const PreviewCarParkDeleteButton = ({ place, onCancel }: PreviewCarParkDeleteButtonProps) => {
    const overlay = useOverlay()
    const deletePlace = usePlaceStore(state => state.delete)

    const handlePress = () => {
        overlay.open(
            <Confirmation
                title="Delete location"
                message="Are you sure you want to delete this location?"
                onConfirm={async () => {
                    try {
                        await deletePlace(place.id)
                        overlay.close()
                    } catch (err) {
                        console.error(err)
                    }
                }}
                onCancel={onCancel}
            />,
        )
    }

    return (
        <Button variant="minor" onPress={handlePress}>
            Delete
        </Button>
    )
}
