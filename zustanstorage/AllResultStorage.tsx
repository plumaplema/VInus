import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

interface GameState {
  bigEyeResults: Array<'P' | 'B'>;
  smallRoadResults: Array<'P' | 'B'>;
  cockroachRoadResults: Array<'P' | 'B'>;
  setResult: (result: 'P' | 'B', where: 'B' | 'S' | 'C') => void;
  resetAllResults: () => void;
}

export const useAllResult = create<GameState>()(
  devtools(
    set => ({
      bigEyeResults: [],
      cockroachRoadResults: [],
      smallRoadResults: [],
      setResult: (result, where) => {
        set(state => {
          if (where == 'B') {
            console.log('big eye');
            return {bigEyeResults: [...state.bigEyeResults, result]};
          }
          if (where == 'C') {
            return {
              cockroachRoadResults: [...state.cockroachRoadResults, result],
            };
          } else {
            return {smallRoadResults: [...state.smallRoadResults, result]};
          }
        });
      },
      resetAllResults() {
        set({
          bigEyeResults: [],
          cockroachRoadResults: [],
          smallRoadResults: [],
        });
      },
    }),
    {
      name: 'allresul-storage',
    },
  ),
);
