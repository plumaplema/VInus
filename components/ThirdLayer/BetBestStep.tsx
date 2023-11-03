import React, {useMemo} from 'react';
import {Center, Flex, Text, VStack} from 'native-base';
import BigEyeRoad from '../Roads/BigEyeRoad';
import Cockroach from '../Roads/Cockroach';
import SmallRoad from '../Roads/SmallRoad';

function BetBestStep() {
  const SmallGrid = useMemo(() => {
    return <BigEyeRoad />;
  }, []);

  return (
    <VStack h={'100%'} marginLeft={1} marginTop={1}>
      <Flex h={'31%'} flexDirection={'row'}>
        {/* <Center borderColor={'amber.900'} borderWidth={'2'} m={1} w={"20%"} backgroundColor={'lightblue'}>
                    <Text fontWeight={'bold'} >
                        BET
                    </Text>
                </Center> */}
        <Flex w={'95%'} borderColor={'amber.900'} borderWidth={'1px'}>
          {SmallGrid}
        </Flex>
      </Flex>
      <Flex mt={1} mb={1} h={'31%'} flexDirection={'row'}>
        {/* <Center borderColor={'blue.900'} borderWidth={'2'} m={1} w={"20%"} backgroundColor={'white'}>
                    <Text color={'gray.400'} fontWeight={'bold'}>
                        Best
                    </Text>

                </Center> */}
        <Flex w={'95%'} borderColor={'blue.900'} borderWidth={'1px'}>
          <SmallRoad />
        </Flex>
      </Flex>
      <Flex h={'31%'} flexDirection={'row'}>
        {/* <Center m={1} borderColor={'black'} borderWidth={'2'} w={"20%"} backgroundColor={'lightblue'}>
                    <Text color={'gray.400'} fontWeight={'bold'} >
                        BET
                    </Text>
                </Center> */}
        <Flex w={'95%'} borderColor={'black'} borderWidth={'1px'}>
          <Cockroach />
        </Flex>
      </Flex>
    </VStack>
  );
}

export default React.memo(BetBestStep);
