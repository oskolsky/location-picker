import { LocationControls } from '@/components/features/common/location-controls/location-controls'
import { usePlaceStore } from '@/utils/stores'

export const LocationPickerControls = () => {
    const region = usePlaceStore(state => state.region)

    return (
        <LocationControls
            coordinates={{
                lat: region.latitude,
                lng: region.longitude,
            }}
        />
    )
}
