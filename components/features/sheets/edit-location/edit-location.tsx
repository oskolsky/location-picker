import { StyleSheet, Text, View } from 'react-native'

import { useOverlay } from '@/components/providers/overlay-provider'
import { Place } from '@/utils/types'

import { EditLocationCancelButton } from './components/edit-location-cancel-button'
import { EditLocationDeleteButton } from './components/edit-location-delete-button'
import { EditLocationForm } from './components/edit-location-form'

type EditLocationProps = {
    place: Place
    onCancel: () => void
}

export const EditLocation = ({ place, onCancel }: EditLocationProps) => {
    const overlay = useOverlay()

    const reopenEditLocation = () => {
        overlay.open(<EditLocation place={place} onCancel={onCancel} />)
    }

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Text style={styles.title}>Edit location</Text>
                <Text style={styles.message}>Update the name or delete this location</Text>
            </View>

            <View style={styles.body}>
                <EditLocationForm place={place} />
                <EditLocationDeleteButton place={place} onCancel={reopenEditLocation} />
                <EditLocationCancelButton onCancel={onCancel} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        width: '100%',
    },
    header: {
        flexDirection: 'column',
        gap: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 16,
        marginBottom: 16,
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
