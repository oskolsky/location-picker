import { StyleSheet, Text } from 'react-native'

import { Tabs } from 'expo-router'
import { CompassIcon, HeartIcon, HouseIcon, InfoIcon } from 'lucide-react-native'

const TABS = [
    { name: 'index', label: 'home', icon: HouseIcon },
    { name: 'saved', label: 'Saved', icon: HeartIcon },
    { name: 'converter', label: 'Converter', icon: CompassIcon },
    { name: 'about', label: 'About', icon: InfoIcon },
]

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: '#6b7280',
                tabBarActiveTintColor: '#f97316',
                tabBarStyle: styles.base,
            }}
        >
            {TABS.map(tab => (
                <Tabs.Screen
                    name={tab.name}
                    options={{
                        tabBarIcon: ({ color }) => <tab.icon size={20} color={color} />,
                        tabBarLabel: ({ color }) => <Text style={{ ...styles.label, color }}>{tab.label}</Text>,
                    }}
                />
            ))}
        </Tabs>
    )
}

const styles = StyleSheet.create({
    base: {
        paddingLeft: 12,
        paddingTop: 8,
        paddingRight: 12,
        borderTopWidth: 1,
        borderTopColor: '#d1d5db',
    },
    label: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
    },
})
