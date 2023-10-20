import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


interface GameState {
    betCompilations: Array<Array<'P' | 'B'>>
    bigRoadCompilation: Array<Array<'🔴' | '🔵' | '⚪'>>
    bigRoadLast: [number, number]
    smallRoadLast: [number, number]
    cockroachRoadLast: [number, number]
    smallRoadCompilation: Array<Array<'🔴' | '🔵' | '⚪'>>,
    cockroachRoadCompilation: Array<Array<'🔴' | '🔵' | '⚪'>>,
    lastpick: { 'bigroad': { 'pick': '🔴' | '🔵' | '⚪', loc: [number, number] } | null, 'smallroad': { 'pick': '🔴' | '🔵', loc: [number, number] } | null, 'cockroach': { 'pick': '🔴' | '🔵', loc: [number, number] } | null },
    updateRoadCompilation: (where: 'bigroad' | 'smallroad' | 'cockroach', dataArray: Array<Array<'🔴' | '🔵' | '⚪'>>) => void
    addToBetCompilation: (choice: 'P' | 'B') => Array<Array<'P' | 'B'>>
    predictAddToBet: (choice: 'P' | 'B') => Array<Array<'P' | 'B'>>,
    updatelastpick: (location: [number, number], where: 'bigroad' | 'smallroad' | 'cockroach', pick: '🔴' | '🔵' | '⚪') => void,
    reset: () => void
}

export const useGeneralStoreRoad = create<GameState>()(
    devtools(
        (set) => ({
            betCompilations: [],
            bigRoadCompilation: Array.from({ length: 6 }).map(() => Array.from({ length: 75 }, () => '⚪')),
            smallRoadCompilation: Array.from({ length: 6 }).map(() => Array.from({ length: 75 }, () => '⚪')),
            cockroachRoadCompilation: Array.from({ length: 6 }).map(() => Array.from({ length: 75 }, () => '⚪')),
            bigRoadLast: [-1, -1],
            lastpick: { bigroad: null, cockroach: null, smallroad: null },
            cockroachRoadLast: [-1, -1],
            smallRoadLast: [-1, -1],
            updatelastpick(location, where, pick) {
                set((state) => {
                    if (where == 'bigroad') {
                        return {
                            lastpick: { ...state.lastpick, 'bigroad': { loc: location, pick } }
                        }
                    }
                    if (where == 'smallroad') {
                        return {
                            lastpick: { ...state.lastpick, 'smallroad': { loc: location, pick } }
                        }
                    }

                    return {
                        lastpick: { ...state.lastpick, 'cockroach': { loc: location, pick } }
                    }

                })

            },
            predictAddToBet(choice) {
                let compilation: Array<Array<'P' | 'B'>> = []
                set((state) => {
                    const { betCompilations, bigRoadLast } = state
                    const lastSubArray = betCompilations[betCompilations.length - 1];
                    const lastChoice = lastSubArray?.[0];

                    if (lastChoice === choice) {
                        // If the last subarray has the same choice, append to it
                        const updatedBetCompilations = betCompilations.map((subArray, index) =>
                            index === betCompilations.length - 1
                                ? [...subArray, choice]
                                : subArray
                        );
                        compilation = updatedBetCompilations
                        return { bigRoadLast };
                    } else {
                        // If not, create a new subarray with the choice
                        const updatedBetCompilations = [...betCompilations, [choice]];
                        compilation = updatedBetCompilations
                        return { bigRoadLast };
                    }
                })
                return compilation
            },
            addToBetCompilation(choice) {
                let compilation: Array<Array<'P' | 'B'>> = []
                set((state) => {
                    const { betCompilations } = state
                    const lastSubArray = betCompilations[betCompilations.length - 1];
                    const lastChoice = lastSubArray?.[0];

                    if (lastChoice === choice) {
                        // If the last subarray has the same choice, append to it
                        const updatedBetCompilations = betCompilations.map((subArray, index) =>
                            index === betCompilations.length - 1
                                ? [...subArray, choice]
                                : subArray
                        );
                        compilation = updatedBetCompilations
                        return { betCompilations: updatedBetCompilations };
                    } else {
                        // If not, create a new subarray with the choice
                        const updatedBetCompilations = [...betCompilations, [choice]];
                        compilation = updatedBetCompilations
                        return { betCompilations: updatedBetCompilations };
                    }
                })
                return compilation
            },
            updateRoadCompilation(where, dataArray) {
                set((state) => {
                    if (where == 'bigroad') {
                        return { bigRoadCompilation: dataArray }
                    } else if (where == 'cockroach') {
                        return { cockroachRoadCompilation: dataArray }
                    }
                    else {
                        return { smallRoadCompilation: dataArray }
                    }
                })
            },
            reset() {
                set(() => {
                    const emptyCompilation: Array<Array<'🔴' | '🔵' | '⚪'>> = Array.from({ length: 6 }).map(() => Array.from({ length: 75 }, () => '⚪'))
                    return { betCompilations: [], bigRoadCompilation: emptyCompilation, smallRoadCompilation: emptyCompilation, cockroachRoadCompilation: emptyCompilation }
                }
                )
            },
        }),
        {
            name: 'game-storage',
        }
    )
)
