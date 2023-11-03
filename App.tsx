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
import {useGeneralStoreRoad} from './zustanstorage/generalStorage';
import {useAllResult} from './zustanstorage/AllResultStorage';

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
    betAmount,
    currentStep,
    betSum,
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

  const {allPatterns} = usePatternStore();

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
  const {reset: resetBigEye} = useBigEyeStore();

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
    console.log({result, slicer, allResult: allResults.length});
    const maxCount = getMaxCount();

    // crawlPatternUnitedVersion(maxCount);

    const nextMove = allResults.map(value => {
      //Array of {result: nextMove, index: pattern.length};
      if (value.length > 1) {
        return crawlPattern(maxCount, value);
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
      console.log(highestPatterns, 'highestPattern');
      if (highestPatterns.length == 1) {
        console.log('RUnning First');
        const indexForRoad = highestPatterns[0];
        console.log('Returning FInde here');
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
        // const testResult = [
        //   highestPatterns.includes(0) ? allresult : [],
        //   highestPatterns.includes(1) ? bigEyeResults : [],
        //   highestPatterns.includes(2) ? smallRoadResults : [],
        //   highestPatterns.includes(3) ? cockroachRoadResults : [],
        // ];
        // console.log(testResult);
        return unitedVersionCrawler(
          allResult,
          result ? result : nextMove[highestPatterns[0]].result,
          slicer - 1,
          highestPatterns[0],
          highestPatterns,
        );
      }

      // let numberofDataFoundinPattern = 0;
      // let indexForRoad = -1;
      // for (let i = 0; i < nextMove.length; i++) {
      //   if (nextMove[i].index > numberofDataFoundinPattern) {
      //     numberofDataFoundinPattern = nextMove[i].index;
      //     indexForRoad = i;
      //   }
      // }

      // return {
      //   result: nextMove[indexForRoad].result,
      //   road: indexForRoad,
      // };
    }
  };

  const [unitedChoosenRoad, setUnitedChoosenRoad] = useState<null | number>(
    null,
  );

  useEffect(() => {
    // lastResultAll();
    if (selectedPattern === 'UNITED') {
      const allResults = [
        allresult,
        bigEyeResults,
        smallRoadResults,
        cockroachRoadResults,
      ];

      const unitedResult = unitedVersionCrawler(allResults, null, -1, -1);
      console.log(unitedResult, 'RESULT');
      if (unitedResult) {
        const {result, road} = unitedResult;
        setUnitedChoosenRoad(road);
        setNexMove(result);
      }
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

  return (
    <NativeBaseProvider>
      <Flex flex={1} justifyContent={'center'} height={height}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          hidden={true}
        />
        <ScrollView style={{backgroundColor: 'gray', gap: 1}}>
          <HStack h={'15%'} p={1}>
            <Champion width={'35%'} />
            <Round width={'15%'} />
            <General width={'10%'} />
            <Number width={'10%'} />
            <DateNow width={'15%'} />
            <BetNumber width={'10%'} />
          </HStack>

          <Flex
            h={'25%'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}>
            <BigRoad />
          </Flex>

          <Flex
            height={'45%'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'row'}
            w={'100%'}
            p={1}>
            <Flex m={1} h={'100%'} w={'30%'}>
              <MainFourthLayer />
            </Flex>
            <Flex w={'70%'}>
              <BetBestStep />
            </Flex>
          </Flex>
          <HStack
            justifyContent={'center'}
            w={'100%'}
            h={'10%'}
            marginBottom={2}
            marginTop={1}>
            <HStack space={2}>
              <Center
                bgColor={'white'}
                flexDirection={'row'}
                w={'5%'}
                h={'100%'}>
                <Text>
                  {unitedChoosenRoad && unitedChoosenRoad < 0
                    ? ''
                    : unitedChoosenRoad}
                </Text>
              </Center>
              <Center p={1} backgroundColor={'black'}>
                <Text color={'white'}>STEP</Text>
              </Center>
              <Center p={1} backgroundColor={'white'}>
                <Text>{currentStep}</Text>
              </Center>
              <Center p={1} backgroundColor={'black'}>
                <Text color={'white'}>BET</Text>
              </Center>
              <Center w={'20%'} p={1} backgroundColor={'white'}>
                <Text>{betAmount}</Text>
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
                backgroundColor={'black'}
                onPress={() => {
                  reset();
                  generalStorageReset();
                  setUnitedChoosenRoad(-1);
                  resetAllResults();
                }}>
                RESET
              </Button>
              <Button
                onPress={() => {
                  BackHandler.exitApp();
                }}
                backgroundColor={'black'}>
                EXIT
              </Button>
            </HStack>
          </HStack>
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
