import React from 'react';

import Benifit from './BenifitSum/Benifit';
import {Center, Flex, HStack, VStack} from 'native-base';
import {useGameStore} from '../../zustanstorage/gameStorage';
import ButtonPlayV2 from './ButtonPlayV2';
import {Touchable, TouchableOpacity} from 'react-native';

function MainFourthLayer() {
  const {betSum, betCompilations, totalbetAmount, nextMove, undo} =
    useGameStore();
  return (
    <VStack h={'100%'} w={'100%'} alignItems={'flex-start'}>
      <HStack h={'20%'} w={'100%'}>
        <Benifit text="Benifit" total={totalbetAmount} />
        <Benifit text="BetSum" total={betSum} />
      </HStack>

      {/* <Center m={1} w={'70%'} h={"25%"} borderRadius={100} backgroundColor={'red.100'}>            </Center> */}
      <Flex height={'60%'} w={'100%'} flexDirection={'column'}>
        <ButtonPlayV2 color={'blue.500'} persona="P" />
        <ButtonPlayV2 color={'red.500'} persona="B" />
      </Flex>
      <TouchableOpacity
        style={{height: '20%', width: '80%'}}
        // onPress={() => undo()}
      >
        <Center
          borderRadius={100}
          ml={2}
          backgroundColor={
            nextMove == 'B' ? 'red.500' : nextMove == 'P' ? 'blue.500' : 'white'
          }
          borderColor={'black'}
          w={'100%'}
          borderWidth={1}
          h="100%">
          {nextMove}
        </Center>
      </TouchableOpacity>
    </VStack>
  );
}

export default MainFourthLayer;
