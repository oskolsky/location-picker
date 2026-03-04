import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Stack } from 'expo-router'

import { OverlayProvider } from '@/components/providers/overlay-provider'
import { Header } from '@/components/ui/header'

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <KeyboardProvider>
                <OverlayProvider>
                    <Header />

                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                    </Stack>
                </OverlayProvider>
            </KeyboardProvider>
        </SafeAreaProvider>
    )
}
