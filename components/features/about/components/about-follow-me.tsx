import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'

import { ExternalLinkIcon } from 'lucide-react-native'

type LinkItem = {
    title: string
    url: string
}

const LINKS: LinkItem[] = [
    { title: 'Twitter', url: 'https://x.com/oskolsky_maxim' },
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/oskolsky' },
    { title: 'Tripadvancer', url: 'https://www.tripadvancer.com/users/oskolsky' },
    { title: 'GitHub', url: 'https://github.com/oskolsky' },
    { title: 'Email', url: 'mailto:oskolsky.maxim@gmail.com' },
]

export const AboutFollowMe = () => {
    const openLink = (url: string) => Linking.openURL(url)

    return (
        <View style={styles.base}>
            {LINKS.map(link => (
                <Pressable key={link.url} style={styles.row} onPress={() => openLink(link.url)}>
                    <Text style={styles.bullet}>•</Text>
                    <View style={styles.link}>
                        <Text style={styles.linkTitle}>{link.title}</Text>
                        <ExternalLinkIcon size={13} strokeWidth={2.25} color="#2563eb" />
                    </View>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    bullet: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 22,
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        flex: 0,
    },
    linkTitle: {
        fontSize: 16,
        lineHeight: 22,
        color: '#2563eb',
    },
})
