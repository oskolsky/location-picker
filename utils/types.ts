export const PLACE_TYPES = {
    DEFAULT: 'default',
} as const

export type PlaceType = (typeof PLACE_TYPES)[keyof typeof PLACE_TYPES]

export type Coordinates = {
    lat: number
    lng: number
}

export type MapCamera = {
    coordinates: Coordinates
    zoom: number
}

export type SearchItem = {
    title: string
    description: string
    coordinates: Coordinates
}

export type Place = {
    id: number
    name: string
    coordinates: Coordinates
    categories: null
    type: PlaceType
    pinned?: boolean
    createdAt: number
    pinnedAt?: number
}

export type StorageSchema = {
    places: Place[]
}
