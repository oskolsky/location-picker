import AsyncStorage from '@react-native-async-storage/async-storage'

import { Place, StorageSchema } from '@/utils/types'

const STORAGE_KEY = '@places'

async function readStorage(): Promise<StorageSchema> {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : { places: [] }
    } catch (error) {
        console.error('Failed to read storage', error)
        return { places: [] }
    }
}

async function saveStorage(storage: StorageSchema): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
    } catch (error) {
        console.error('Failed to save storage', error)
    }
}

export async function getPlaces(): Promise<Place[]> {
    const storage = await readStorage()
    return storage.places
}

export async function addPlace(newPlace: Place): Promise<void> {
    const storage = await readStorage()
    storage.places.push(newPlace)
    await saveStorage(storage)
}

export async function updatePlace(updatedPlace: Place): Promise<void> {
    const storage = await readStorage()
    storage.places = storage.places.map(place => (place.id === updatedPlace.id ? updatedPlace : place))
    await saveStorage(storage)
}

export async function deletePlace(id: number): Promise<void> {
    const storage = await readStorage()
    storage.places = storage.places.filter(place => place.id !== id)
    await saveStorage(storage)
}
