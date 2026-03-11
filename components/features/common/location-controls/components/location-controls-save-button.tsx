import { AddLocation } from '@/components/features/sheets/add-location/add-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Coordinates } from '@/utils/types'

type LocationControlsSaveButtonProps = {
    coordinates: Coordinates
}

export const LocationControlsSaveButton = ({ coordinates }: LocationControlsSaveButtonProps) => {
    const overlay = useOverlay()

    const handleSave = () => {
        overlay.open(<AddLocation coordinates={coordinates} />)
    }

    return (
        <Button variant="major" onPress={handleSave}>
            Save location
        </Button>
    )
}
