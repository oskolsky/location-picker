import { ReactNode } from 'react'
import { Linking, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

import { ExternalLinkIcon } from 'lucide-react-native'

type ExternalLinkProps = {
    children: ReactNode
    href: string
    style?: ViewStyle
    textStyle?: TextStyle
}

export const ExternalLink = ({ children, href, style, textStyle }: ExternalLinkProps) => {
    const handlePress = () => Linking.openURL(href)

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.base, style]}>
            <Text style={[styles.text, textStyle]}>{children}</Text>
            <ExternalLinkIcon size={12} strokeWidth={2.75} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    text: {
        color: '#3B82F6',
    },
})
