import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface betStratContent {
    amount: Array<number>,
    onWin: number,
    onLose: number,
    step: number
}

interface betStrat {
    strategy: Array<betStratContent>
}

interface GameState {
    result: number
    step: number
    allresult: Array<'P' | 'B'>
    play: (choice: "P" | 'B') => void
    reset: () => void
    status: 'win' | 'lose' | 'pause' | 'tie',
    nextMove: "B" | "P" | "X" | null,
    setNexMove: (move: "B" | "P" | "X") => void
}

export const useBetStratStore = create<betStrat>()(
    devtools(
        (set) => ({
            strategy: [
                {
                    amount: [1000, 1000, 1000, 5000],
                    step: 1,
                    onWin: 1,
                    onLose: 3
                },
                {
                    amount: [2000, 2000, 2000, 10000],
                    step: 2,
                    onWin: 1,
                    onLose: 3
                },
                {
                    amount: [2000, 2000, 3000, 60000],
                    step: 3,
                    onWin: 4,
                    onLose: 5
                },
                {
                    amount: [4000, 4000, 6000, 12000],
                    step: 4,
                    onWin: 1,
                    onLose: 5
                },
                {
                    amount: [3000, 3000, 5000, 18000],
                    step: 5,
                    onWin: 6,
                    onLose: 7
                },
                {
                    amount: [6000, 6000, 10000, 20000],
                    step: 6,
                    onWin: 1,
                    onLose: 7
                },
                {
                    amount: [4000, 5000, 8000, 16000],
                    step: 7,
                    onWin: 8,
                    onLose: 9
                },
                {
                    amount: [8000, 10000, 16000, 32000],
                    step: 8,
                    onWin: 1,
                    onLose: 9
                },
                {
                    amount: [6000, 7000, 12000, 24000],
                    step: 9,
                    onWin: 10,
                    onLose: 11
                },
                {
                    amount: [12000, 14000, 24000, 48000],
                    step: 10,
                    onWin: 1,
                    onLose: 11
                },
                {
                    amount: [8000, 10000, 17000, 35000],
                    step: 11,
                    onWin: 12,
                    onLose: 13
                },
                {
                    amount: [16000, 20000, 34000, 70000],
                    step: 12,
                    onWin: 1,
                    onLose: 13
                },
                {
                    amount: [12000, 15000, 24000, 48000],
                    step: 13,
                    onWin: 14,
                    onLose: 15
                },
                {
                    amount: [24000, 30000, 48000, 98000],
                    step: 14,
                    onWin: 1,
                    onLose: 15
                },
                {
                    amount: [17000, 21000, 34000, 68000],
                    step: 15,
                    onWin: 16,
                    onLose: 17
                },
                {
                    amount: [34000, 42000, 68000, 136000],
                    step: 16,
                    onWin: 1,
                    onLose: 17
                },
                {
                    amount: [23000, 29000, 47000, 93000],
                    step: 17,
                    onWin: 18,
                    onLose: 19
                },
                {
                    amount: [46000, 58000, 94000, 186000],
                    step: 18,
                    onWin: 1,
                    onLose: 19
                },
                {
                    amount: [31000, 40000, 65000, 127000],
                    step: 19,
                    onWin: 1,
                    onLose: 19
                },
                {
                    amount: [62000, 80000, 130000, 254000],
                    step: 20,
                    onWin: 1,
                    onLose: 21
                }
            ]
        }),
        {
            name: 'game-storage',
        }
    )
)
