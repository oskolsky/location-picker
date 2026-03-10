import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native'

import { ChevronLeftIcon, SearchIcon, XIcon } from 'lucide-react-native'

type LocationPickerSearchInputProps = {
    value: string
    isLoading: boolean
    onChange: (value: string) => void
    onClear: () => void
    onBack: () => void
}

export const LocationPickerSearchInput = (props: LocationPickerSearchInputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const borderColor = isFocused ? '#9CA3AF' : '#F3F4F6'

    return (
        <View style={[styles.base, { borderColor }]}>
            <View style={styles.iconWrapper}>
                {props.isLoading ? (
                    <ActivityIndicator size="small" color="#000" />
                ) : (
                    <Pressable onPress={props.onBack} style={styles.clearWrapper} hitSlop={10}>
                        <ChevronLeftIcon size={26} />
                    </Pressable>
                )}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter location or coordinates"
                value={props.value}
                autoFocus={true}
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
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        backgroundColor: '#F3F4F6',
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
