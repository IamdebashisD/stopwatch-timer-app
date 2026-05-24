export function pad(n: number, digits = 2): string {
    return String(n).padStart(digits, '0')
}


export function msToComponents(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    return {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        centiseconds: Math.floor((ms % 1000) / 10),
    }
}

export function formatStopwatch(ms: number): string {
    const { hours, minutes, seconds, centiseconds } = msToComponents(ms)
    const cs = pad(centiseconds)
    
    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${cs}`
    }
    return `${pad(minutes)}:${pad(seconds)}.${cs}`
}

export function formatTimer(ms: number): string {
    const { hours, minutes, seconds } = msToComponents(ms)
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export function componentsToMs(h: number, m: number, s: number): number {
    return (h * 3600 + m * 60 + s) * 1000
}