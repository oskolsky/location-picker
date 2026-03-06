import { Region } from 'react-native-maps'

import { create } from 'zustand'

import * as db from '@/utils/db'
import { Place } from '@/utils/types'

type PlaceStore = {
    places: Place[]
    region: Region

    load: () => Promise<void>
    add: (place: Omit<Place, 'id' | 'createdAt' | 'pinnedAt'>) => Promise<void>
    update: (place: Place) => Promise<void>
    delete: (id: number) => Promise<void>
    setRegion: (region: PlaceStore['region']) => void
}

export const usePlaceStore = create<PlaceStore>((set, get) => ({
    places: [],
    region: { latitude: 51.47722, longitude: 0.0, latitudeDelta: 20, longitudeDelta: 20 },

    load: async () => {
        const places = await db.getPlaces()
        set({ places })
    },

    add: async place => {
        await db.addPlace(place)
        const places = await db.getPlaces()
        set({ places })
    },

    update: async place => {
        await db.updatePlace(place)
        const places = await db.getPlaces()
        set({ places })
    },

    delete: async id => {
        await db.deletePlace(id)
        const places = await db.getPlaces()
        set({ places })
    },

    setRegion: region => set({ region }),
}))
