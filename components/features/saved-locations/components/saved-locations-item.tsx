import { StyleSheet, Text, View } from 'react-native'

import { Place } from '@/utils/types'

type SavedLocationsItemProps = {
    place: Place
}

export const SavedLocationsItem = ({ place }: SavedLocationsItemProps) => {
    return (
        <View style={styles.base}>
            <Text style={styles.name}>{place.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: '#f9fafb',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: '700',
    },
})
