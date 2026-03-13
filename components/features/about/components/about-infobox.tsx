import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

type AboutInfoBoxProps = {
    children: ReactNode
}

export const AboutInfoBox = ({ children }: AboutInfoBoxProps) => {
    return <View style={styles.base}>{children}</View>
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
})
