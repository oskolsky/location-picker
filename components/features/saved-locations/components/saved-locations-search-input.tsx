import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native'

import { SearchIcon, XIcon } from 'lucide-react-native'

type SavedLocationsSearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClear: () => void
}

export const SavedLocationsSearchInput = (props: SavedLocationsSearchInputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const borderColor = isFocused ? '#9CA3AF' : '#D1D5DB'

    return (
        <View style={[styles.base, { borderColor }]}>
            <View style={styles.iconWrapper}>
                {props.isLoading ? (
                    <ActivityIndicator size="small" color="#000" />
                ) : (
                    <SearchIcon size={20} strokeWidth={1.5} />
                )}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Search by name..."
                value={props.value}
                onChangeText={props.onChange}
                onFocus={() => {
                    setIsFocused(true)
                }}
                onBlur={() => setIsFocused(false)}
            />

            {props.value ? (
                <Pressable onPress={props.onClear} style={styles.clearWrapper}>
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
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: '#fff',
    },
    iconWrapper: {
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 14,
    },
})
