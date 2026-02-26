import { StyleSheet, Text } from 'react-native'

import { Tabs } from 'expo-router'
import { CompassIcon, HeartIcon, HouseIcon, InfoIcon } from 'lucide-react-native'

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
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color }) => <HouseIcon size={20} color={color} />,
                    tabBarLabel: ({ color }) => <Text style={{ ...styles.label, color }}>Home</Text>,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    tabBarIcon: ({ color }) => <HeartIcon size={20} color={color} />,
                    tabBarLabel: ({ color }) => <Text style={{ ...styles.label, color }}>Saved</Text>,
                }}
            />
            <Tabs.Screen
                name="converter"
                options={{
                    tabBarIcon: ({ color }) => <CompassIcon size={20} color={color} />,
                    tabBarLabel: ({ color }) => <Text style={{ ...styles.label, color }}>Converter</Text>,
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    tabBarIcon: ({ color }) => <InfoIcon size={20} color={color} />,
                    tabBarLabel: ({ color }) => <Text style={{ ...styles.label, color }}>About</Text>,
                }}
            />
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
