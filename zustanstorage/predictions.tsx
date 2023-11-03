import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

interface Props {
  prediction: 'P' | 'B' | 'X' | null | undefined;
  setPrediction: (prediction: 'P' | 'B' | 'X' | null | undefined) => void;
}

export const usePrediction = create<Props>()(
  devtools(
    set => ({
      prediction: null,
      setPrediction: prediction => {
        set({prediction});
      },
    }),
    {
      name: 'allresul-storage',
    },
  ),
);
