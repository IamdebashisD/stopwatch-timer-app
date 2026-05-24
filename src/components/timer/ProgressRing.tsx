interface ProgressRingProps {
    progress: number
    size?: number
    strokeWidth: number
    isFinished: boolean
}


export function ProgressRing({
    progress,
    size=256,
    strokeWidth = 2,
    isFinished = false
}: ProgressRingProps) {

    const radius = (size - strokeWidth * 2) / 2
    const circumference = 2 * Math.PI * radius
    const clampedProgress = Math.max(0, Math.max(0, progress))
    const offset = circumference * (1 - clampedProgress)
    return (
        <svg
            width={size}
            height={size}
            className="-rotate-90"
            aria-hidden="true"
        >
            {/* Track */}
            <circle 
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={strokeWidth}
            />

            {/* Tick marks at 12 positions */}

            {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * 2 * Math.PI;
                const outer = size / 2 - strokeWidth * 2;
                const inner = outer - 5;
                const x1 = size / 2 + outer * Math.cos(angle);
                const y1 = size / 2 + outer * Math.sin(angle);
                const x2 = size / 2 + inner * Math.cos(angle);
                const y2 = size / 2 + inner * Math.sin(angle);
                return (
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={1}
                />
                );
            })}

            {/* Progress arc */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={isFinished ? '#ff3b3b' : 'var(--primary)'}
                strokeWidth={strokeWidth}
                strokeLinecap="butt"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.05s linear, stroke 0.3s ease' }}
            />
        </svg>
    )
}