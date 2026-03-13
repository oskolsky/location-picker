import { LocationControls } from '@/components/features/common/location-controls/location-controls'
import { usePlaceStore } from '@/utils/store'

export const LocationPickerControls = () => {
    const camera = usePlaceStore(state => state.camera)
    return <LocationControls coordinates={camera.coordinates} />
}
