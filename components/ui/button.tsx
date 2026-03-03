import { ReactNode } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

type ButtonProps = {
    children: ReactNode
    variant?: 'orange' | 'gray'
    disabled?: boolean
    onPress?: () => void
}

export const Button = ({ children, variant = 'gray', disabled, onPress }: ButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.base,
                variant === 'orange' ? styles.orange : styles.gray,
                pressed && !disabled ? (variant === 'orange' ? styles.orangePressed : styles.grayPressed) : null,
                disabled ? styles.disabled : null,
            ]}
        >
            <Text style={[styles.text, variant === 'gray' ? styles.grayText : null]}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    base: {
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    disabled: {
        opacity: 0.5,
    },

    // Orange variant
    orange: {
        backgroundColor: '#F97316',
    },
    orangePressed: {
        backgroundColor: '#FB923C',
    },

    // Gray variant
    gray: {
        backgroundColor: '#E5E7EB',
    },
    grayPressed: {
        backgroundColor: '#D1D5DB',
    },
    grayText: {
        color: '#111827',
    },
})
