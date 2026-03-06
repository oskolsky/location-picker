import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { LocationActions } from '@/components/features/sheets/location-actions/location-actions'
import { useOverlay } from '@/components/providers/overlay-provider'
import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'
import { usePlaceStore } from '@/utils/stores'

export const LocationPickerControls = () => {
    const overlay = useOverlay()
    const region = usePlaceStore(state => state.region)

    const handlePress = (navigator: Navigator) => {
        overlay.open(
            <LocationActions
                navigator={navigator}
                coordinates={{
                    lat: region.latitude,
                    lng: region.longitude,
                }}
            />,
        )
    }

    return (
        <View style={styles.base}>
            {NAVIGATORS.map(nav => (
                <Pressable
                    key={nav.id}
                    style={({ pressed }) => [styles.navButton, pressed ? styles.navButtonPressed : null]}
                    onPress={() => handlePress(nav.id)}
                >
                    <Image source={nav.image} style={styles.icon} resizeMode="contain" />
                    <Text style={styles.label}>{nav.name}</Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
    },
    navButton: {
        width: '23%',
        height: 80,
        backgroundColor: '#FFF7ED',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: 8,
    },
    navButtonPressed: {
        backgroundColor: '#FFEDD5',
    },
    icon: {
        width: 32,
        height: 32,
        marginBottom: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
        color: '#111827',
    },
})
