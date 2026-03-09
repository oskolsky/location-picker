import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native'

import { SearchIcon, XIcon } from 'lucide-react-native'

type SearchInputProps = {
    value: string
    placeholder: string
    variant?: 'gray' | 'white'
    isLoading: boolean
    onChange: (value: string) => void
    onClear: () => void
    onFocus?: () => void
}

export const SearchInput = (props: SearchInputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const borderColor = isFocused ? '#9CA3AF' : props.variant === 'white' ? '#D1D5DB' : '#F3F4F6'

    return (
        <View style={[styles.base, { borderColor, backgroundColor: props.variant === 'white' ? '#fff' : '#F3F4F6' }]}>
            <View style={styles.iconWrapper}>
                {props.isLoading ? (
                    <ActivityIndicator size="small" color="#000" />
                ) : (
                    <SearchIcon size={20} strokeWidth={1.5} />
                )}
            </View>

            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChange}
                onFocus={() => {
                    setIsFocused(true)
                    props.onFocus?.()
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
