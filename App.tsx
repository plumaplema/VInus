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

  const {reset: generalStorageReset, selectedPattern} = useGeneralStoreRoad();

  const {pattern} = usePatternStore();

  const {reset: resetBigEye} = useBigEyeStore();

  var {height, width} = Dimensions.get('window');

  const getLastELements = (array: Array<'B' | 'P'>, numb: number) => {
    return array.slice(-numb);
  };

  useEffect(() => {
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

    const availableResultPattern = pattern.filter(pat => {
      const {pattern} = pat;
      return JSON.stringify(pattern) == JSON.stringify(resultToUse);
    });

    if (availableResultPattern.length != 0) {
      setNexMove(availableResultPattern[0].nextMove);
    } else {
      const newResult = getLastELements(resultToUse, 1);
      pattern.map(patt => {
        const {nextMove, pattern} = patt;
        if (JSON.stringify(pattern) == JSON.stringify(newResult)) {
          setNexMove(nextMove);
        }
      });
    }
  }, [allresult.length]);

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
              <Button
                backgroundColor={'black'}
                onPress={() => {
                  reset();
                  generalStorageReset();
                  resetBigEye();
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
