import { SearchInput } from '@/components/ui/search-input'

export const SavedLocationsSearch = () => {
    return (
        <SearchInput
            value=""
            placeholder="Search by name..."
            variant="white"
            isLoading={false}
            onChange={() => {}}
            onClear={() => {}}
            onFocus={() => {}}
        />
    )
}
