import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Coordinates } from '@/utils/types'

type ConverterResultAddressProps = {
    coordinates: Coordinates
}

export const ConverterResultAddress = ({ coordinates }: ConverterResultAddressProps) => {
    const [address, setAddress] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setAddress(null)
        setError(null)
    }, [coordinates.lat, coordinates.lng])

    const handlePress = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await fetch(
                `https://location-picker.tripadvancer.com/api/reverse-geocode?lat=${coordinates.lat}&lon=${coordinates.lng}`,
            )
            if (!res.ok) throw new Error('Failed request')
            const data = await res.json()
            if (data?.address) {
                setAddress(data.address)
            } else {
                setError('No address found')
            }
        } catch (err) {
            setError('Failed to fetch address')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            {!address && (
                <TouchableOpacity onPress={handlePress} style={styles.button} disabled={isLoading}>
                    {isLoading ? (
                        <Text style={styles.buttonText}>Loading ...</Text>
                    ) : (
                        <Text style={styles.buttonText}>Get address</Text>
                    )}
                </TouchableOpacity>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}

            {address && !isLoading && (
                <Text style={styles.address}>
                    <Text style={styles.strong}>Address: </Text>
                    <Text>{address}</Text>
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#eff3ff',
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#1957db',
        fontWeight: '600',
        fontSize: 14,
    },
    errorText: {
        color: '#DC2626',
        marginTop: 4,
        fontSize: 12,
    },
    address: {
        flexDirection: 'row',
        gap: 4,
        fontSize: 14,
        lineHeight: 20,
    },
    strong: {
        fontWeight: '700',
    },
})
