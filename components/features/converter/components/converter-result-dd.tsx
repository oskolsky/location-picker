import { StyleSheet, Text, View } from 'react-native'

import { Coordinates } from '@/utils/types'

type ConverterResultDdProps = {
    coordinates: Coordinates
}

export const ConverterResultDd = ({ coordinates }: ConverterResultDdProps) => {
    return (
        <View style={styles.base}>
            <Text style={styles.strong}>DD:</Text>
            <Text>{`${coordinates.lat.toFixed(7)}, ${coordinates.lng.toFixed(7)}`} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        gap: 4,
    },
    strong: {
        fontWeight: 700,
    },
})
