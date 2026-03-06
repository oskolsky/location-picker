import { StyleSheet, Text, View } from 'react-native'

type DividerProps = {
    label: string
}

export const Divider = ({ label }: DividerProps) => {
    return (
        <View style={styles.base}>
            <View style={styles.line} />
            <Text style={styles.label}>{label}</Text>
            <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6b7280',
        textTransform: 'uppercase',
    },
})
