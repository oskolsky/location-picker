import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Input } from '@/components/ui/input'
import { SearchType } from '@/utils/enums'
import { convertDMStoDD, detectSearchType, parseDDCoordinates } from '@/utils/helpers'
import { Coordinates } from '@/utils/types'

import { ConverterResult } from './components/converter-result'

export const Converter = () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null)

    const handleConvert = () => {
        setError(null)
        const type = detectSearchType(value)

        if (type === SearchType.DD) {
            const coords = parseDDCoordinates(value)
            if (coords) {
                setCoordinates({ lat: coords.lat, lng: coords.lng })
            } else {
                setError('Invalid DD coordinates')
            }
        } else if (type === SearchType.DMS) {
            const coords = convertDMStoDD(value)
            if (coords) {
                setCoordinates({ lat: coords.lat, lng: coords.lng })
            } else {
                setError('Invalid DMS coordinates')
            }
        } else {
            setError('Could not detect coordinate format')
        }
    }

    const handleReset = () => {
        setValue('')
        setCoordinates(null)
        setError(null)
    }

    return (
        <View style={styles.base}>
            <View style={styles.textBlock}>
                <Text style={styles.title}>GPS Coordinates Converter</Text>
                <Text style={styles.text}>
                    A&nbsp;simple tool to&nbsp;convert coordinates between&nbsp;DD (Decimal Degrees) and DMS (Degrees,
                    Minutes, Seconds) formats. Enter coordinates in&nbsp;either format, and the result will
                    be&nbsp;displayed in&nbsp;both.
                </Text>
            </View>

            <View style={styles.form}>
                <Input
                    value={value}
                    error={error}
                    placeholder="Enter coordinates DD or DMS"
                    onChangeText={val => {
                        setValue(val)
                        if (error) setError(null)
                    }}
                />

                {coordinates ? (
                    <Button variant="minor" onPress={handleReset}>
                        Reset
                    </Button>
                ) : (
                    <Button variant="minor" onPress={handleConvert}>
                        Convert
                    </Button>
                )}

                {coordinates && (
                    <>
                        <Divider label="Result" />
                        <ConverterResult coordinates={coordinates} />
                    </>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    textBlock: {
        marginBottom: 24,
    },
    title: {
        marginBottom: 8,
        fontSize: 18,
        lineHeight: 28,
        fontWeight: '700',
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        color: '#6a7282',
    },
    form: {
        flexDirection: 'column',
        gap: 16,
    },
})
