import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { AboutExpander } from './components/about-expander'
import { AboutFollowMe } from './components/about-follow-me'
import { AboutInfoBox } from './components/about-infobox'

export const About = () => {
    return (
        <ScrollView style={styles.base}>
            <View style={styles.container}>
                <Text style={[styles.text, styles.aboutText]}>
                    <Text style={styles.bold}>Location Picker</Text> is a simple and convenient tool for finding,
                    saving, and sharing locations. Search for places using an address or coordinates, then easily open
                    or share them with apps like Google Maps, Waze, Apple Maps, or Yandex Maps.
                </Text>

                <AboutInfoBox>
                    We don’t store any personal data. The saved locations are only stored in your device.
                </AboutInfoBox>

                <AboutExpander title="About">
                    <Text style={styles.text}>Hey everyone!</Text>
                    <Text style={styles.text}>
                        My wife and I spend a lot of time driving and traveling through different countries. Every
                        country has its own favorite navigation apps that work best there. For me, switching between
                        apps is easy, but for my wife—who’s not really into tech—it can be tricky. She usually asks me
                        to send her the destination in a message—not just the location, but a link that opens the right
                        navigation app with the route ready to go.
                    </Text>
                    <Text style={styles.text}>
                        To&nbsp;make this easier, I&nbsp;created this small app that helps find the right spot, adjust
                        it&nbsp;if needed, and generate a link for the navigation app you want. I&nbsp;hope you find
                        it&nbsp;useful too!
                    </Text>
                    <Text style={styles.text}>Thanks so&nbsp;much!</Text>
                </AboutExpander>

                <AboutExpander title="Saved Locations">
                    <Text style={styles.text}>
                        You can save your favorite locations directly in&nbsp;the app and easily access them on&nbsp;the
                        &quot;Saved&quot; tab. All saved data is&nbsp;stored locally on&nbsp;your device, so&nbsp;your
                        information stays private and available even without an&nbsp;internet connection.
                    </Text>
                </AboutExpander>

                <AboutExpander title="Coordinate Converter">
                    <Text style={styles.text}>
                        Easily convert coordinates between Decimal Degrees (DD) and Degrees, Minutes, Seconds (DMS)
                        formats. Just enter coordinates in one format, and the tool instantly shows you the equivalent
                        in&nbsp;the other, making it&nbsp;simple to&nbsp;work with different coordinate systems.
                    </Text>
                </AboutExpander>

                <AboutExpander title="Follow me">
                    <AboutFollowMe />
                </AboutExpander>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 16,
    },
    aboutText: {
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
    bold: {
        fontWeight: '700',
    },
})
