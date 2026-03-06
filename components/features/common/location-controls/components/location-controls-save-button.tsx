import { SaveLocation } from '@/components/features/sheets/save-location/save-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Coordinates } from '@/utils/types'

type LocationControlsSaveButtonProps = {
    coordinates: Coordinates
}

export const LocationControlsSaveButton = ({ coordinates }: LocationControlsSaveButtonProps) => {
    const overlay = useOverlay()

    const handleSave = () => {
        overlay.open(<SaveLocation coordinates={coordinates} />)
    }

    return (
        <Button variant="major" onPress={handleSave}>
            Save location
        </Button>
    )
}
