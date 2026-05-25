import { useEffect, useRef } from "react";
import { useTimer } from "../../hooks/useTimer";
import { toast } from "sonner";
import { playBell } from "../../utils/sound";
import { formatTimer } from "../../utils/time";
import { Button } from "../ui/Button";
import { ProgressRing } from "./ProgressRing";
import { TimerSetup } from "./TimerSetup";

export function Timer() {
    const { 
        isRunning, 
        remainingMs, 
        totalMs, 
        isFinished, 
        setDuration, 
        start, 
        pause, 
        reset
    } = useTimer()


    const progress = totalMs > 0 ? (remainingMs / totalMs) : 0

    const prevFinished = useRef(isFinished)
    useEffect(() => {
        if (isFinished && !prevFinished.current) {
            playBell()
            toast('Timer complete', {
                description: 'Your countdown has ended', 
                duration: 6000,
                icon: '⏰✅'
            })
        }
        prevFinished.current = isFinished
    }, [isFinished])

    if (totalMs === 0) {
        return <TimerSetup onSet={setDuration} />
    }


    return (
        <div className="flex flex-col items-center gap-8 py-10 px-6">
            {/* Ring + time */}
            <div className="relative flex items-center justify-center">
                <ProgressRing progress={progress} size={256} strokeWidth={2} isFinished={isFinished}/>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className={`font-mono tabular-nums tracking-tighter leading-none text-[2.75rem] transition-colors duration-300} ${
                        isFinished ? 'text-red-400' : 'text-foreground'
                    }`}
                    >
                        {formatTimer(remainingMs)}
                    </div>

                    {isFinished ? (
                        <span className="font-mono text-[0.55rem] tracking-[0.3em] text-red-400 animate-pulse">
                            TIME UP
                        </span>                        
                    ) : (
                        <span className="font-mono text-[0.55rem] tracking-[0.2em] text-muted-foreground/40">
                            {formatTimer(totalMs)}SET
                        </span>   
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                        reset()
                        setDuration(0)
                    }}
                >
                    RESET
                </Button>
                
                {!isFinished && (
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={isRunning ? pause : start}
                    >
                        {isRunning ? 'PAUSE' : 'START'}
                    </Button>
                )}
                {isFinished && (
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={reset}
                    >
                        AGAIN
                    </Button>
                )}

            </div>
            {/* Change The Duration Link */}
            <button
                onClick={() => setDuration(0)}
                className="font-mono text-[0.6rem] tracking-widest text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-150"
            >
                CHANGE DURATION
            </button>
        </div>
    )
}