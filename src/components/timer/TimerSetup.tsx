import { useState } from "react"
import type { FormEvent } from "react"
import clsx from "clsx"
import { Button } from "../ui/Button"
import { componentsToMs } from "../../utils/time"



interface TimerSetupProps {
    onSet: (ms: number) => void
}

const PRESENT = [
    { label: '1m', ms: 60_000 },
    { label: '5m', ms: 300_000 },
    { label: '10m', ms: 600_000 },
    { label: '25m', ms: 1_500_000 },
    { label: '30m', ms: 1_800_000 },
    { label: '1h', ms: 3_600_000 },
]

const inputClass = clsx(
    'w-16 bg-white/[0.06] border border-white/10 rounded-lg text-center',
    'font-mono text-2xl py-3 text-foreground placeholder-white/20',
    'focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-150',
)



export function TimerSetup({ onSet}: TimerSetupProps) {

    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')

    function handleSet (e?: FormEvent) {
        e?.preventDefault
        const h = Math.min(99, Math.max(Math.max( parseInt(hours || '0', 10))))
        const m = Math.min(59, Math.max(0, parseInt(minutes || '0', 10)));
        const s = Math.min(59, Math.max(0, parseInt(seconds || '0', 10)));
        const ms = componentsToMs(h, m, s)
        if (ms > 0) onSet(ms)
    }

    const isEmpty = !hours && !minutes && !seconds

    return (
        <div className="flex flex-col items-center gap-10 py-10 px-6">
            {/* Preset pills */}
            <div className="flex flex-wrap justify-center gap-2">
                {PRESENT.map((p) => (
                    <button
                        key={p.label}
                        onClick={() => onSet(p.ms)}
                        className="px-5 py-2 font-mono text-xs tracking-widest border border-white/[0.08] rounded-full text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-100"
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 w-full max-w-xs">
                <div className="flex-1 h-px bg-white/[0.06]" />
                    <span className="font-mono text-[0.6rem] tracking-widest text-muted-foreground/50">
                        OR
                    </span>
                <div className="flex-1 h-px bg-white/[0.06]"/>
            </div>

            {/* Custom Input */}
            <form onSubmit={handleSet} className="flex flex-col items-center gap-6">
                <div className="flex items-end gap-2">
                    <div className="flex flex-col items-center gap-2">
                        <input 
                            type="number" 
                            min={0} 
                            max={99} 
                            value={hours} 
                            onChange={(e) => setHours(e.target.value)} 
                            placeholder="00" className={inputClass}
                        />
                        <span className="font-mono text-[0.55rem] tracking-[0.2em] text-muted-foreground/60">
                            HRS
                        </span>
                    </div>

                    <span className="font-mono text-2xl text-muted-foreground/40 mb-6">:</span>

                    <div className="flex flex-col items-center gap-2">
                        <input 
                            type="number" 
                            min={0} 
                            max={59} 
                            value={minutes} 
                            onChange={(e) => setMinutes(e.target.value)} 
                            placeholder="00" 
                            className={inputClass} 
                        />
                        <span className="font-mono text-[0.55rem] tracking-[0.2em] text-muted-foreground/60">
                            MIN
                        </span>
                    </div>

                    <span className="font-mono text-2xl text-muted-foreground/40 mb-6">:</span>
                    
                    <div className="flex flex-col items-center gap-2">
                        <input 
                            type="number" 
                            min={0} 
                            max={59} 
                            value={seconds} 
                            onChange={(e) => setSeconds(e.target.value)} 
                            placeholder="00" 
                            className={inputClass} 
                        />
                        <span className="font-mono text-[0.55rem] tracking-[0.2em] text-muted-foreground/60">
                            SEC
                        </span>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isEmpty}
                >
                    SET TIMER
                </Button>
            </form>
        </div>
    )
}