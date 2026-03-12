import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { CarIcon } from 'lucide-react-native'

import { PreviewCarPark } from '@/components/features/sheets/preview-car-park/preview-car-park'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Place } from '@/utils/types'

type SavedLocationsCarItemProps = {
    place: Place
}

export const SavedLocationsCarItem = ({ place }: SavedLocationsCarItemProps) => {
    const overlay = useOverlay()

    const handleOnPress = () => {
        overlay.open(<PreviewCarPark place={place} />)
    }

    return (
        <TouchableOpacity style={styles.base} onPress={handleOnPress}>
            <View style={styles.name}>
                <Text style={styles.nameText}>My Car</Text>
            </View>
            <CarIcon />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFF7ED',
        borderWidth: 1,
        borderColor: '#FFEDD5',
        borderRadius: 12,
    },
    name: {
        flex: 1,
    },
    nameText: {
        flexShrink: 1,
        flexWrap: 'wrap',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
    },
})
