import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: Variant,
    size?: Size
}


const variants: Record<Variant, string> = {
    primary: 
        'bg-primary text-black hover:brightness-110 active:brightness-90',
    secondary: 
        'bg-white/10 text-foreground border border-white/10 hover:bg-white/[0.15] hover:border-white/20',
    ghost: 
        'text-muted-foreground hover:text-foreground hover:bg-white/[0.06]',
    danger:  
        'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
}

const sizes: Record<Size, string> = {
    sm: 'h-9 px-4 text-sm rounded-md',
    md: 'h-11 px-6 rounded-lg',
    lg: 'h-13 px-10 rounded-xl text-sm tracking-widest',
}


export function Button({
    variant = 'secondary',
    size = 'md',
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                'inline-flex items-center justify-center font-mono font-medium transition-all duration-100',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.96]',
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    )
}