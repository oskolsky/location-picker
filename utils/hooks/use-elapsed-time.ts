import { useEffect, useState } from 'react'

export function useElapsedTime(start?: number) {
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        if (!start) return

        const update = () => {
            setElapsed(Date.now() - start)
        }

        update()

        const interval = setInterval(update, 1000)

        return () => clearInterval(interval)
    }, [start])

    return elapsed
}
