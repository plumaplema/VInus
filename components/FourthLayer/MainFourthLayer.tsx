import React, {useState} from 'react';

import Benifit from './BenifitSum/Benifit';
import {Center, Flex, HStack, VStack, Text} from 'native-base';
import {useGameStore} from '../../zustanstorage/gameStorage';
import ButtonPlayV2 from './ButtonPlayV2';
import {Touchable, TouchableOpacity} from 'react-native';
import {usePrediction} from '../../zustanstorage/predictions';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';

function MainFourthLayer({
  unitedChoosenRoad,
  moveNext,
  alreadyRun,
  setalreadyRun,
  setpersona,
  setadder,
}: {
  unitedChoosenRoad: number | null;
  moveNext: 'P' | 'B' | 'X' | null;
  alreadyRun: number;
  setalreadyRun: React.Dispatch<React.SetStateAction<number>>;
  setpersona: React.Dispatch<React.SetStateAction<'P' | 'B' | null>>;
  setadder: () => void;
}) {
  const {betSum, betCompilations, totalbetAmount, nextMove, undo} =
    useGameStore();
  const {selectedPattern} = useGeneralStoreRoad();
  const {prediction} = usePrediction();
  return (
    <VStack h={'100%'} w={'100%'} alignItems={'c'}>
      <HStack h={'20%'} w={'100%'}>
        <Benifit text="Benifit" total={totalbetAmount} />
        <Benifit text="BetSum" total={betSum} />
      </HStack>

      {/* <Center m={1} w={'70%'} h={"25%"} borderRadius={100} backgroundColor={'red.100'}>            </Center> */}
      <Flex height={'60%'} w={'100%'} flexDirection={'column'}>
        <ButtonPlayV2
          setpersona={setpersona}
          alreadyRun={alreadyRun}
          setalreadyRun={setalreadyRun}
          unitedChoosenRoad={unitedChoosenRoad}
          color={'blue.500'}
          persona="P"
          moveNext={moveNext}
          setadder={setadder}
        />
        <ButtonPlayV2
          setpersona={setpersona}
          alreadyRun={alreadyRun}
          setalreadyRun={setalreadyRun}
          unitedChoosenRoad={unitedChoosenRoad}
          color={'red.500'}
          persona="B"
          moveNext={moveNext}
          setadder={setadder}
        />
      </Flex>
      <HStack h={'20%'} w={'100%'}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '80%',
            display: 'flex',
            alignItems: 'center',
          }}
          // onPress={() => undo()}
        >
          <Center
            borderRadius={100}
            ml={2}
            backgroundColor={
              selectedPattern == 'GENERAL'
                ? nextMove == 'B'
                  ? 'red.500'
                  : nextMove == 'P'
                  ? 'blue.500'
                  : 'white'
                : prediction == 'B'
                ? 'red.500'
                : prediction == 'P'
                ? 'blue.500'
                : 'white'
            }
            borderColor={'black'}
            w={'60%'}
            borderWidth={1}
            h="100%">
            {selectedPattern === 'GENERAL' ? nextMove : prediction}
          </Center>
        </TouchableOpacity>
        <Center w={'20%'} h={'100%'}>
          <HStack
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={100}
            w={5}
            h={5}
            bgColor={'white'}>
            <Text fontSize={9}>
              {unitedChoosenRoad && unitedChoosenRoad < 0
                ? ''
                : unitedChoosenRoad}
            </Text>
          </HStack>
        </Center>
      </HStack>
    </VStack>
  );
}

export default MainFourthLayer;
