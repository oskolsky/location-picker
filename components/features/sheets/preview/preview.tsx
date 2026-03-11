import { StyleSheet, Text, View } from 'react-native'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Place } from '@/utils/types'

import { PreviewCancelButton } from './components/preview-cancel-button'
import { PreviewCopyCoordinatesButton } from './components/preview-copy-coordinates-button'
import { PreviewEditButton } from './components/preview-edit-button'
import { PreviewShowOnMapButton } from './components/preview-show-on-map-button'

type PreviewProps = {
    place: Place
}

export const Preview = ({ place }: PreviewProps) => {
    const overlay = useOverlay()

    const reopenPreview = () => {
        overlay.open(<Preview place={place} />)
    }

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Text style={styles.title}>{place.name}</Text>
                <Text style={styles.message}>Choose an action</Text>
            </View>

            <View style={styles.body}>
                <PreviewShowOnMapButton place={place} />
                <PreviewCopyCoordinatesButton place={place} />
                <PreviewEditButton place={place} onCancel={reopenPreview} />
                <PreviewCancelButton />
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
