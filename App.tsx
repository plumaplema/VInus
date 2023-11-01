import {useEffect} from 'react';
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
  const {bigEyeResults, cockroachRoadResults, smallRoadResults} =
    useAllResult();

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

  const getLastELements = (array: Array<'B' | 'P'>, numb: number) => {
    return array.slice(-numb);
  };

  function findMostRepeating(arr: ('P' | 'B')[]) {
    let counts: any = {};
    let maxCount = 0;
    let mostRepeating = arr[0];

    for (let i = 0; i < arr.length; i++) {
      let current: any = arr[i];
      counts[current] = (counts[current] || 0) + 1;
      if (counts[current] > maxCount) {
        maxCount = counts[current];
        mostRepeating = current;
      }
    }

    return mostRepeating;
  }

  const lastResultAll = () => {
    const maxCount = getMaxCount();
    const allresult_: 'B' | 'P' | 'X' | null = crawlPattern(
      maxCount,
      allresult,
    );
    const bigEyeResults_: 'B' | 'P' | 'X' | null = crawlPattern(
      maxCount,
      bigEyeResults,
    );
    const smallRoadResults_: 'B' | 'P' | 'X' | null = crawlPattern(
      maxCount,
      smallRoadResults,
    );
    const cockroachRoadResults_: 'B' | 'P' | 'X' | null = crawlPattern(
      maxCount,
      cockroachRoadResults,
    );
    console.log(
      {
        allresult_,
        bigEyeResults_,
        smallRoadResults_,
        cockroachRoadResults_,
      },
      'data here',
    );
  };

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
    // Base cases: if pattern is empty or maxCount is 0, return null
    if (resultToUse.length === 0 || maxCount === 0) {
      return null;
    }

    // Helper function to get last elements from resultToUse
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
        return nextMove;
      }
    }

    // Recursive call with reduced maxCount if no match is found
    return crawlPattern(maxCount - 1, resultToUse);
  };

  useEffect(() => {
    lastResultAll();
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
    const nextMove: 'B' | 'P' | 'X' | null = crawlPattern(
      maxCount,
      resultToUse,
    );
    if (nextMove) {
      setNexMove(nextMove);
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
                w={'7%'}
                h={'100%'}
                borderRadius={100}
                backgroundColor={
                  nextMove == 'B'
                    ? 'red.500'
                    : nextMove == 'P'
                    ? 'blue.500'
                    : 'white'
                }>
                {nextMove}
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
              {/* <Button
                backgroundColor={'black'}
                onPress={() => {
                  reset();
                  generalStorageReset();
                  resetBigEye();
                }}>
                RESET
              </Button> */}
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
