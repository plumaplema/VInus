import { create } from 'zustand'
import { devtools } from 'zustand/middleware'



interface GameState {
    betCompilationsSmallRoad: Array<Array<'P' | 'B'>>
    smallRoadResultCompilation: Array<Array<'🔴' | '🔵' | '⚪'>>
    smallRoadGameGrid: Array<Array<'🔴' | '🔵' | '⚪' | null>>
    addTosmallRoadResultCompilation: (persona: '🔴' | '🔵' | '⚪') => void
    addToCompilationSmallRoad: (choice: 'P' | 'B') => void
    upDatesmallRoadGrid: (persona: '🔴' | '🔵' | '⚪', row: number, column: number) => void
    resetSmallRoad: () => void
}

export const useSmallRoadStore = create<GameState>()(
    devtools(
        (set) => ({
            betCompilationsSmallRoad: [],
            smallRoadResultCompilation: [],
            smallRoadGameGrid: Array.from({ length: 6 }).map(() => Array.from({ length: 75 }, () => '⚪')),
            resetSmallRoad: () => set({ betCompilationsSmallRoad: [], smallRoadResultCompilation: [], smallRoadGameGrid: Array.from({ length: 6 }).map(() => Array.from({ length: 75 }, () => '⚪')), }),
            addTosmallRoadResultCompilation: (move) => set((state) => {
                let compilation: Array<Array<'🔴' | '🔵' | '⚪'>> = [...state.smallRoadResultCompilation]; // Create a copy of the array

                if (compilation.length === 0 || compilation[compilation.length - 1][0] !== move) {
                    // If the last subarray is empty or contains a different move, create a new subarray
                    compilation.push([move]);
                } else {
                    // Otherwise, append the move to the last subarray
                    compilation[compilation.length - 1].push(move);
                }

                return {
                    smallRoadResultCompilation: compilation,
                };
            }),
            addToCompilationSmallRoad: (move) => set((state) => {
                let compilation: Array<Array<'P' | 'B'>> = [...state.betCompilationsSmallRoad]; // Create a copy of the array

                if (compilation.length === 0 || compilation[compilation.length - 1][0] !== move) {
                    // If the last subarray is empty or contains a different move, create a new subarray
                    compilation.push([move]);
                } else {
                    // Otherwise, append the move to the last subarray
                    compilation[compilation.length - 1].push(move);
                }

                return {
                    betCompilationsSmallRoad: compilation,
                };
            }),
            upDatesmallRoadGrid: (persona, row, column) => set((state) => {
                const { smallRoadGameGrid } = state
                smallRoadGameGrid[row][column] = persona
                return {
                    smallRoadGameGrid
                }
            })
        }),
        {
            name: 'game-storage',
        }
    )
)
