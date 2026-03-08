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

export interface Place {
    id: number
    name: string
    coordinates: Coordinates
    pinned?: boolean
    createdAt: number
    pinnedAt?: number
}
