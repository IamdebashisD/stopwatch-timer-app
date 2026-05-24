import { useState, useRef, useCallback, useEffect } from "react";

export interface UseTimerReturn {
    isRunning: boolean
    remainingMs: number
    totalMs: number
    isFinished: boolean
    setDuration: (ms: number) => void
    start: () => void
    pause: () => void
    reset: () => void
}


export function useTimer(): UseTimerReturn {
    const [totalMs, setTotalMs] = useState(0)
    const [remainingMs, setRemainingMs] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const rafRef = useRef<number | null>(null)
    const endAtRef = useRef<number | null>(null)
    const remainingRef = useRef(0)
    const totalRef = useRef(0)

    function cancelRef() {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
    }

    const tick = useCallback(() => {
        if (endAtRef.current === null) return
        const left = Math.max(0, endAtRef.current - Date.now())
        remainingRef.current = left
        setRemainingMs(left)

        if (left <= 0) {
            endAtRef.current = null
            setIsRunning(false)
            setIsFinished(true)
            return
        }

        rafRef.current =  requestAnimationFrame(tick)
    }, [])

    const setDuration = useCallback((ms: number) => {
        cancelRef()
        endAtRef.current = null
        remainingRef.current = ms
        totalRef.current = ms
        setTotalMs(ms)
        setRemainingMs(ms)
        setIsRunning(false)
        setIsFinished(false)
    }, [])

    const start = useCallback(() => {
        if (remainingRef.current <= 0) return
        endAtRef.current = Date.now() + remainingRef.current
        setIsRunning(true)
        setIsFinished(false)
        rafRef.current = requestAnimationFrame(tick)
    }, [tick])

    const pause = useCallback(() => {
        if (endAtRef.current !== null) {
            remainingRef.current = Math.max(0, endAtRef.current - Date.now())
            endAtRef.current = null
        }
        cancelRef()
        setIsRunning(false)
    }, [])

    const reset = useCallback(() => {
        cancelRef()
        endAtRef.current = null
        remainingRef.current = totalRef.current
        setRemainingMs(totalRef.current)
        setIsRunning(false)
        setIsFinished(false)
    }, [])

    useEffect(() => () => cancelRef(), [])


    return { isRunning, remainingMs, totalMs, isFinished, setDuration, start, pause, reset }
}