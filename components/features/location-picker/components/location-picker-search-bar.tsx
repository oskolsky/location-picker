import { Pressable, StyleSheet, Text, View } from 'react-native'

import { SearchIcon, XIcon } from 'lucide-react-native'

type LocationPickerSearchBarProps = {
    value: string
    onPress: () => void
    onClear: () => void
}

export const LocationPickerSearchBar = ({ value, onPress, onClear }: LocationPickerSearchBarProps) => {
    return (
        <Pressable style={styles.base} onPress={onPress}>
            <View style={styles.iconWrapper}>
                <SearchIcon size={20} />
            </View>

            <Text style={[styles.text, !value && styles.placeholder]} numberOfLines={1}>
                {value || 'Enter location or coordinates'}
            </Text>

            {value ? (
                <Pressable onPress={onClear} style={styles.clearWrapper} hitSlop={10}>
                    <XIcon size={20} />
                </Pressable>
            ) : null}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        backgroundColor: '#F3F4F6',
    },
    iconWrapper: {
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    text: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 14,
        color: '#111827',
    },
    placeholder: {
        color: '#9CA3AF',
    },
})
