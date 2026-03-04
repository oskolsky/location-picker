import { create } from 'zustand'

import * as db from '@/utils/db'
import { Coordinates, Place } from '@/utils/types'

type PlaceStore = {
    places: Place[]
    coordinates: Coordinates
    load: () => Promise<void>
    add: (place: Omit<Place, 'id' | 'createdAt' | 'pinnedAt'>) => Promise<void>
    update: (place: Place) => Promise<void>
    delete: (id: number) => Promise<void>
    setCoordinates: (coords: Coordinates) => void
}

export const usePlaceStore = create<PlaceStore>((set, get) => ({
    places: [],
    coordinates: { lat: 51.47722, lng: 0.0 },

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

    setCoordinates: coords => set({ coordinates: coords }),
}))
