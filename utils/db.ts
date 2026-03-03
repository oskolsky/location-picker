import AsyncStorage from '@react-native-async-storage/async-storage'

import { Place } from '@/utils/types'

const STORAGE_KEY = '@places'

export async function getPlaces(): Promise<Place[]> {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY)
        return json ? JSON.parse(json) : []
    } catch (err) {
        console.error('Failed to get places', err)
        return []
    }
}

export async function addPlace(place: Omit<Place, 'id' | 'createdAt' | 'pinnedAt'>) {
    try {
        const places = await getPlaces()
        const newPlace: Place = {
            ...place,
            id: Date.now(),
            pinned: false,
            createdAt: Date.now(),
        }
        places.push(newPlace)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(places))
    } catch (err) {
        console.error('Failed to add place', err)
    }
}

export async function updatePlace(place: Place) {
    try {
        const places = await getPlaces()
        const index = places.findIndex(p => p.id === place.id)
        if (index !== -1) {
            places[index] = place
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(places))
        }
    } catch (err) {
        console.error('Failed to update place', err)
    }
}

export async function deletePlace(id: number) {
    try {
        const places = await getPlaces()
        const filtered = places.filter(p => p.id !== id)
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    } catch (err) {
        console.error('Failed to delete place', err)
    }
}
