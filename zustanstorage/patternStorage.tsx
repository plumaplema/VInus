import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {allFirstArray, allSecondArray, allThirdArray} from './patterns';

interface PatternState {
  allPatterns: Array<{
    patternKey: 'G' | 'C1' | 'C2' | 'C3' | 'U';
    patterns: Array<
      Array<{nextMove: 'P' | 'B' | 'X'; pattern: Array<'P' | 'B'>}>
    >;
  }>;
  updatePattern: (
    patternKeyIndex: number,
    indexInPattern: number,
    pattern: Array<{nextMove: 'P' | 'B' | 'X'; pattern: Array<'P' | 'B'>}>,
  ) => void;
  addMorePattern: (patternKeyIndex: number, selectedPattern: number) => void;
}

export const usePatternStore = create<PatternState>()(
  devtools(
    persist(
      set => ({
        allPatterns: [
          {
            patternKey: 'G',
            patterns: [allFirstArray, allSecondArray, allThirdArray],
          },
          {
            patternKey: 'C1',
            patterns: [allFirstArray, allSecondArray, allThirdArray],
          },
          {
            patternKey: 'C2',
            patterns: [allFirstArray, allSecondArray, allThirdArray],
          },
          {
            patternKey: 'C3',
            patterns: [allFirstArray, allSecondArray, allThirdArray],
          },
          {
            patternKey: 'U',
            patterns: [
              allFirstArray,
              allSecondArray,
              allThirdArray,
              [],
              [],
              [],
              [],
              [],
              [],
              [],
            ],
          },
        ],
        updatePattern: (patternKeyIndex, indexInPattern, pattern) => {
          set(state => {
            const copy = state.allPatterns;
            copy[patternKeyIndex]['patterns'][indexInPattern] = pattern;
            console.log(copy);
            return {allPatterns: copy};
          });
        },
        addMorePattern: (index, selectedPattern) => {
          set(state => {
            const copy = [...state.allPatterns];
            copy[index].patterns[selectedPattern].push({
              nextMove: 'X',
              pattern: ['P', 'P'],
            });
            return {allPatterns: copy};
          });
        },
      }),
      {
        name: 'pattern-storage',
        getStorage: () => AsyncStorage,
      },
    ),
  ),
);
