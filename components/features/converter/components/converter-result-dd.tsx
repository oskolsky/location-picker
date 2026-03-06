import { StyleSheet, Text } from 'react-native'

import { Coordinates } from '@/utils/types'

type ConverterResultDdProps = {
    coordinates: Coordinates
}

export const ConverterResultDd = ({ coordinates }: ConverterResultDdProps) => {
    return (
        <Text style={styles.base}>
            <Text style={styles.strong}>DD:</Text>
            <Text>{`${coordinates.lat.toFixed(7)}, ${coordinates.lng.toFixed(7)}`} </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        gap: 4,
        fontSize: 14,
        lineHeight: 20,
    },
    strong: {
        fontWeight: 700,
    },
})
