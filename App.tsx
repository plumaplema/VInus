
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,

  useColorScheme,
  View,
} from 'react-native';

import Number from './components/Top/Number';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Orientation from 'react-native-orientation-locker';
import Champion from './components/Top/Champion';
import Round from './components/Top/Round';
import General from './components/Top/General';
import DateNow from './components/Top/DateNow';
import BetNumber from './components/Top/BetNumber';
import Boxes from './components/Boxes/Boxes';
import FourBox from './components/ThirdLayer/FourBox';
import BetBestStep from './components/ThirdLayer/BetBestStep';
import Grids from './components/ThirdLayer/Grids';
import MainFourthLayer from './components/FourthLayer/MainFourthLayer';
import { Center, Flex, HStack, NativeBaseProvider, Text, Spacer, Button } from 'native-base';
import { useGameStore } from './zustanstorage/gameStorage';
import { usePatternStore } from './zustanstorage/patternStorage';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const { result, status, step, reset, allresult, nextMove, setNexMove, betAmount, currentStep, betSum } = useGameStore()

  const { pattern } = usePatternStore()

  var { height, width } = Dimensions.get('window')
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getLastELements = (array: Array<"B" | "P">, numb: number) => {
    return array.slice(-numb)
  }

  useEffect(() => {
    const availableResultPattern = pattern.filter(pat => {
      const { pattern } = pat
      return (JSON.stringify(pattern) == JSON.stringify(allresult))
    })

    if (availableResultPattern.length != 0) {
      setNexMove(availableResultPattern[0].nextMove)
    } else {
      const newResult = getLastELements(allresult, 1)
      pattern.map(patt => {
        const { nextMove, pattern } = patt
        if (JSON.stringify(pattern) == JSON.stringify(newResult)) {
          setNexMove(nextMove)
        }
      })
    }
  }, [allresult.length])

  return (
    <NativeBaseProvider>
      <Flex flex={1} justifyContent={'center'} height={height} >
        <StatusBar translucent={true} backgroundColor={'transparent'} hidden={true} />
        <ScrollView style={{ backgroundColor: "gray", gap: 1 }}>
          <HStack h={"15%"} p={1}>
            <Champion width={'35%'} />
            <Round width={'15%'} />
            <General width={'10%'} />
            <Number width={'10%'} />
            <DateNow width={'15%'} />
            <BetNumber width={'10%'} />
          </HStack>

          <Flex h={'22%'} justifyContent={'center'} alignItems={'center'} width={'100%'}
          >
            <Boxes />
          </Flex>

          <Flex height={"45%"} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} w={"100%"} p={1}>
            <Flex m={1} h={'100%'} w={"30%"}>
              <MainFourthLayer />
            </Flex>
            <Flex w={"70%"} >
              <BetBestStep />
            </Flex>

          </Flex>
          <HStack justifyContent={'center'} w={"100%"} h={"10%"} marginBottom={2} marginTop={1}>
            <HStack space={2}>
              <Center w={'7%'} h={"100%"} borderRadius={100} backgroundColor={result == 0 ? 'blue.500' : 'green.500'}>
                {nextMove}
              </Center>
              <Center p={1} backgroundColor={'black'}>
                <Text color={'white'}>
                  STEP
                </Text>
              </Center>
              <Center p={1} backgroundColor={'white'}>
                <Text>
                  {currentStep}
                </Text>
              </Center>
              <Center p={1} backgroundColor={'black'}>
                <Text color={'white'}>
                  BET
                </Text>
              </Center>
              <Center w={'20%'} p={1} backgroundColor={'white'}>
                <Text>
                  {betAmount}
                </Text>
              </Center>
              <Center p={1} w={"15%"} backgroundColor={status === 'win' ? 'yellow.300' : status == 'lose' ? 'black' : 'white'}>
                <Text color={status == 'win' ? 'red.500' : status == 'lose' ? 'white' : 'black'}>
                  {
                    allresult.length == 1 ? 'PAUSE' : status == 'lose' ? "FAIL" : status == 'win' ? "WIN!" : status == 'tie' ? "Result" : status.toUpperCase()
                  }
                </Text>
              </Center>
              <Button backgroundColor={'black'} onPress={reset}>RESET</Button>
              <Button backgroundColor={'black'}>EXIT</Button>
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
    width: "100%",
  }
});

export default App;
