import { create } from 'zustand'

import * as db from '@/utils/db'
import { MapCamera, Place } from '@/utils/types'

type PlaceStore = {
    places: Place[]
    camera: MapCamera

    load: () => Promise<void>
    add: (place: Omit<Place, 'id' | 'createdAt' | 'pinnedAt'>) => Promise<void>
    update: (place: Place) => Promise<void>
    delete: (id: number) => Promise<void>

    setCamera: (camera: MapCamera) => void
}

export const usePlaceStore = create<PlaceStore>(set => ({
    places: [],

    camera: {
        coordinates: { lat: 51.47722, lng: 0 },
        zoom: 2,
    },

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

    setCamera: camera => set({ camera }),
}))
