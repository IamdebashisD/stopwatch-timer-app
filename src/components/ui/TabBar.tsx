import clsx from "clsx";
import type { AppTab } from "../../types";

interface TabBarProps {
    active: AppTab
    onChange: (tab: AppTab) => void
}


const TABS: { id: AppTab, label: string}[] = [
    { id: 'stopwatch', label: 'STOPWATCH' },
    { id: 'timer', label: 'TIMER' },
]


export function TabBar ({ active, onChange }: TabBarProps) {
    return (
        <div className="flex border-b border-white/[0.07]">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={clsx(
                        'flex-1 py-4 font-mono text-[0.65rem] tracking-[0.25em] transition-all duration-150 relative',
                        active === tab.id
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground/60'
                    )}
                >
                    {tab.label}
                    {active === tab.id && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-px bg-primary" />
                    )}
                </button>
            ))}
        </div>
    )
}