import {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  BackHandler,
} from 'react-native';

import Number from './components/Top/Number';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Champion from './components/Top/Champion';
import Round from './components/Top/Round';
import General from './components/Top/General';
import DateNow from './components/Top/DateNow';
import BetNumber from './components/Top/BetNumber';
import BetBestStep from './components/ThirdLayer/BetBestStep';
import MainFourthLayer from './components/FourthLayer/MainFourthLayer';
import {
  Center,
  Flex,
  HStack,
  NativeBaseProvider,
  Text,
  Button,
} from 'native-base';
import {useGameStore} from './zustanstorage/gameStorage';
import {usePatternStore} from './zustanstorage/patternStorage';
import BigRoad from './components/Roads/BigRoad';
import {useBigEyeStore} from './zustanstorage/bigEyeStorage';
import RNExitApp from 'react-native-exit-app';
import {useGeneralStoreRoad} from './zustanstorage/generalStorage';
import {useAllResult} from './zustanstorage/AllResultStorage';
import {useBetStratStore} from './zustanstorage/betStratStorage';
import {usePrediction} from './zustanstorage/predictions';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    result,
    status,
    step,
    reset,
    allresult,
    nextMove,
    setNexMove,
    setCurrentStep,
    betAmount,
    currentStep,
    betSum,
    setBetAmount,
  } = useGameStore();
  const {
    bigEyeResults,
    cockroachRoadResults,
    smallRoadResults,
    resetAllResults,
  } = useAllResult();

  const {
    reset: generalStorageReset,
    selectedPattern,
    selectedPatternNumber,
  } = useGeneralStoreRoad();

  const {allPatterns, numberStatus} = usePatternStore();
  const [adder, setAdder] = useState(0);

  const selectedKeyPattern = allPatterns.filter(value => {
    let key: 'G' | 'C1' | 'C2' | 'C3' | 'U' = 'G';

    switch (selectedPattern) {
      case 'GENERAL':
        key = 'G';
        break;
      case 'CHINA 1':
        key = 'C1';
        break;
      case 'CHINA 2':
        key = 'C2';
        break;
      case 'CHINA 3':
        key = 'C3';
        break;
      case 'UNITED':
        key = 'U';
        break;
      default:
        // Handle unexpected case
        break;
    }
    return value.patternKey == key;
  });

  const {patterns} = selectedKeyPattern[0];

  const selectedNumber =
    selectedPattern != 'UNITED' && parseInt(selectedPatternNumber) > 3
      ? 1
      : parseInt(selectedPatternNumber);

  const pattern = patterns[selectedNumber - 1];

  var {height, width} = Dimensions.get('window');

  const getMaxCount = () => {
    let maxCount = 0;
    pattern.map(pattern_ => {
      if (maxCount < pattern_['pattern'].length) {
        maxCount = pattern_['pattern'].length;
      }
    });
    return maxCount;
  };

  const crawlPattern: any = (maxCount: number, resultToUse: ('B' | 'P')[]) => {
    // Helper function to get last elements from resultToUse
    if (maxCount === 0) {
      return {result: null, index: -1};
    }
    if (!resultToUse) {
      return {result: null, index: -1};
    }
    const getLastElements = (arr: ('B' | 'P')[], count: number) => {
      return arr.slice(-count);
    };

    // Get the last elements
    const lastElements = getLastElements(resultToUse, maxCount);

    // Find matching pattern
    for (const data of pattern) {
      const {nextMove, pattern} = data;

      // Compare patterns
      if (JSON.stringify(pattern) === JSON.stringify(lastElements)) {
        return {result: nextMove, index: pattern.length};
      }
    }
    return crawlPattern(maxCount - 1, resultToUse);
  };

  const crawlPatternv2: any = (
    maxCount: number,
    resultToUse: ('B' | 'P')[],
  ) => {
    // Helper function to get last elements from resultToUse
    if (maxCount === 0) {
      return {result: null, index: -1};
    }
    if (resultToUse.length === 1) {
      return {result: null, index: -1};
    }
    const getLastElements = (arr: ('B' | 'P')[], count: number) => {
      return arr.slice(-count);
    };

    // Get the last elements
    const lastElements = getLastElements(resultToUse, maxCount);

    // Find matching pattern
    for (const data of pattern) {
      const {nextMove, pattern} = data;

      // Compare patterns
      if (JSON.stringify(pattern) === JSON.stringify(lastElements)) {
        return {result: nextMove, index: pattern.length};
      }
    }
    return crawlPattern(maxCount - 1, resultToUse);
  };

  function counterSearcher(
    filterPattern: {nextMove: 'P' | 'B' | 'X'; pattern: ('P' | 'B')[]}[],
    resultToCheck: ('P' | 'B')[],
  ) {
    if (resultToCheck.length === 0) {
      return false;
    }

    let patternFound: ('P' | 'B')[] = [];
    const inPattern = filterPattern.some(pattern => {
      if (pattern.pattern.join() === resultToCheck.join()) {
        patternFound = resultToCheck;
      }
      return pattern.pattern.join() === resultToCheck.join();
    });

    if (inPattern) {
      return {result: true, patternFound};
    } else {
      const removeFirstElement = resultToCheck.slice(1);
      return counterSearcher(filterPattern, removeFirstElement);
    }
  }

  const longestSinglePattern = () => {
    const resultToUse = [
      allresult,
      bigEyeResults,
      smallRoadResults,
      cockroachRoadResults,
    ];
    const patternConcluded = resultToUse.map(pattern => {
      let stop = false;
      const lastPattern = pattern[pattern.length - 1];
      let count = 0;
      pattern.map((letter, index) => {
        if (!stop) {
          const indexkey = pattern.length - index - 1;
          const last = pattern[indexkey];
          if (lastPattern == last) {
            count += 1;
          } else {
            stop = true;
          }
        }
      });
      return {pattern: lastPattern, count: count - 1};
    });

    const dataPattern: Array<{
      nextMove: 'B' | 'P' | 'X';
      road: number;
      count: number;
      pattern: string;
    }> = patternConcluded.map((patt, index) => {
      const maxCount = getMaxCount();
      const pat = crawlPattern(maxCount, [patt.pattern]);
      return {
        road: index,
        count: patt.count,
        pattern: patt.pattern,
        nextMove: pat.result,
      };
    });
    let highestCount = 0;
    const cut = 3;
    const bestChoice = dataPattern.filter(data => {
      if (data.nextMove) {
        if (data.count > highestCount) {
          highestCount = data.count;
          if (data.count > cut) {
            return true;
          }
        }
      }
      return false;
    });
    if (bestChoice.length == 0) {
      return null;
    } else {
      return bestChoice[0];
    }
  };

  const solvedCounter = (
    result: ('P' | 'B')[],
    count: number = 0,
    patterna: Array<Array<'P' | 'B'>>,
  ) => {
    const lastResult = result[result.length - 1];

    const resultToCheck = result.slice(0, -1);
    let totalcount: number = 0;
    const filterPattern = pattern.filter(
      pattern_ => pattern_.nextMove === lastResult,
    );
    const inPattern = counterSearcher(filterPattern, resultToCheck);
    if (inPattern) {
      totalcount += 1;

      patterna.push(inPattern.patternFound);
      return solvedCounter(resultToCheck, count + totalcount, patterna);
    }
    return {count, patterna};
  };

  const identifyForUnited = () => {
    const {road, status} = checker();
    const resultToUse = [
      allresult,
      bigEyeResults,
      smallRoadResults,
      cockroachRoadResults,
    ];
    if (!status) {
      resultToUse[road] = [];
    }

    const result: Array<{nextMove: 'P' | 'B' | 'X'; count: number}> =
      resultToUse.map(result_ => {
        if (result_.length == 1) {
          return {nextMove: 'X', count: 0, pattern: []};
        }
        const count = solvedCounter(result_, 0, []);
        return {
          nextMove: count.patterna.length == 0 ? 'X' : count.patterna[0][0],
          count: count.count,
          pattern: count.patterna,
        };
      });
    return result;
  };

  const identifyHighestPattern = (nextMove: any) => {
    let highestIndex = 0;
    let highestIndexObjects: any = [];
    for (let i = 0; i < nextMove.length; i++) {
      if (nextMove[i].index > highestIndex) {
        highestIndex = nextMove[i].index;
        highestIndexObjects = [i];
      } else if (nextMove[i].index === highestIndex) {
        highestIndexObjects.push(i);
      }
    }

    return highestIndexObjects;
  };

  const unitedVersionCrawler = (
    allResults: ('P' | 'B')[][],
    result: any = null,
    slicer: number = 0,
    firstInstance: number,
    pick: Array<number>,
  ) => {
    const maxCount = getMaxCount();

    // crawlPatternUnitedVersion(maxCount);

    const nextMove = allResults.map(value => {
      //Array of {result: nextMove, index: pattern.length};

      if (value.length > 1) {
        return crawlPatternv2(maxCount, value);
      }
      return {result: null, index: -1};
    });

    let allResultsAreNull = true;

    for (let i = 0; i < nextMove.length; i++) {
      if (nextMove[i].result !== null) {
        allResultsAreNull = false;
        break;
      }
    }

    if (allResultsAreNull) {
      if (result) {
        return {result, road: firstInstance};
      }
      return null;
    } else {
      const highestPatterns: Array<number> = identifyHighestPattern(nextMove);
      if (highestPatterns.length == 1) {
        const indexForRoad = highestPatterns[0];
        if (result) {
          return {
            result: result ? result : nextMove[indexForRoad].result,
            road: pick[indexForRoad],
          };
        }
        return {
          result: result ? result : nextMove[indexForRoad].result,
          road: indexForRoad,
        };
      } else if (highestPatterns.length > 1) {
        const allResult = highestPatterns.map(values => {
          const road =
            values === 0
              ? allresult
              : values === 1
              ? bigEyeResults
              : values == 2
              ? smallRoadResults
              : cockroachRoadResults;
          return road.slice(0, slicer);
        });
        return unitedVersionCrawler(
          allResult,
          result ? result : nextMove[highestPatterns[0]].result,
          slicer - 1,
          highestPatterns[0],
          highestPatterns,
        );
      }
    }
  };

  const [unitedChoosenRoad, setUnitedChoosenRoad] = useState<null | number>(
    null,
  );

  const {setPrediction, prediction} = usePrediction();

  const [alreadyRun, setalreadyRun] = useState(1);

  const [movenext, setmovenext] = useState<'P' | 'B' | 'X' | null>(null);
  useEffect(() => {
    // lastResultAll();

    if (selectedPattern === 'UNITED') {
      const longest = longestSinglePattern();
      const {road, status} = checker();
      const united = identifyForUnited();

      if (longest) {
        const {count, nextMove, pattern, road} = longest;
        setUnitedChoosenRoad(road);
        setNexMove(nextMove);
        return;
      }

      let maxCountIndex = united.reduce(
        (maxIndex, currentElement, currentIndex, array) => {
          return currentElement.count > array[maxIndex].count
            ? currentIndex
            : maxIndex;
        },
        0,
      );

      if (united[maxCountIndex].count !== 0) {
        const data = united[maxCountIndex];
        const {nextMove, count} = data;
        setUnitedChoosenRoad(maxCountIndex);
        setNexMove(nextMove);
      } else {
        const allResults = [
          allresult,
          bigEyeResults,
          smallRoadResults,
          cockroachRoadResults,
        ];
        if (!status) {
          allResults[road] = [];
        }
        const unitedResult = unitedVersionCrawler(allResults, null, -1, -1);
        if (unitedResult) {
          setUnitedChoosenRoad(unitedResult.road);
          setNexMove(unitedResult.result);
        } else {
          setNexMove('X');
          setUnitedChoosenRoad(null);
        }
      }
      // else {
      //   const allResults = [
      //     allresult,
      //     bigEyeResults,
      //     smallRoadResults,
      //     cockroachRoadResults,
      //   ];
      //   const unitedResult = unitedVersionCrawler(allResults, null, -1, -1);
      //   const roadtype = [
      //     allresult,
      //     bigEyeResults,
      //     smallRoadResults,
      //     cockroachRoadResults,
      //   ];

      //   if (unitedResult) {
      //     console.log(unitedResult, 'Resuult');
      //     const {result, road} = unitedResult;
      //     const roadtype_ = roadtype[unitedResult.road];
      //     setUnitedChoosenRoad(road);
      //     setNexMove(result);
      //     // if (roadtype_.length == 1) {
      //     //   setUnitedChoosenRoad(null);
      //     //   setmovenext(null);
      //     //   setNexMove('X');
      //     // } else {
      //     //   if (
      //     //     roadtype_[roadtype_.length - 2] !==
      //     //     roadtype_[roadtype_.length - 1]
      //     //   ) {
      //     //     setUnitedChoosenRoad(null);
      //     //     setmovenext(null);
      //     //     setNexMove('X');
      //     //     setPrediction(null);
      //     //   } else {
      //     //     setUnitedChoosenRoad(road);
      //     //     setNexMove(result);
      //     //   }
      //     // }
      //   }
      // }
    } else {
      const resultToUse =
        selectedPattern == 'GENERAL'
          ? allresult
          : selectedPattern == 'CHINA 1'
          ? bigEyeResults
          : selectedPattern == 'CHINA 2'
          ? smallRoadResults
          : selectedPattern == 'CHINA 3'
          ? cockroachRoadResults
          : allresult;

      //crawl the result here
      const maxCount = getMaxCount();

      // crawlPatternUnitedVersion(maxCount);
      const nextMove = crawlPattern(maxCount, resultToUse);

      if (nextMove) {
        if (nextMove.result) {
          setmovenext(nextMove.result);
          setNexMove(nextMove.result);
        }
      }
    }
  }, [
    allresult.length,
    bigEyeResults.length,
    smallRoadResults.length,
    cockroachRoadResults.length,
  ]);

  const {strategy} = useBetStratStore();

  const [persona, setpersona] = useState<'P' | 'B' | null>(null);

  const [collection, setcollection] = useState<
    Array<{
      road: number | null;
      prediction: 'P' | 'B' | 'X' | null | undefined;
      lastPick: 'P' | 'B' | 'X' | null;
    }>
  >([]);

  useEffect(() => {
    setcollection([
      ...collection,
      {
        road: unitedChoosenRoad,
        prediction: prediction,
        lastPick: persona,
      },
    ]);
  }, [numberStatus]);

  const checker = () => {
    const length = collection.length;
    if (length < 2) {
      return {status: true, road: 0};
    }
    const last = collection[length - 1];
    return {
      status: last.lastPick === last.prediction,
      road: last.road as number,
    };
  };

  useEffect(() => {
    if (selectedPattern === 'UNITED') {
      // if (prediction === ' ') {
      //   setBetAmount(0);
      //   return;
      // }
      if (lastStep !== step) {
        if (collection.length > 2) {
          const predic = collection[collection.length - 1]['prediction'];
          if (predic == ' ') {
            setCurrentStep(currentStep);
            const {amount} = strategy[currentStep - 1];
            setBetAmount(amount);
            return;
          }
        }
        setAmountAndStepV2();
      }
    }
  }, [allresult, prediction]);

  const [lastStep, setlastStep] = useState(1);
  useEffect(() => {
    if (selectedPattern !== 'UNITED') {
      setAmountAndStep();
    }
  }, [allresult]);

  const setAmountAndStepV2 = () => {
    if (selectedPattern === 'UNITED') {
      if (prediction !== ' ' && prediction) {
        if (prediction === persona) {
          const {onWin} = strategy[currentStep - 1];
          console.log('Winner', strategy[currentStep - 1]);
          //winner
          setlastStep(step);
          setCurrentStep(onWin);
          const {amount} = strategy[onWin - 1];
          setBetAmount(amount);
          return;
        } else {
          const {onLose} = strategy[currentStep - 1];
          console.log('losser', strategy[currentStep - 1]);
          setCurrentStep(onLose);
          setlastStep(step);
          const {amount} = strategy[onLose - 1];
          setBetAmount(amount);
          return;
        }
      } else {
        console.log('no prediction', strategy[currentStep - 1]);
        setBetAmount(0);
        return;
      }
    }
  };

  const setAmountAndStep = () => {
    if (persona) {
      if (selectedPattern == 'UNITED') {
        if (prediction !== ' ' && prediction) {
          if (betAmount === 0) {
            const {amount} = strategy[currentStep - 1];
            setBetAmount(amount);
            return;
          }

          if (alreadyRun > 0) {
            if (nextMove === persona) {
              console.log('running here');
              const indexInStrat = currentStep - 1;
              const {onWin} = strategy[indexInStrat];
              setCurrentStep(onWin);

              const {amount} = strategy[onWin - 1];
              setBetAmount(amount);
              return;
            } else {
              console.log('running here onlose');
              const indexInStrat = currentStep - 1;
              const {onLose} = strategy[indexInStrat];
              setCurrentStep(onLose);

              const {amount} = strategy[onLose - 1];
              setBetAmount(amount);
              return;
            }
          } else {
            setalreadyRun(alreadyRun + 1);
            const {onWin} = strategy[0];
            setCurrentStep(onWin);

            const {amount} = strategy[0];
            setBetAmount(amount);
            return;
          }
        } else {
          setBetAmount(0);
        }
      } else {
        if (alreadyRun > 1) {
          if (nextMove === persona) {
            const indexInStrat = currentStep - 1;
            const {onWin} = strategy[indexInStrat];
            setCurrentStep(onWin);

            const {amount} = strategy[onWin - 1];
            setBetAmount(amount);
            return;
          } else {
            const indexInStrat = currentStep - 1;
            const {onLose} = strategy[indexInStrat];
            setCurrentStep(onLose);

            const {amount} = strategy[onLose - 1];
            setBetAmount(amount);
            return;
          }
        } else {
          setalreadyRun(alreadyRun + 1);
          const {onWin} = strategy[0];
          setCurrentStep(onWin);

          const {amount} = strategy[0];
          setBetAmount(amount);
        }
      }
    }
  };

  return (
    <NativeBaseProvider>
      <Flex flex={1} justifyContent={'center'} height={height}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          hidden={true}
        />
        <ScrollView style={{backgroundColor: 'gray', gap: 1}}>
          <Center flexDirection={'row'} h={'12%'} p={1}>
            <Center w={'45%'}>
              <HStack h={'100%'} space={1}>
                <Center p={1} backgroundColor={'black'}>
                  <Text fontSize={9} color={'white'}>
                    STEP
                  </Text>
                </Center>
                <Center p={1} backgroundColor={'white'}>
                  <Text fontSize={9}>{currentStep}</Text>
                </Center>
                <Center p={1} backgroundColor={'black'}>
                  <Text fontSize={9} color={'white'}>
                    BET
                  </Text>
                </Center>
                <Center w={'20%'} p={1} backgroundColor={'white'}>
                  <Text fontSize={9}>{betAmount}</Text>
                </Center>
                <Center
                  p={1}
                  w={'15%'}
                  backgroundColor={
                    status === 'win'
                      ? 'yellow.300'
                      : status == 'lose'
                      ? 'black'
                      : 'white'
                  }>
                  <Text
                    fontSize={9}
                    color={
                      status == 'win'
                        ? 'red.500'
                        : status == 'lose'
                        ? 'white'
                        : 'black'
                    }>
                    {allresult.length == 1
                      ? 'PAUSE'
                      : status == 'lose'
                      ? 'FAIL'
                      : status == 'win'
                      ? 'WIN!'
                      : status == 'tie'
                      ? 'Result'
                      : status.toUpperCase()}
                  </Text>
                </Center>
                <Button
                  size={'small'}
                  w={'25%'}
                  backgroundColor={'black'}
                  onPress={() => {
                    reset();
                    generalStorageReset();
                    setUnitedChoosenRoad(-1);
                    resetAllResults();
                    setmovenext(null);
                    setalreadyRun(1);
                    setpersona(null);
                    setNexMove('X');
                    setPrediction(null);
                    setcollection([]);
                  }}>
                  <Text fontSize={9} ml={4} mr={4} color={'white'}>
                    RESET
                  </Text>
                </Button>
                <Button
                  w={'10%'}
                  size="small"
                  fontSize={9}
                  onPress={() => {
                    RNExitApp.exitApp();
                  }}
                  backgroundColor={'black'}>
                  <Text fontSize={9} m={1} color={'white'}>
                    Exit
                  </Text>
                </Button>
              </HStack>
            </Center>
            <Round width={'7%'} />
            <General width={'10%'} />
            <Number width={'10%'} />
            <DateNow width={'15%'} />
            <BetNumber width={'10%'} />
          </Center>

          <Flex
            h={'30%'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}>
            <BigRoad />
          </Flex>

          <Flex
            height={'60%'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'row'}
            w={'100%'}
            p={1}>
            <Flex m={1} h={'100%'} w={'30%'}>
              <MainFourthLayer
                setpersona={setpersona}
                setadder={() => setAdder(adder + 1)}
                alreadyRun={alreadyRun}
                setalreadyRun={setalreadyRun}
                moveNext={movenext}
                unitedChoosenRoad={unitedChoosenRoad}
              />
            </Flex>
            <Flex w={'70%'}>
              <BetBestStep />
            </Flex>
          </Flex>
        </ScrollView>
      </Flex>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  topView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    width: '100%',
  },
});

export default App;
