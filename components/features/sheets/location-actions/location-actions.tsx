import { Image, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { NAVIGATORS } from '@/utils/constants'
import { Navigator } from '@/utils/enums'

type LocationActionsProps = {
    navigator: Navigator
}

export const LocationActions = ({ navigator }: LocationActionsProps) => {
    const activeNav = NAVIGATORS.find(n => n.id === navigator)!

    return (
        <View style={styles.base}>
            <View style={styles.header}>
                <View style={styles.iconWrapper}>
                    <Image source={activeNav.image} style={styles.icon} resizeMode="contain" />
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{activeNav.name}</Text>
                    <Text style={styles.message}>Choose an action</Text>
                </View>
            </View>

            <View style={styles.body}>
                <Button variant="orange">Open</Button>
                <Button variant="gray">Copy link</Button>
                <Button variant="gray">Share</Button>
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
