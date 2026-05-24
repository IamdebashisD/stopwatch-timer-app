import { useState, useRef, useEffect, useCallback  } from "react";
import type { Lap } from '../types'


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
    const [isRunning, setIsRunning] = useState(false)
    const [elapsedMs, setElapsedMs] = useState(0)
    const [laps, setLaps] = useState<Lap[]>([])

    const rafRef = useRef<number | null>(null)
    const startedAtRef = useRef<number | null>(null)

    const baseRef = useRef(0)

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

    const start = useCallback(()=> {
        startedAtRef.current = Date.now()
        setIsRunning(true)
        rafRef.current = requestAnimationFrame(tick)
    }, [tick])


    const pause = useCallback(() => {
        if (startedAtRef.current !== null) {
            baseRef.current += Date.now() - startedAtRef.current
            startedAtRef.current = null
        }
        cancelRef()
        setIsRunning(false)
    }, [])

    const reset = useCallback(() => {
        cancelRef()
        startedAtRef.current = null
        baseRef.current = 0
        setIsRunning(false)
        setElapsedMs(0)
        setLaps([])
    }, [])


    const lap = useCallback(() => {
        const current = 
            baseRef.current + (startedAtRef.current !== null ?  Date.now() - startedAtRef.current : 0)
        
        setLaps((prev) => {
            const lastTotal = prev.length > 0 ? prev[prev.length - 1].totalMs : 0
            return [
                ...prev,
                { id: prev.length + 1, lapMs: current - lastTotal, totalMs: current}
            ] 
        })
    }, [])


    useEffect(() => () => cancelRef(), [])


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