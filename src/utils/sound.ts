export function playBell(): void {
    try {
        const ctx = new AudioContext()

        function tone(freq: number, startAt: number, duration: number, vol = 0.3) {
            const osc = ctx.createOscillator()
            const overTone = ctx.createOscillator()
            const env = ctx.createGain()

            osc.connect(env)
            overTone.connect(env)
            env.connect(ctx.destination)

            osc.type = 'sine'
            overTone.type = 'sine'
            osc.frequency.setValueAtTime(freq, startAt)
            // Inharmonic overtone gives a metallic bell character
            overTone.frequency.setValueAtTime(freq * 256, startAt)

            env.gain.setValueAtTime(0, startAt)
            env.gain.linearRampToValueAtTime(vol, startAt + 0.006);
            env.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);


            osc.start(startAt)
            overTone.start(startAt)
            osc.stop(startAt + duration)
            overTone.stop(startAt + duration)
        }
        const t = ctx.currentTime;
        tone(1318.51, t, 1.4, 0.32);       // E6  — "ting"
        tone(880, t + 0.3, 2.0, 0.26);     // A5  — "tong"

        setTimeout(() => ctx.close(), 3000);

    } catch { 
        // Web Audio unavailable — silently skip sound
    }
}