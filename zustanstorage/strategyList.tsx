import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {
  betNumberfirst,
  betNumberfourth,
  betNumbersecond,
  betNumberthird,
} from './patterns';

interface betStratContent {
  amount: number;
  onWin: number;
  onLose: number;
  step: number;
}

interface betStrat {
  strategy: Array<Array<betStratContent>>;
  getStrategy: (index: number) => Array<betStratContent>;
  editStrategy: (
    primaryIndex: number,
    secondaryIndex: number,
    betStrategy: betStratContent,
  ) => void;
}

export const useStrategyList = create<betStrat>()(
  devtools(
    (set, get) => ({
      strategy: [
        betNumberfirst,
        betNumbersecond,
        betNumberthird,
        betNumberfourth,
        [],
        [],
        [],
        [],
        [],
        [],
      ],
      getStrategy: index => {
        const state = get();
        return state.strategy[index];
      },
      editStrategy(primaryIndex, secondaryIndex, betStrategy) {
        set(state => {
          const updatedStrategy = [...state.strategy]; // Create a copy of the strategy array
          updatedStrategy[primaryIndex][secondaryIndex] = betStrategy;
          return {strategy: updatedStrategy}; // Return the updated state
        });
      },
    }),
    {
      name: 'game-storage',
    },
  ),
);
