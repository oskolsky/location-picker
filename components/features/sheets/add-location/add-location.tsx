import { StyleSheet, Text, View } from 'react-native'

import { Coordinates } from '@/utils/types'

import { AddLocationCancelButton } from './components/add-location-cancel-button'
import { AddLocationForm } from './components/add-location-form'
import { AddLocationParkCarButton } from './components/add-location-park-car-button'

type AddLocationProps = {
    coordinates: Coordinates
}

export const AddLocation = ({ coordinates }: AddLocationProps) => {
    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <Text style={styles.title}>Save location</Text>
                <Text style={styles.message}>Enter a name for this location</Text>
            </View>

            <View style={styles.body}>
                <AddLocationForm coordinates={coordinates} />
                <AddLocationParkCarButton />
                <AddLocationCancelButton />
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
