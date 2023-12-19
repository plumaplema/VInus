import {Center, Flex, Text, Button} from 'native-base';
import {View} from 'react-native';
import {useBigEyeStore} from '../../zustanstorage/bigEyeStorage';
import {useEffect, useMemo, useState} from 'react';
import {
  onPressButtonPlay,
  updateBigEyeGrid_,
} from '../../utils/helperfunctions';
import {useBetStratStore} from '../../zustanstorage/betStratStorage';
import {useGameStore} from '../../zustanstorage/gameStorage';
import {ColorType} from 'native-base/lib/typescript/components/types';
import React from 'react';
import {useSmallRoadStore} from '../../zustanstorage/smallEyeRoad';
import SmallRoad from '../Roads/SmallRoad';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';
import {Rows, Table} from 'react-native-table-component';
import {useAllResult} from '../../zustanstorage/AllResultStorage';
import {usePrediction} from '../../zustanstorage/predictions';
import {usePatternStore} from '../../zustanstorage/patternStorage';

function ButtonPlayV2({
  color,
  persona,
  unitedChoosenRoad,
  moveNext,
  alreadyRun,
  setalreadyRun,
  setpersona,
  setadder,
}: {
  color: ColorType;
  persona: 'B' | 'P';
  unitedChoosenRoad: number | null;
  moveNext: 'P' | 'B' | 'X' | null;
  alreadyRun: number;
  setalreadyRun: React.Dispatch<React.SetStateAction<number>>;
  setpersona: React.Dispatch<React.SetStateAction<'P' | 'B' | null>>;
  setadder: () => void;
}) {
  const {
    predictAddToBet,
    lastpick,
    updatelastpick,
    addToBetCompilation,
    betCompilations,
    bigRoadCompilation,
    cockroachRoadCompilation,
    updateRoadCompilation,
    smallRoadCompilation,
    selectedPattern,
  } = useGeneralStoreRoad();

  const {
    play,
    nextMove,
    currentStep,
    setBetAmount,
    setCurrentStep,
    upDateGrid,
    lastStateofGrid,
    gameGrid,
    getNextMoce,
  } = useGameStore();

  const {strategy} = useBetStratStore();

  const {incrementNumberStatus} = usePatternStore();

  const updateGrid = (persona: 'P' | 'B') => {
    //Update gameGrid for main road

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
        const startColumn = gameGrid[0].findIndex(item => item == null);
        upDateGrid(persona, 0, startColumn);
      }
    }
  };

  const updateSecondaryRoadOnClick = (
    lengthofData: number,
    topRow: {first: number; second: number},
    notOntopRow: number,
    compilation: ('P' | 'B')[][],
  ) => {
    const {first, second} = topRow;
    try {
      if (compilation.length > lengthofData) {
        if (compilation[lengthofData].length > 1) {
          // the second row is more than one
          const indexOfLastColumn = compilation.length - 1; //index of last column
          const lastColumn = compilation[indexOfLastColumn]; //last column
          const lengthOfLastColumn = lastColumn.length;
          if (lengthOfLastColumn === 1) {
            const secondToLast = compilation[indexOfLastColumn - first].length; //second to the last
            const thirdToLast = compilation[indexOfLastColumn - second].length; //third to the last
            if (secondToLast == thirdToLast) {
              return '🔴';
            } else {
              return '🔵';
            }
          } else {
            const beforeColumn =
              compilation[indexOfLastColumn - notOntopRow][
                lengthOfLastColumn - 1
              ];
            const upbeforeColumn =
              compilation[indexOfLastColumn - notOntopRow][
                lengthOfLastColumn - 2
              ];
            if (beforeColumn == upbeforeColumn) {
              return '🔴';
            } else {
              return '🔵';
            }
          }
        } else {
          //the second row is less than one
          const indexOfLastColumn = compilation.length - 1; //index of last column
          const lastColumn = compilation[indexOfLastColumn]; //last column
          const lengthOfLastColumn = lastColumn.length;
          if (lengthOfLastColumn === 1) {
            const secondToLast = compilation[indexOfLastColumn - first].length; //second to the last
            const thirdToLast = compilation[indexOfLastColumn - second].length; //third to the last
            if (secondToLast == thirdToLast) {
              return '🔴';
            } else {
              return '🔵';
            }
          } else {
            const beforeColumn =
              compilation[indexOfLastColumn - notOntopRow][
                lengthOfLastColumn - 1
              ];
            const upbeforeColumn =
              compilation[indexOfLastColumn - notOntopRow][
                lengthOfLastColumn - 2
              ];
            if (beforeColumn == upbeforeColumn) {
              return '🔴';
            } else {
              return '🔵';
            }
          }
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  //Use
  const updateRoads = (
    index: number,
    coordinates: {first: number; second: number},
    player: any,
  ) => {
    return updateSecondaryRoadOnClick(index, coordinates, index, player);
  };

  const playerpredict = () => {
    const player = predictAddToBet('P');
    const bigRoad = updateRoads(1, {first: 1, second: 2}, player);
    const smallRoad = updateRoads(2, {first: 1, second: 3}, player);
    const cockroach = updateRoads(3, {first: 1, second: 4}, player);

    return {
      bigRoad,
      smallRoad,
      cockroach,
    };
  };

  const bankerpredict = () => {
    const player = predictAddToBet('B');
    const bigRoad = updateRoads(1, {first: 1, second: 2}, player);
    const smallRoad = updateRoads(2, {first: 1, second: 3}, player);
    const cockroach = updateRoads(3, {first: 1, second: 4}, player);

    return {
      bigRoad,
      smallRoad,
      cockroach,
    };
  };

  const {setPrediction} = usePrediction();
  const bankerprediction = useMemo(() => bankerpredict(), [betCompilations]);
  const playerprediction = useMemo(() => playerpredict(), [betCompilations]);

  const getFreshRow = (where: 'bigroad' | 'smallroad' | 'cockroach') => {
    const roadMap = {
      bigroad: bigRoadCompilation,
      smallroad: smallRoadCompilation,
      cockroach: cockroachRoadCompilation,
    };

    const whatRoad = roadMap[where];
    const index = whatRoad[0].findIndex(row => row === '⚪');

    return index;
  };

  const updateBigRoad = (
    pick: '🔴' | '🔵' | '⚪' | null | undefined,
    where: 'bigroad' | 'smallroad' | 'cockroach',
  ) => {
    if (pick) {
      const lastStateOfPick =
        where == 'bigroad'
          ? lastpick.bigroad
          : where == 'smallroad'
          ? lastpick.smallroad
          : lastpick.cockroach;
      const whatRoad =
        where === 'bigroad'
          ? bigRoadCompilation
          : where == 'cockroach'
          ? cockroachRoadCompilation
          : smallRoadCompilation;
      let location: {row: number; column: number} = {column: -1, row: -1};
      const columns = Array.from({length: 6}, (_, index) => index);
      const freshRow = getFreshRow(where);
      if (freshRow == 0) {
        location = {row: 0, column: 0};
      } else {
        const {pick: lastPick, loc} = lastStateOfPick as any;
        const [lastRow, lastColumn] = loc;
        if (lastPick == pick) {
          //continue vertically
          if (lastColumn == 5) {
            location = {row: lastRow + 1, column: 5};
          } else {
            //check below
            const valueBelow = whatRoad[lastColumn + 1][lastRow];
            if (valueBelow == '⚪') {
              location = {row: lastRow, column: lastColumn + 1};
            } else {
              location = {row: lastRow + 1, column: lastColumn};
            }
          }
        } else {
          location = {row: freshRow, column: 0};
        }
      }
      const copyofCompilation = whatRoad;
      const {column, row} = location;
      updatelastpick([row, column], where, pick);
      if (row == 0 && column == 0) {
        copyofCompilation[location.column][location.row] = pick as any;
        updateRoadCompilation(where, copyofCompilation);
        return;
      } else {
        copyofCompilation[location.column][location.row] = pick as any;
        updateRoadCompilation(where, copyofCompilation);
        return;
      }
    }
  };

  const [compilations_, setcompilations_] = useState<any>(null);
  const {setResult} = useAllResult();

  const allResultSetter = (
    result: '🔴' | '🔵' | null | undefined,
    where: 'B' | 'S' | 'C',
  ) => {
    if (result) {
      const changeResult = result == '🔴' ? 'B' : 'P';
      setResult(changeResult, where);
    }
  };

  const predict = (nextMove: string, road: string | null | undefined) => {
    return nextMove == 'B' && road == '🔴'
      ? 'B'
      : nextMove == 'B' && road == '🔵'
      ? 'P'
      : nextMove == 'P' && road == '🔴'
      ? 'P'
      : nextMove == 'P' && road == '🔵'
      ? 'B'
      : null;
  };

  useEffect(() => {
    const {bigRoad, cockroach, smallRoad} = bankerprediction;

    if (nextMove) {
      let predicted;

      switch (selectedPattern) {
        case 'CHINA 1':
          predicted = predict(nextMove, bigRoad);
          break;
        case 'CHINA 2':
          predicted = predict(nextMove, smallRoad);
          break;
        case 'CHINA 3':
          predicted = predict(nextMove, cockroach);
          break;
        case 'UNITED':
          if (unitedChoosenRoad !== null) {
            const road =
              unitedChoosenRoad === 0
                ? nextMove
                : unitedChoosenRoad === 1
                ? bigRoad
                : unitedChoosenRoad === 2
                ? smallRoad
                : cockroach;
            predicted =
              unitedChoosenRoad === 0 ? nextMove : predict(nextMove, road);
          } else {
            predicted = ' ';
          }
          break;
      }

      setPrediction(predicted);
      setadder();
    }
  }, [nextMove, compilations_]);

  useEffect(() => {
    const bigRoad = updateSecondaryRoadOnClick(
      1,
      {first: 1, second: 2},
      1,
      compilations_,
    );
    const smallRoad = updateSecondaryRoadOnClick(
      2,
      {first: 1, second: 3},
      2,
      compilations_,
    );
    const cockroach = updateSecondaryRoadOnClick(
      3,
      {first: 1, second: 4},
      3,
      compilations_,
    );
    allResultSetter(bigRoad, 'B');
    allResultSetter(smallRoad, 'S');
    allResultSetter(cockroach, 'C');
    updateBigRoad(bigRoad, 'bigroad');
    updateBigRoad(smallRoad, 'smallroad');
    updateBigRoad(cockroach, 'cockroach');
  }, [compilations_]);

  return (
    <Flex w={'100%'} h={'50%'} flexDirection={'row'}>
      <Center w={'100%'}>
        <View
          style={{
            width: '95%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            onPress={() => {
              // onPressButtonPlay(persona)
              try {
                incrementNumberStatus();
                play(persona);
                updateGrid(persona);
                setpersona(persona);
                const compilation = addToBetCompilation(persona);
                setcompilations_(compilation);
              } catch (error) {
                console.log(error);
              }
            }}
            m={'1px'}
            w={'85%'}
            h={'100%'}
            backgroundColor={color}
            borderRadius={10}
            borderColor={'black'}
            borderWidth={1}>
            <Text color={'white'} fontWeight={'bold'}>
              {persona}
            </Text>
          </Button>
          {persona == 'B' ? (
            <SymbolData data={bankerprediction} />
          ) : (
            <SymbolData data={playerprediction} />
          )}
          {/* 
          {persona == 'B' ? (
            <NumberData data={bankerprediction} />
          ) : (
            <NumberData data={playerprediction} />
          )} */}
        </View>
      </Center>
    </Flex>
  );
}

const SymbolData = ({
  data,
}: {
  data: {
    bigRoad: string | null | undefined;
    smallRoad: string | null | undefined;
    cockroach: string | null | undefined;
  };
}) => {
  const {bigRoad, cockroach, smallRoad} = data;
  return (
    <View
      style={{
        width: '15%',
        gap: 1,
        margin: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          height: '27%',
          borderRadius: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text fontSize={8}>{bigRoad}</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          height: '27%',
          borderRadius: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {smallRoad === '🔵' ? (
          <View
            style={{
              borderRadius: 100,
              borderWidth: 2,
              borderColor: 'blue',
              width: '40%',
              height: '80%',
              margin: 4,
            }}
          />
        ) : smallRoad === '🔴' ? (
          <View
            style={{
              borderRadius: 100,
              borderWidth: 2,
              borderColor: 'red',
              width: '40%',
              height: '80%',
              margin: 4,
            }}
          />
        ) : (
          <Text fontSize={8}>{cockroach}</Text>
        )}
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          height: '27%',
          borderRadius: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {cockroach === '🔵' ? (
          <View
            style={{
              backgroundColor: 'blue',
              width: 2,
              height: '90%',
              transform: 'rotate(45deg)',
              margin: 4,
            }}
          />
        ) : cockroach === '🔴' ? (
          <View
            style={{
              backgroundColor: 'red',
              width: 2,
              height: '90%',
              transform: 'rotate(45deg)',
              margin: 4,
            }}
          />
        ) : (
          <Text fontSize={8}>{cockroach}</Text>
        )}
      </View>
    </View>
  );
};

export default React.memo(ButtonPlayV2);
