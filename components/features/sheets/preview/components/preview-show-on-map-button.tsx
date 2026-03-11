import { useRouter } from 'expo-router'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { usePlaceStore } from '@/utils/stores'
import { Place } from '@/utils/types'

type PreviewShowOnMapButtonProps = {
    place: Place
}

export const PreviewShowOnMapButton = ({ place }: PreviewShowOnMapButtonProps) => {
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
