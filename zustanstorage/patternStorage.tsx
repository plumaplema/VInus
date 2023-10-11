import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface PatternState {
    pattern: Array<{ 'nextMove': 'P' | 'B' | 'X', 'pattern': Array<'P' | 'B'> }>
    setPattern: (pattern: Array<{ 'nextMove': 'P' | 'B' | 'X', 'pattern': Array<'P' | 'B'> }>) => void,
    reset: () => void
}

export const usePatternStore = create<PatternState>()(
    devtools(
        (set) => ({
            pattern: [
                {
                    nextMove: 'P',
                    pattern: ['P']
                },
                {
                    nextMove: 'B',
                    pattern: ['B']
                },
                {
                    nextMove: 'B',
                    pattern: ['P', 'B', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['B', 'P', 'B']
                },
                {
                    nextMove: 'X',
                    pattern: ['B', 'P', 'P', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['P', 'B', 'P', 'P', 'B']
                },
                {
                    nextMove: 'B',
                    pattern: ['B', 'P', 'B', 'B', 'P']
                },
                {
                    nextMove: 'B',
                    pattern: ['P', 'B', 'B', 'P', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['B', 'P', 'P', 'B', 'B']
                },
                {
                    nextMove: 'B',
                    pattern: ['P', 'B', 'B', 'P', 'P', 'B']
                },
                {
                    nextMove: 'P',
                    pattern: ['B', 'P', 'P', 'B', 'B', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['P', 'B', 'P', 'P', 'P', 'B']
                },
                {
                    nextMove: 'B',
                    pattern: ['B', 'P', 'B', 'B', 'B', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['P', 'B', 'B', 'P', 'B', 'B']
                },
                {
                    nextMove: 'B',
                    pattern: ['B', 'P', 'P', 'B', 'P', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['P', 'B', 'P', 'P', 'B', 'B', 'B']
                },
                {
                    nextMove: 'B',
                    pattern: ['B', 'P', 'B', 'B', 'P', 'P', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['P', 'B', 'B', 'B', 'P', 'B', 'B', 'B']
                },
                {
                    nextMove: 'B',
                    pattern: ['B', 'P', 'P', 'P', 'B', 'P', 'P', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['P', 'B', 'B', 'P', 'B', 'B', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['B', 'P', 'P', 'B', 'P', 'P', 'B']
                },
                {
                    nextMove: 'B',
                    pattern: ['P', 'B', 'B', 'P', 'B', 'B', 'P', 'B']
                },
                {
                    nextMove: 'P',
                    pattern: ['B', 'P', 'P', 'B', 'P', 'P', 'B', 'P']
                },
                {
                    nextMove: 'B',
                    pattern: ['P', 'B', 'B', 'B', 'P', 'P', 'P']
                },
                {
                    nextMove: 'P',
                    pattern: ['B', 'P', 'P', 'P', 'B', 'B', 'B']
                }
            ],
            setPattern: (pattern) => set((state) => {
                return { pattern }
            }),
            reset() {
                set((state) => ({ pattern: [] })

                )
            },
        }),
        {
            name: 'pattern-storage',
        }
    )
)
