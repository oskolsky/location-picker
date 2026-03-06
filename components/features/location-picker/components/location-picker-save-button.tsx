import { SaveLocation } from '@/components/features/sheets/save-location/save-location'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { usePlaceStore } from '@/utils/stores'

export const LocationPickerSaveButton = () => {
    const overlay = useOverlay()
    const region = usePlaceStore(state => state.region)

    const handleSave = () => {
        overlay.open(
            <SaveLocation
                coordinates={{
                    lat: region.latitude,
                    lng: region.longitude,
                }}
            />,
        )
    }

    return (
        <Button variant="major" onPress={handleSave}>
            Save location
        </Button>
    )
}
