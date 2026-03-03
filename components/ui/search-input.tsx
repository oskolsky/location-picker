import { Pressable, StyleSheet, TextInput, View } from 'react-native'

import { RadarIcon, SearchIcon, XIcon } from 'lucide-react-native'

type SearchInputProps = {
    value: string
    placeholder: string
    isLoading: boolean
    onChange: (value: string) => void
    onClear: () => void
    onFocus?: () => void
}

export const SearchInput = ({ value, placeholder, isLoading, onChange, onClear, onFocus }: SearchInputProps) => {
    return (
        <View style={styles.base}>
            {isLoading ? <RadarIcon size={20} strokeWidth={1.5} /> : <SearchIcon size={20} strokeWidth={1.5} />}

            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onFocus={onFocus}
            />

            {value ? (
                <Pressable onPress={onClear}>
                    <XIcon size={20} />
                </Pressable>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 14,
    },
})
