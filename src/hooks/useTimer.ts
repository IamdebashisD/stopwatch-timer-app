import { useState, useRef, useCallback, useEffect } from "react";

// ─── persistence ─────────────────────────────────────────────────────────────
const TIMER_KEY = 'timer-v1'

interface PersistedTimer {
    totalMs: number
    endAt: number | null
    remainingMs: number
}

function timerLoad(): PersistedTimer {
    try {
        const raw = localStorage.getItem(TIMER_KEY)
        if (raw) return JSON.parse(raw) as PersistedTimer
    } catch {}
    return { totalMs: 0, endAt: null, remainingMs: 0 }
}

function timerSave(s: PersistedTimer): void {
    try {
        localStorage.setItem(TIMER_KEY, JSON.stringify(s))
    } catch {}
}


// ─── initial derived state ────────────────────────────────────────────────────
interface InitialDerived {
    isRunning: boolean
    isfinished: boolean
    remainingMs: number
    endAt: number | null
}

function derivedInitial(s: PersistedTimer): InitialDerived {
    // No Timer Set
    if (s.totalMs === 0) {
        return { isRunning: false, isfinished: false, remainingMs: 0, endAt: null }
    }
    // Was running — check if it ended during the page reload
    if (s.endAt !== null) {
        const now = Date.now()
        if (now >= s.endAt) {
            return { isRunning: false, isfinished: true, remainingMs: 0, endAt: null }
        }
        return {
            isRunning: true,
            isfinished: false,
            remainingMs: s.endAt - now,
            endAt: s.endAt
        }
    }
    // Was pause at 0 - Counts as finished
    if (s.remainingMs <= 0) {
        return { isRunning: false, isfinished: true, remainingMs: 0, endAt: null}
    }

    //Was paused eith time remaining
    return {
        isRunning: false,
        isfinished: false,
        remainingMs: s.remainingMs,
        endAt: null
    }
}
// ─── hooks ────────────────────────────────────────────────────

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
    // Both lazy initialisers run exactly once
    const [stored] = useState<PersistedTimer>(timerLoad)
    const [init] = useState<InitialDerived>(() => derivedInitial(stored))

    const [totalMs, setTotalMs] = useState(stored.totalMs)
    const [remainingMs, setRemainingMs] = useState(init.remainingMs)
    const [isRunning, setIsRunning] = useState(init.isRunning)
    const [isFinished, setIsFinished] = useState(init.isfinished)

    const rafRef = useRef<number | null>(null)
    const endAtRef = useRef<number | null>(init.endAt)
    const remainingRef = useRef(init.remainingMs)
    const totalRef = useRef(stored.totalMs)

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
            timerSave({ totalMs: totalRef.current, endAt: null, remainingMs: 0 })
            return
        }

        rafRef.current = requestAnimationFrame(tick)
    }, [])

    useEffect(() => {
        if (init.isRunning) {
            rafRef.current = requestAnimationFrame(tick)
        }
        return cancelRef
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

        if (ms === 0) {
            try { localStorage.removeItem(TIMER_KEY) } catch {}
        } else {
            timerSave({ totalMs: ms, endAt: null, remainingMs: ms })
        }
    }, [])

    const start = useCallback(() => {
        if (remainingRef.current <= 0) return
        const endAt = Date.now() + remainingRef.current
        endAtRef.current = endAt
        setIsRunning(true)
        setIsFinished(false)
        timerSave({ totalMs: totalRef.current, endAt, remainingMs: remainingRef.current })
        rafRef.current = requestAnimationFrame(tick)
    }, [tick])

    const pause = useCallback(() => {
        if (endAtRef.current !== null) {
            remainingRef.current = Math.max(0, endAtRef.current - Date.now())
            endAtRef.current = null
        }
        cancelRef()
        setIsRunning(false)
        timerSave({ totalMs: totalRef.current, endAt: null, remainingMs: remainingRef.current })
    }, [])

    const reset = useCallback(() => {
        cancelRef()
        endAtRef.current = null
        remainingRef.current = totalRef.current
        setRemainingMs(totalRef.current)
        setIsRunning(false)
        setIsFinished(false)
        timerSave({ totalMs: totalRef.current, endAt: null, remainingMs: totalRef.current })
    }, [])




    return { isRunning, remainingMs, totalMs, isFinished, setDuration, start, pause, reset }
}
