import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { PreviewCarPark } from '@/components/features/sheets/preview-car-park/preview-car-park'
import { useOverlay } from '@/components/providers/overlay-provider'
import { formatDuration, formatParkedDate } from '@/utils/date'
import { useElapsedTime } from '@/utils/hooks/use-elapsed-time'
import { Place } from '@/utils/types'

type SavedLocationsCarItemProps = {
    place: Place
}

export const SavedLocationsCarItem = ({ place }: SavedLocationsCarItemProps) => {
    const overlay = useOverlay()
    const elapsed = useElapsedTime(place.createdAt)

    const handleOnPress = () => {
        overlay.open(<PreviewCarPark place={place} />)
    }

    return (
        <TouchableOpacity style={styles.base} onPress={handleOnPress} activeOpacity={0.8}>
            <View style={styles.row}>
                <Text style={styles.name}>My Car</Text>
                <Text style={styles.date}>{place.createdAt ? formatParkedDate(place.createdAt) : ''}</Text>
            </View>

            <Text style={styles.timer}>{formatDuration(elapsed)}</Text>
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
    row: {
        flexDirection: 'column',
        gap: 2,
    },
    name: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
    },
    date: {
        fontSize: 12,
        lineHeight: 16,
        color: '#6B7280',
    },
    timer: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        fontVariant: ['tabular-nums'],
        color: '#111',
    },
})
