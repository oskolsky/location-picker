import { StyleSheet, Text, View } from 'react-native'

import { Confirmation } from '@/components/features/sheets/confirmation/confirmation'
import { useOverlay } from '@/components/providers/overlay-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const EditLocation = () => {
    const overlay = useOverlay()

    const handleDelete = () => {
        overlay.open(
            <Confirmation
                title="Delete location"
                message="Are you sure you want to delete this location?"
                onConfirm={() => {}}
                onCancel={() => overlay.open(<EditLocation />)}
            />,
        )
    }

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Text style={styles.title}>Edit location</Text>
                <Text style={styles.message}>Update the name or delete this location</Text>
            </View>

            <View style={styles.body}>
                <Input placeholder="Location name" value="" onChangeText={text => {}} />
                <Button variant="orange" onPress={() => {}}>
                    Save changes
                </Button>
                <Button onPress={handleDelete}>Delete location</Button>
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
        flexDirection: 'column',
        gap: 12,
    },
})
