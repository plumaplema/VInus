import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

interface GameState {
  gameGrid: Array<Array<'P' | 'B' | null>>;
  result: number;
  currentStep: number;
  totalbetAmount: number;
  step: number;
  allresult: Array<'P' | 'B'>;
  play: (choice: 'P' | 'B') => void;
  reset: () => void;
  status: 'win' | 'lose' | 'pause' | 'tie';
  betAmount: number;
  nextMove: 'B' | 'P' | 'X' | null;
  lastStateofGrid: {persona: 'P' | 'B'; coordinates: [number, number]} | null;
  setCurrentStep: (step: number) => void;
  setBetAmount: (step: number) => void;
  setNexMove: (move: 'B' | 'P' | 'X') => void;
  upDateGrid: (persona: 'P' | 'B', row: number, column: number) => void;
  undo: () => void;
  getNextMoce: () => 'B' | 'P' | 'X' | null;
  betSum: number;
  betCompilations: Array<Array<'P' | 'B'>>;
}

export const useGameStore = create<GameState>()(
  devtools(
    (set, get) => ({
      currentStep: 1,
      totalbetAmount: 0,
      betCompilations: [],
      lastStateofGrid: null,
      getNextMoce: () => {
        const nextMove = get();
        return nextMove.nextMove;
      },
      gameGrid: Array.from({length: 6}).map(() =>
        Array.from({length: 75}, () => null),
      ),
      betSum: 0,
      betAmount: 0,
      nextMove: null,
      result: 2,
      allresult: [],
      step: 0,
      status: 'tie',
      undo: () => {
        set(state => {
          return {
            allresult: state.allresult.slice(0, -1),
          };
        });
      },
      setBetAmount(amount) {
        return set(state => {
          return {
            betAmount: amount,
            betSum: state.betSum + amount,
          };
        });
      },
      upDateGrid(persona, row, column) {
        return set(state => {
          const {gameGrid} = state;
          gameGrid[row][column] = persona;
          return {
            gameGrid,
            lastStateofGrid: {persona, coordinates: [row, column]},
          };
        });
      },
      play: choice =>
        set(state => {
          const {betAmount, totalbetAmount, nextMove} = state;

          const amountToAdd = () => {
            if (nextMove == choice) {
              if (choice == 'B') {
                return betAmount * 0.95;
              } else {
                return betAmount;
              }
            } else {
              return betAmount * -1;
            }
          };
          const add = amountToAdd();
          return {
            allresult: [...state.allresult, choice],
            step: state.step + 1,
            status:
              state.nextMove == 'X'
                ? 'pause'
                : state.nextMove === choice
                ? 'win'
                : 'lose',
            totalbetAmount: totalbetAmount + add,
          };
        }),
      setCurrentStep: step =>
        set(state => {
          return {
            currentStep: step,
          };
        }),
      setNexMove: move =>
        set(state => {
          return {
            nextMove: move,
          };
        }),
      reset() {
        set(state => ({
          step: 0,
          result: 2,
          status: 'tie',
          allresult: [],
          nextMove: null,
          betCompilations: [],
          currentStep: 1,
          betAmount: 0,
          gameGrid: Array.from({length: 6}).map(() =>
            Array.from({length: 75}, () => null),
          ),
          lastStateofGrid: null,
          totalbetAmount: 0,
          betSum: 0,
        }));
      },
    }),
    {
      name: 'game-storage',
    },
  ),
);
