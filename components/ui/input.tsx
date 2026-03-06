import { useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

import { TriangleAlertIcon } from 'lucide-react-native'

type InputProps = TextInputProps & {
    error?: string | null
}

export const Input = ({ error, ...rest }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <View style={styles.base}>
            <View style={styles.inputWrapper}>
                <TextInput
                    {...rest}
                    style={[
                        styles.input,
                        error ? styles.errorInput : null,
                        isFocused && !error ? styles.focusedInput : null,
                    ]}
                    onFocus={e => {
                        setIsFocused(true)
                        rest.onFocus?.(e)
                    }}
                    onBlur={e => {
                        setIsFocused(false)
                        rest.onBlur?.(e)
                    }}
                />
                {error && (
                    <View style={styles.iconWrapper}>
                        <TriangleAlertIcon size={16} color="#EF4444" />
                    </View>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    base: {},
    inputWrapper: {
        position: 'relative',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingRight: 40,
        backgroundColor: '#fff',
        fontSize: 14,
        color: '#111827',
    },
    errorInput: {
        borderColor: '#EF4444',
    },
    focusedInput: {
        borderColor: '#9CA3AF', // чуть темнее серого при фокусе
    },
    iconWrapper: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -8 }],
    },
    errorText: {
        marginTop: 4,
        fontSize: 12,
        color: '#EF4444',
    },
})
