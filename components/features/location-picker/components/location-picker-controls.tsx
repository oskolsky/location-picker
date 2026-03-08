import { LocationControls } from '@/components/features/common/location-controls/location-controls'
import { usePlaceStore } from '@/utils/stores'

export const LocationPickerControls = () => {
    const camera = usePlaceStore(state => state.camera)

    return <LocationControls coordinates={camera.coordinates} />
}
