import { Image, StyleSheet, Text, View } from 'react-native'

import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'
import { Coordinates } from '@/utils/types'

import { LocationActionsCancelButton } from './components/location-actions-cancel-button'
import { LocationActionsCopyButton } from './components/location-actions-copy-button'
import { LocationActionsOpenButton } from './components/location-actions-open-button'
import { LocationActionsShareButton } from './components/location-actions-share-button'

type LocationActionsProps = {
    navigator: Navigator
    coordinates: Coordinates
}

export const LocationActions = ({ navigator, coordinates }: LocationActionsProps) => {
    const activeNavigator = NAVIGATORS.find(nav => nav.id === navigator)!
    const link = activeNavigator.buildLink(coordinates.lat, coordinates.lng)

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <View style={styles.iconWrapper}>
                    <Image source={activeNavigator.image} style={styles.icon} resizeMode="contain" />
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{activeNavigator.name}</Text>
                    <Text style={styles.message}>Choose an action</Text>
                </View>
            </View>

            <View style={styles.body}>
                <LocationActionsOpenButton link={link} />
                <LocationActionsCopyButton link={link} />
                <LocationActionsShareButton link={link} />
                <LocationActionsCancelButton />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 16,
        marginBottom: 16,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#FFEDD5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    titleWrapper: {
        flex: 1,
        flexDirection: 'column',
        gap: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    message: {
        fontSize: 12,
        color: '#6B7280',
    },
    body: {
        flexDirection: 'column',
        gap: 12,
    },
})
