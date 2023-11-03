import {Center, Flex, HStack, Text} from 'native-base';
import React from 'react';
import {View} from 'react-native';

function Benifit({text, total}: {text: string; total: number}) {
  return (
    <Flex mr={1} ml={1} w={'45%'} h={'90%'} flexDirection={'row'}>
      <Center
        mr={1}
        p={'1px'}
        w={'40%'}
        backgroundColor={'black'}
        padding={'1px'}>
        <Text color={'white'}>{text}</Text>
      </Center>
      <Center w={'60%'} backgroundColor={'white'}>
        <Text color={'black'}>{total}</Text>
      </Center>
    </Flex>
  );
}

export default Benifit;
