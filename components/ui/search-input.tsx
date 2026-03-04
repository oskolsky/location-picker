import { Pressable, StyleSheet, TextInput, View } from 'react-native'

import { RadarIcon, SearchIcon, XIcon } from 'lucide-react-native'

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
    return (
        <View style={[styles.base, props.variant === 'white' ? styles.whiteVariant : styles.grayVariant]}>
            {props.isLoading ? <RadarIcon size={20} strokeWidth={1.5} /> : <SearchIcon size={20} strokeWidth={1.5} />}

            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChange}
                onFocus={props.onFocus}
            />

            {props.value ? (
                <Pressable onPress={props.onClear}>
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
        boxSizing: 'border-box',
    },
    grayVariant: {
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    whiteVariant: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 14,
    },
})
