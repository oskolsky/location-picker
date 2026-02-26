import { Linking, ScrollView, StyleSheet, Text } from 'react-native'

export default function AboutScreen() {
    const openLink = (url: string) => {
        Linking.openURL(url)
    }

    return (
        <ScrollView style={styles.base} className="flex flex-col gap-y-4 bg-white p-4">
            <Text style={styles.text}>
                Location Picker is a simple and intuitive mobile app for finding, saving, and sharing locations. Search
                for places by address or by entering coordinates in either DD or DMS format, and quickly open or share
                any location in Google Maps, Waze, Apple Maps, or Yandex Maps.
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        height: '100%',
        padding: 16,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
})
