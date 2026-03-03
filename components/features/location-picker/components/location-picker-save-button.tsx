import { SaveLocation } from '@/components/features/sheets/save-location/save-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'

export const LocationPickerSaveButton = () => {
    const overlay = useOverlay()

    const handleSave = () => {
        overlay.open(
            <SaveLocation
                coordinates={{
                    lat: 0,
                    lng: 0,
                }}
            />,
        )
    }

    return (
        <Button variant="orange" onPress={handleSave}>
            Save location
        </Button>
    )
}
