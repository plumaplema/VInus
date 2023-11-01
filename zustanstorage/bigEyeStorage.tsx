import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

interface GameState {
  betCompilations: Array<Array<'P' | 'B'>>;
  bigEyeResultCompilation: Array<Array<'🔴' | '🔵' | '⚪'>>;
  bigEyeGameGrid: Array<Array<'🔴' | '🔵' | '⚪' | null>>;
  addToBigEyeResultCompilation: (persona: '🔴' | '🔵' | '⚪') => void;
  addToCompilation: (choice: 'P' | 'B') => void;
  upDateBigEyeGrid: (
    persona: '🔴' | '🔵' | '⚪',
    row: number,
    column: number,
  ) => void;
  reset: () => void;
}

export const useBigEyeStore = create<GameState>()(
  devtools(
    set => ({
      betCompilations: [],
      bigEyeResultCompilation: [],
      bigEyeGameGrid: Array.from({length: 6}).map(() =>
        Array.from({length: 75}, () => '⚪'),
      ),
      reset: () =>
        set({
          betCompilations: [],
          bigEyeResultCompilation: [],
          bigEyeGameGrid: Array.from({length: 6}).map(() =>
            Array.from({length: 75}, () => '⚪'),
          ),
        }),
      addToBigEyeResultCompilation: move =>
        set(state => {
          let compilation: Array<Array<'🔴' | '🔵' | '⚪'>> = [
            ...state.bigEyeResultCompilation,
          ]; // Create a copy of the array

          if (
            compilation.length === 0 ||
            compilation[compilation.length - 1][0] !== move
          ) {
            // If the last subarray is empty or contains a different move, create a new subarray
            compilation.push([move]);
          } else {
            // Otherwise, append the move to the last subarray
            compilation[compilation.length - 1].push(move);
          }

          return {
            bigEyeResultCompilation: compilation,
          };
        }),
      addToCompilation: move =>
        set(state => {
          let compilation: Array<Array<'P' | 'B'>> = [...state.betCompilations]; // Create a copy of the array

          if (
            compilation.length === 0 ||
            compilation[compilation.length - 1][0] !== move
          ) {
            // If the last subarray is empty or contains a different move, create a new subarray
            compilation.push([move]);
          } else {
            // Otherwise, append the move to the last subarray
            compilation[compilation.length - 1].push(move);
          }

          return {
            betCompilations: compilation,
          };
        }),
      upDateBigEyeGrid: (persona, row, column) =>
        set(state => {
          const {bigEyeGameGrid} = state;
          bigEyeGameGrid[row][column] = persona;
          return {
            bigEyeGameGrid,
          };
        }),
    }),
    {
      name: 'game-storage',
    },
  ),
);
