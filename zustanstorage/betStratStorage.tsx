import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

interface betStratContent {
  amount: number;
  onWin: number;
  onLose: number;
  step: number;
}

interface betStrat {
  strategy: Array<betStratContent>;
  setStrategy: (strategy: Array<betStratContent>) => void;
}

export const useBetStratStore = create<betStrat>()(
  devtools(
    set => ({
      strategy: [
        {
          amount: 100,
          step: 1,
          onWin: 1,
          onLose: 3,
        },
        {
          amount: 2000,
          step: 2,
          onWin: 1,
          onLose: 3,
        },
        {
          amount: 2000,
          step: 3,
          onWin: 4,
          onLose: 5,
        },
        {
          amount: 4000,
          step: 4,
          onWin: 1,
          onLose: 5,
        },
        {
          amount: 3000,
          step: 5,
          onWin: 6,
          onLose: 7,
        },
        {
          amount: 6000,
          step: 6,
          onWin: 1,
          onLose: 7,
        },
        {
          amount: 4000,
          step: 7,
          onWin: 8,
          onLose: 9,
        },
        {
          amount: 8000,
          step: 8,
          onWin: 1,
          onLose: 9,
        },
        {
          amount: 6000,
          step: 9,
          onWin: 10,
          onLose: 11,
        },
        {
          amount: 12000,
          step: 10,
          onWin: 1,
          onLose: 11,
        },
        {
          amount: 8000,
          step: 11,
          onWin: 12,
          onLose: 13,
        },
        {
          amount: 16000,
          step: 12,
          onWin: 1,
          onLose: 13,
        },
        {
          amount: 12000,
          step: 13,
          onWin: 14,
          onLose: 15,
        },
        {
          amount: 24000,
          step: 14,
          onWin: 1,
          onLose: 15,
        },
        {
          amount: 17000,
          step: 15,
          onWin: 16,
          onLose: 17,
        },
        {
          amount: 34000,
          step: 16,
          onWin: 1,
          onLose: 17,
        },
        {
          amount: 23000,
          step: 17,
          onWin: 18,
          onLose: 19,
        },
        {
          amount: 46000,
          step: 18,
          onWin: 1,
          onLose: 19,
        },
        {
          amount: 31000,
          step: 19,
          onWin: 1,
          onLose: 19,
        },
        {
          amount: 62000,
          step: 20,
          onWin: 1,
          onLose: 21,
        },
      ],
      setStrategy: (strategy: Array<betStratContent>) => {
        set({strategy});
      },
    }),
    {
      name: 'game-storage',
    },
  ),
);
