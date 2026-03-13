import { useRouter } from 'expo-router'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { usePlaceStore } from '@/utils/store'
import { Place } from '@/utils/types'

type PreviewCarParkShowOnMapButtonProps = {
    place: Place
}

export const PreviewCarParkShowOnMapButton = ({ place }: PreviewCarParkShowOnMapButtonProps) => {
    const router = useRouter()
    const overlay = useOverlay()
    const setCamera = usePlaceStore(state => state.setCamera)

    const handlePress = () => {
        setCamera({
            coordinates: {
                lat: place.coordinates.lat,
                lng: place.coordinates.lng,
            },
            zoom: 15,
        })
        router.push('/')
        overlay.close()
    }

    return (
        <Button variant="major" onPress={handlePress}>
            Show on map
        </Button>
    )
}
