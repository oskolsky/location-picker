import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'

import { MapPinCheckIcon } from 'lucide-react-native'

export const Header = () => {
    return (
        <SafeAreaInsetsContext.Consumer>
            {insets => (
                <View style={{ paddingTop: insets?.top, paddingHorizontal: 16 }}>
                    <View style={styles.base}>
                        <MapPinCheckIcon strokeWidth={2.5} color="#000" />
                        <Text style={styles.text}>Location Picker</Text>
                    </View>
                </View>
            )}
        </SafeAreaInsetsContext.Consumer>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#d1d5db',
    },
    text: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
})
