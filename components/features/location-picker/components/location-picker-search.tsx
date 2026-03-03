import { SearchInput } from '@/components/ui/search-input'

export const LocationPickerSearch = () => {
    return (
        <SearchInput
            value=""
            placeholder="Enter location or coordinates"
            isLoading={false}
            onChange={() => {}}
            onClear={() => {}}
            onFocus={() => {}}
        />
    )
}
