import { StyleSheet, View } from 'react-native'

import { LocationControls } from '@/components/features/common/location-controls/location-controls'
import { Coordinates } from '@/utils/types'

import { ConverterResultDd } from './converter-result-dd'
import { ConverterResultDms } from './converter-result-dms'

type ConverterResultProps = {
    coordinates: Coordinates
}

export const ConverterResult = ({ coordinates }: ConverterResultProps) => {
    return (
        <View style={styles.base}>
            <View style={styles.result}>
                <ConverterResultDd coordinates={coordinates} />
                <ConverterResultDms coordinates={coordinates} />
                {/* <ConverterResultAddress coordinates={coordinates} /> */}
            </View>
            <LocationControls coordinates={coordinates} />
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'column',
        gap: 16,
    },
    result: {
        flexDirection: 'column',
        gap: 4,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        backgroundColor: '#f9fafb',
        fontSize: 14,
        lineHeight: 20,
    },
})
