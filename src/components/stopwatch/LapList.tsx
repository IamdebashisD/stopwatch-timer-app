import clsx from "clsx";
import { formatStopwatch } from "../../utils/time";
import type { Lap } from "../../types";


interface LapListProps {
    laps: Lap[]
}

export function LapList({ laps }: LapListProps) {
    if (laps.length === 0) return null

    const lapTimes = laps.map((l) => l.lapMs)
    const minLap = Math.min(...lapTimes)
    const maxLap = Math.max(...lapTimes)

    const hasMultiple = laps.length > 1

    const reversed = [...laps].reverse()


    return (
        <div className="w-full max-h-52 overflow-y-auto scrollbar-none">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/[0.06]">
                        <th className="py-2 text-left font-mono text-[0.6rem] tracking-widest text-muted-foreground font-normal pl-1">
                            LAP
                        </th>
                         <th className="py-2 text-right font-mono text-[0.6rem] tracking-widest text-muted-foreground font-normal">
                            LAP TIME
                        </th>
                        <th className="py-2 text-right font-mono text-[0.6rem] tracking-widest text-muted-foreground font-normal pr-1">
                            TOTAL
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reversed.map((lap) => {
                        const isBest = hasMultiple && lap.lapMs === minLap
                        const isWorst = hasMultiple && lap.lapMs === maxLap

                        return (
                            <tr
                                key={lap.id}
                                className={clsx(
                                    'border-b border-white/[0.04] transition-colors',
                                    isBest && 'text-emerald-400',
                                    isWorst && 'text-red-400',
                                    !isBest && !isWorst && 'text-foreground/70',
                                )}
                            >
                                <td className="py-2 pl-1 font-mono text-sm">
                                    {String(lap.id).padStart(2, '0')}
                                </td>
                                <td className="py-2 text-right font-mono text-sm tabular-nums">
                                    {formatStopwatch(lap.lapMs)}
                                </td>
                                <td className="py-2 pr-1 text-right font-mono text-sm tabular-nums text-muted-foreground">
                                    {formatStopwatch(lap.totalMs)}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}