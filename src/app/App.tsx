import { useState } from "react"
import { TabBar } from "../components/ui/TabBar"
import { Stopwatch } from "../components/stopwatch/Stopwatch"
import { Timer } from "../components/timer/Timer"
import type { AppTab } from "../types"


export default function App() {
    const [activeTab, setActiveTab] = useState<AppTab>('stopwatch')

    
    return (
        <div className="min-h-screen bg-background flex flex-col items-center">
            
            <div className="">
                <h1 className="font-mono text-[0.6rem] tracking-[0.35em] text-muted-foreground uppercase">
                    Stopwatch Timer
                </h1>
            </div>

            <div  className="w-full max-w-md min-h-screen flex flex-col">
                {/* Headers */}
                <header className="px-6 pt-10 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="font-mono text-[0.6rem] tracking-[0.35em] text-muted-foreground uppercase">
                            Precision Timer
                        </span>
                    </div>
                </header>

                {/* TabBar */}
                <TabBar active={activeTab} onChange={setActiveTab} />
                
                {/* content */}
                <main>
                    {activeTab === 'stopwatch' ? <Stopwatch /> : <Timer />}
                </main>

                {/* Footer */}
                <footer className="px-6 py-6 border-t border-white/[0.04]">
                    <p className="font-mono text-[0.55rem] tracking-widest text-muted-foreground/30 text-center uppercase">
                        {
                            activeTab === 'stopwatch'
                            ? 'Tap LAP while running to record splits'
                            : 'Select a preset or enter a custom duration'
                        
                        }
                    </p>
                </footer>
            </div>
        </div>
    )
}