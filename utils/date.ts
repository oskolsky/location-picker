export function formatDuration(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)

    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60

    const pad = (n: number) => String(n).padStart(2, '0')

    return `${pad(h)}:${pad(m)}:${pad(s)}`
}

export function formatParkedDate(timestamp: number) {
    const date = new Date(timestamp)

    const formatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    })

    return `Parked ${formatter.format(date)}`
}
