import { useStopwatch } from "../../hooks/useStopwatch";
import { formatStopwatch } from "../../utils/time";
import { Button } from "../ui/Button";
import { LapList } from "./LapList";


export function Stopwatch() {
    const { isRunning, elapsedMs, laps, start, pause, reset, lap } = useStopwatch()

    const hasTime = elapsedMs > 0
    const currentLapMs = 
        laps.length > 0 ? elapsedMs - laps[laps.length - 1].totalMs : elapsedMs

    
    return (
        <div className="flex flex-col items-center gap-8 py-10 px-6">
            {/* Time Display */}
            <div className="flex flex-col items-center gap-3">
                <div className="font-mono tabular-nums tracking-tighter text-foreground leading-none text-[4rem] sm:text-[5.5rem]">
                    {formatStopwatch(elapsedMs)}
                </div>
                <div
                    className={`font-mono text-sm tabular-nums transition-opacity duration-200 ${
                        laps.length > 0 ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <span className="text-muted-foreground tracking-widest text-[0.6rem]">
                        LAP&nbsp;
                    </span>
                    <span className="text-foreground/50">
                        {formatStopwatch(currentLapMs)}
                    </span>
                </div>
            </div>
            

            {/* Controls */}
            <div className="flex items-center gap-3">
                {isRunning ? (
                    <>
                        <Button variant="secondary" size="lg" onClick={lap} >
                            LAP
                        </Button>
                        <Button variant="primary" size="lg" onClick={pause} >
                            PAUSE
                        </Button>
                    </>
                ) : (
                    <>
                        <Button 
                            variant="ghost" 
                            size="lg" 
                            onClick={reset} 
                            disabled={!hasTime} 
                        >
                            RESET
                        </Button>

                         <Button variant="primary" size="lg" onClick={start} >
                            {hasTime ? 'RESUME': 'START'}
                        </Button>
                    </>
                )}
            </div>


            {/* Lap List */}
            {laps.length > 0 && (
                <div className="w-full max-w-sm border-t border-white/[0.06] pt-4">
                    < LapList laps={laps}/>
                </div>
            )}

        </div>
    )
}