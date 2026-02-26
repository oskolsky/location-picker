import { StyleSheet, Text, View } from 'react-native'

export default function ConverterScreen() {
    return (
        <View style={styles.base} className="flex-1 items-center justify-center p-4">
            <Text className="text-base leading-6">Coordinate Converter view</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        height: '100%',
        padding: 16,
        backgroundColor: '#fff',
    },
})
