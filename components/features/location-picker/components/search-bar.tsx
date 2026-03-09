import { Pressable, StyleSheet, Text, View } from 'react-native'

import { SearchIcon, XIcon } from 'lucide-react-native'

type SearchBarProps = {
    value: string
    placeholder?: string
    onPress: () => void
    onClear: () => void
}

export const SearchBar = ({
    value,
    placeholder = 'Enter location or coordinates',
    onPress,
    onClear,
}: SearchBarProps) => {
    return (
        <Pressable style={styles.base} onPress={onPress}>
            <View style={styles.iconWrapper}>
                <SearchIcon size={20} strokeWidth={1.5} />
            </View>

            <Text style={[styles.text, !value && styles.placeholder]} numberOfLines={1}>
                {value || placeholder}
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
