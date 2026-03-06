'use client'

import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Coordinates } from '@/utils/types'

type Direction = 'N' | 'S' | 'E' | 'W'

function getDirection(value: number, isLat: boolean): Direction {
    if (isLat) {
        return value >= 0 ? 'N' : 'S'
    }
    return value >= 0 ? 'E' : 'W'
}

function toDMS(value: number, isLat: boolean): string {
    const absolute = Math.abs(value)

    const degrees = Math.floor(absolute)
    const minutesFull = (absolute - degrees) * 60
    const minutes = Math.floor(minutesFull)
    const seconds = (minutesFull - minutes) * 60

    const direction = getDirection(value === 0 ? 0 : value, isLat)

    return `${degrees}°${minutes}'${seconds.toFixed(1)}"${direction}`
}

type ConverterResultDmsProps = {
    coordinates: Coordinates
}

export const ConverterResultDms = ({ coordinates }: ConverterResultDmsProps) => {
    const formatted = useMemo(() => {
        const lat = toDMS(coordinates.lat, true)
        const lng = toDMS(coordinates.lng, false)
        return `${lat} ${lng}`
    }, [coordinates.lat, coordinates.lng])

    return (
        <View style={styles.base}>
            <Text style={styles.strong}>DMS:</Text>
            <Text>{formatted}</Text>
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
