import { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type AboutInfoBoxProps = {
    children: ReactNode
}

export const AboutInfoBox = ({ children }: AboutInfoBoxProps) => {
    return (
        <View style={styles.base}>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#dbeafe',
        backgroundColor: '#eff6ff',
        gap: 8,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
        color: '#60a5fa',
    },
})
