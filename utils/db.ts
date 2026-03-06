import AsyncStorage from '@react-native-async-storage/async-storage'

import { Place } from '@/utils/types'

const STORAGE_KEY = '@places'

async function readPlaces(): Promise<Place[]> {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    } catch (error) {
        console.error('Failed to read places', error)
        return []
    }
}

async function savePlaces(places: Place[]): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(places))
    } catch (error) {
        console.error('Failed to save places', error)
    }
}

export async function getPlaces(): Promise<Place[]> {
    return readPlaces()
}

export async function addPlace(place: Omit<Place, 'id' | 'createdAt' | 'pinnedAt'>): Promise<void> {
    const places = await readPlaces()
    await savePlaces([
        ...places,
        {
            ...place,
            id: Date.now(),
            pinned: false,
            createdAt: Date.now(),
        },
    ])
}

export async function updatePlace(updatedPlace: Place): Promise<void> {
    const places = await readPlaces()
    const updated = places.map(place => (place.id === updatedPlace.id ? updatedPlace : place))
    await savePlaces(updated)
}

export async function deletePlace(id: number): Promise<void> {
    const places = await readPlaces()
    const filtered = places.filter(place => place.id !== id)
    await savePlaces(filtered)
}
