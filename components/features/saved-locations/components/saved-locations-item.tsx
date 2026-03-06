import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { PinIcon } from 'lucide-react-native'

import { Preview } from '@/components/features/sheets/preview/preview'
import { useOverlay } from '@/components/providers/overlay-provider'
import { usePlaceStore } from '@/utils/stores'
import { Place } from '@/utils/types'

type SavedLocationsItemProps = {
    place: Place
}

export const SavedLocationsItem = ({ place }: SavedLocationsItemProps) => {
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
        <View style={styles.base}>
            <TouchableOpacity style={styles.name} onPress={handleOnPress}>
                <Text style={styles.nameText}>{place.name}</Text>
            </TouchableOpacity>

            <Pressable style={styles.icon} onPress={handleOnPin}>
                <PinIcon size={18} color={place.pinned ? '#000000' : '#9CA3AF'} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        borderRadius: 12,
    },
    name: {
        flex: 1,
        padding: 16,
    },
    nameText: {
        flexShrink: 1,
        flexWrap: 'wrap',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
    },
    icon: {
        padding: 16,
    },
})
