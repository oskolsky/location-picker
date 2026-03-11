import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/ui/button'

type ConfirmationProps = {
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

export const Confirmation = ({ title, message, onConfirm, onCancel }: ConfirmationProps) => {
    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
            </View>

            <View style={styles.body}>
                <Button variant="major" onPress={onConfirm}>
                    Confirm
                </Button>
                <Button variant="minor" onPress={onCancel}>
                    Cancel
                </Button>
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
