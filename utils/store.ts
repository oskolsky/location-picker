import { create } from 'zustand'

import * as storage from '@/utils/storage'
import { MapCamera, Place } from '@/utils/types'

type PlaceStore = {
    places: Place[]
    camera: MapCamera

    load: () => Promise<void>

    add: (place: Place) => Promise<void>
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
        const places = await storage.getPlaces()
        set({ places })
    },

    add: async place => {
        await storage.addPlace(place)
        const places = await storage.getPlaces()
        set({ places })
    },

    update: async place => {
        await storage.updatePlace(place)
        const places = await storage.getPlaces()
        set({ places })
    },

    delete: async id => {
        await storage.deletePlace(id)
        const places = await storage.getPlaces()
        set({ places })
    },

    setCamera: camera => set({ camera }),
}))
