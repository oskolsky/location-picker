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
    const setRegion = usePlaceStore(state => state.setRegion)

    const handleClick = () => {
        setRegion({
            latitude: place.coordinates.lat,
            longitude: place.coordinates.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        })
        router.push('/')
        overlay.close()
    }

    return (
        <Button variant="major" onPress={handleClick}>
            Show on map
        </Button>
    )
}
