import { StyleSheet, Text, View } from 'react-native'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Place } from '@/utils/types'

import { PreviewCarParkCancelButton } from './components/preview-car-park-cancel-button'
import { PreviewCarParkDeleteButton } from './components/preview-car-park-delete-button'
import { PreviewCarParkShowOnMapButton } from './components/preview-car-park-show-on-map-button'

type PreviewCarParkProps = {
    place: Place
}

export const PreviewCarPark = ({ place }: PreviewCarParkProps) => {
    const overlay = useOverlay()

    const reopenPreview = () => {
        overlay.open(<PreviewCarPark place={place} />)
    }

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Text style={styles.title}>My Car</Text>
                <Text style={styles.message}>Choose an action</Text>
            </View>

            <View style={styles.body}>
                <PreviewCarParkShowOnMapButton place={place} />
                <PreviewCarParkDeleteButton place={place} onCancel={reopenPreview} />
                <PreviewCarParkCancelButton />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        width: '100%',
    },
    header: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 16,
        gap: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    message: {
        fontSize: 12,
        color: '#6B7280',
    },
    body: {
        gap: 12,
    },
})
