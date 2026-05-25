import { useState, useRef, useEffect, useCallback  } from "react";
import type { Lap } from '../types'


// ─── Persistence ─────────────────────────────────────────────────────────────────────
const SW_KEY = 'stopwatch-v1'

interface PersistedSW {
    baseMs: number
    startedAt: number | null  // epoch ms when last started (null = paused)
    laps: Lap[]
}

function swLoad(): PersistedSW {
    try {
        const raw = localStorage.getItem(SW_KEY)
        if (raw) return JSON.parse(raw) as PersistedSW
    } catch {}
    return { baseMs: 0, startedAt: null, laps: [] }
}

function swSave(s: PersistedSW): void {
    try {
        localStorage.setItem(SW_KEY, JSON.stringify(s))
    } catch {}
}


// ─── hook ─────────────────────────────────────────────────────────────────────
export interface UseStopwatchReturn {
    isRunning: boolean
    elapsedMs: number
    laps: Lap[]
    start: () => void
    pause: () => void
    reset: () => void
    lap: () => void
}


export function useStopwatch(): UseStopwatchReturn {
    const [initial] = useState<PersistedSW>(swLoad)
    
    const [isRunning, setIsRunning] = useState(() => initial.startedAt != null)
    const [elapsedMs, setElapsedMs] = useState(() => 
        initial.startedAt !== null
            ? initial.baseMs + (Date.now() - initial.startedAt) 
            : initial.baseMs
    )

    const [laps, setLaps] = useState<Lap[]>(initial.laps)

    const rafRef = useRef<number | null>(null)
    const startedAtRef = useRef<number | null>(initial.startedAt)

    const baseRef = useRef(initial.baseMs)
    // @ts-ignore
    const lapsRef = useRef<Lap[]>(initial.laps)

    function cancelRef() {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
    }

    const tick = useCallback(() => {
        if (startedAtRef.current === null) return

        const now = baseRef.current + (Date.now() - startedAtRef.current)
        setElapsedMs(now)
        rafRef.current = requestAnimationFrame(tick)
    }, [])

    const start = useCallback(() => {
        const now = Date.now()
        startedAtRef.current = now 
        setIsRunning(true)
        swSave({ baseMs: baseRef.current, startedAt: now, laps: lapsRef.current})
        rafRef.current = requestAnimationFrame(tick)
    }, [tick])


    const pause = useCallback(() => {
        if (startedAtRef.current !== null) {
            baseRef.current += Date.now() - startedAtRef.current
            startedAtRef.current = null
        }
        cancelRef()
        setIsRunning(false)
        swSave({ baseMs: baseRef.current, startedAt: null, laps: lapsRef.current })
    }, [])

    const reset = useCallback(() => {
        cancelRef()
        startedAtRef.current = null
        baseRef.current = 0
        setIsRunning(false)
        setElapsedMs(0)
        setLaps([])
        try { localStorage.removeItem(SW_KEY) } catch {}
    }, [])


    const lap = useCallback(() => {
        const current = 
            baseRef.current + (startedAtRef.current !== null ?  Date.now() - startedAtRef.current : 0)
        const prev = lapsRef.current
        const lastTotal = prev.length > 0 ? prev[prev.length - 1].totalMs : 0
        const next: Lap[] = [
            ...prev,
            { id: prev.length + 1, lapMs: current - lastTotal, totalMs: current}
        ] 
        lapsRef.current = next
        setLaps(next)
        swSave({ baseMs: baseRef.current, startedAt: startedAtRef.current, laps: next})
    }, [])


    useEffect(() => {
        if (startedAtRef.current !== null) {
            rafRef.current = requestAnimationFrame(tick)
        }
        return cancelRef
    }, [])


    return {
        isRunning,
        elapsedMs,
        laps,
        start,
        pause,
        reset,
        lap
    }
}