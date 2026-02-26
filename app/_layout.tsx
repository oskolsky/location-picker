import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Stack } from 'expo-router'

import { Header } from '@/components/layout/header'

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Header />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </SafeAreaProvider>
    )
}
