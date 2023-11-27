import {useBetStratStore} from '../zustanstorage/betStratStorage';
import {useBigEyeStore} from '../zustanstorage/bigEyeStorage';
import {useGameStore} from '../zustanstorage/gameStorage';

const {strategy} = useBetStratStore();

const {
  addToCompilation,
  betCompilations,
  addToBigEyeResultCompilation,
  bigEyeResultCompilation,
  upDateBigEyeGrid,
} = useBigEyeStore();

const {
  play,
  nextMove,
  currentStep,
  setBetAmount,
  setCurrentStep,
  upDateGrid,
  lastStateofGrid,
  gameGrid,
} = useGameStore();

export const updateBigEyeRoadonClick = () => {
  if (betCompilations.length > 1) {
    if (betCompilations[1].length > 1) {
      const indexOfLastColumn = betCompilations.length - 1; //index of last column
      const lastColumn = betCompilations[indexOfLastColumn]; //last column
      const lengthOfLastColumn = lastColumn.length;
      if (lengthOfLastColumn !== 1) {
        const beforeColumn =
          betCompilations[indexOfLastColumn - 1][lengthOfLastColumn - 1];
        const upbeforeColumn =
          betCompilations[indexOfLastColumn - 1][lengthOfLastColumn - 2];
        if (beforeColumn == upbeforeColumn) {
          addToBigEyeResultCompilation('🔴');
        } else {
          addToBigEyeResultCompilation('🔵');
        }
      } else {
        const secondToLast = betCompilations[indexOfLastColumn - 1].length;
        const thirdToLast = betCompilations[indexOfLastColumn - 2].length;
        if (secondToLast == thirdToLast) {
          addToBigEyeResultCompilation('🔴');
        } else {
          addToBigEyeResultCompilation('🔵');
        }
      }
    }
  }
};

export const updateBigEyeGrid_ = () => {
  bigEyeResultCompilation.map((result, column) => {
    result.map((value, row) => upDateBigEyeGrid(value, row, column));
  });
};

export const updateGrid = (persona: 'P' | 'B') => {
  if (!lastStateofGrid) {
    gameGrid[0][0] = persona;
    upDateGrid(persona, 0, 0);
  } else {
    const {coordinates, persona: lastPersona} = lastStateofGrid;
    const [row, column] = coordinates;
    if (lastPersona == persona) {
      //continue adding horizontally

      if (row === 5) {
        gameGrid[row][column + 1] = persona;
        upDateGrid(persona, row, column + 1);
      } else {
        if (gameGrid[row + 1][column]) {
          gameGrid[row][column + 1] = persona;
          upDateGrid(persona, row, column + 1);
        } else {
          gameGrid[row + 1][column] = persona;
          upDateGrid(persona, row + 1, column);
        }
      }
    } else {
      //create new
      if (row == 5) {
        const startColumn = gameGrid[0].findIndex(item => item == null);
        upDateGrid(persona, 0, startColumn);
      } else {
        gameGrid[0][column + 1] = persona;
        upDateGrid(persona, 0, column + 1);
      }
    }
  }
};

export const onPressButtonPlay = (persona: 'P' | 'B') => {
  addToCompilation(persona);
  play(persona);
  if (nextMove != null) {
    if (nextMove === persona) {
      const indexInStrat = currentStep - 1;
      const {onWin} = strategy[indexInStrat];
      setCurrentStep(onWin);

      const {amount} = strategy[onWin - 1];
      setBetAmount(amount[0]);
    } else {
      const indexInStrat = currentStep - 1;
      const {onLose} = strategy[indexInStrat];
      setCurrentStep(onLose);

      const {amount} = strategy[onLose - 1];
      setBetAmount(amount[0]);
    }
  }
  updateGrid(persona);
  updateBigEyeRoadonClick();
};
