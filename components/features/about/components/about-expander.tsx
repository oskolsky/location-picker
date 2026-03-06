import { ReactNode, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { ChevronDown, ChevronRight } from 'lucide-react-native'

type AboutExpanderProps = {
    title: string
    children: ReactNode
}

export const AboutExpander = ({ title, children }: AboutExpanderProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <View>
            <Pressable style={[styles.header, isOpen && styles.headerOpen]} onPress={toggleOpen}>
                <Text style={styles.title}>{title}</Text>
                {isOpen ? <ChevronDown size={20} color="#111827" /> : <ChevronRight size={20} color="#d1d5db" />}
            </Pressable>

            {isOpen && <View style={styles.content}>{children}</View>}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        backgroundColor: '#f9fafb',
    },
    headerOpen: {
        backgroundColor: '#f3f4f6',
    },
    title: {
        fontSize: 16,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 16,
    },
})
