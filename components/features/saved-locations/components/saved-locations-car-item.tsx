import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { CarIcon } from 'lucide-react-native'

import { Preview } from '@/components/features/sheets/preview/preview'
import { useOverlay } from '@/components/providers/overlay-provider'
import { usePlaceStore } from '@/utils/stores'
import { Place } from '@/utils/types'

type SavedLocationsCarItemProps = {
    place: Place
}

export const SavedLocationsCarItem = ({ place }: SavedLocationsCarItemProps) => {
    const overlay = useOverlay()
    const updatePlace = usePlaceStore(state => state.update)

    const handleOnPress = () => {
        overlay.open(<Preview place={place} />)
    }

    const handleOnPin = async () => {
        const isPinned = !!place.pinned

        await updatePlace({
            ...place,
            pinned: !isPinned,
            pinnedAt: !isPinned ? Date.now() : undefined,
        })
    }

    return (
        <TouchableOpacity style={styles.base} onPress={handleOnPress}>
            <CarIcon />
            <Text style={styles.text}>22.3 m</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF7ED',
        borderWidth: 1,
        borderColor: '#FFEDD5',
        borderRadius: 12,
        flex: 1,
        padding: 16,
    },
    text: {
        flexShrink: 1,
        flexWrap: 'wrap',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
    },
})
