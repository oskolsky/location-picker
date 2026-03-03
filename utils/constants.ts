import { Navigator } from '@/utils/enums'

export const NAVIGATORS = [
    {
        id: Navigator.Waze,
        name: 'Waze',
        image: require('@/assets/images/navigators/waze.png'),
        link: (lat: number, lng: number) => `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    },
    {
        id: Navigator.Google,
        name: 'Google',
        image: require('@/assets/images/navigators/google.png'),
        link: (lat: number, lng: number) => `https://google.com/maps/dir//${lat},${lng}`,
    },
    {
        id: Navigator.Yandex,
        name: 'Yandex',
        image: require('@/assets/images/navigators/yandex.png'),
        link: (lat: number, lng: number) => `https://maps.yandex.ru/?text=${lat},${lng}`,
    },
    {
        id: Navigator.Apple,
        name: 'Apple',
        image: require('@/assets/images/navigators/apple.png'),
        link: (lat: number, lng: number) => `https://maps.apple.com/?daddr=${lat},${lng}`,
    },
]
