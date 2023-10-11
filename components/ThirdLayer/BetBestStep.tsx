import React, { useMemo } from 'react'
import SmallGrids from './SmallGrids'
import { Center, Flex, Spacer, Text, VStack } from 'native-base'

function BetBestStep() {
    const grids = 216
    const SmallGrid = useMemo(() => {
        return <SmallGrids numCols={100} numRows={6} />
    }, [grids])

    return (
        <VStack space={1} marginTop={1}>
            <Flex flexDirection={'row'}>
                <Center borderColor={'amber.900'} borderWidth={'2'} m={1} w={"20%"} backgroundColor={'lightblue'}>
                    <Text fontWeight={'bold'} >
                        BET
                    </Text>
                </Center>
                <Flex w={"78%"} borderColor={'amber.900'} borderWidth={'1px'}>
                    {SmallGrid}
                </Flex>
            </Flex>
            <Flex flexDirection={'row'}>
                <Center borderColor={'blue.900'} borderWidth={'2'} m={1} w={"20%"} backgroundColor={'white'}>
                    <Text color={'gray.400'} fontWeight={'bold'}>
                        Best
                    </Text>

                </Center>
                <Flex w={"78%"} borderColor={'blue.900'} borderWidth={'1px'}>
                    {SmallGrid}
                </Flex>
            </Flex>
            <Flex flexDirection={'row'}>
                <Center m={1} borderColor={'black'} borderWidth={'2'} w={"20%"} backgroundColor={'lightblue'}>
                    <Text color={'gray.400'} fontWeight={'bold'} >
                        BET
                    </Text>
                </Center>
                <Flex w={"78%"} borderColor={'black'} borderWidth={'1px'}>
                    {SmallGrid}
                </Flex>
            </Flex>
            {/* 
            <View style={{ display: 'flex', flexDirection: 'row', height: '33.33%' }}>
                <View style={{ width: '20%', backgroundColor: 'white', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ paddingTop: 2, paddingBottom: 2, width: "90%", borderBottomColor: 'gray', borderBottomWidth: 1, height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Best
                        </Text>
                    </View>
                </View>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', margin: 2 }}>
                    <SmallGrids grids={grids} />
                </View>
            </View>


            <View style={{ display: 'flex', flexDirection: 'row', height: '33.33%' }}>
                <View style={{ width: '20%', backgroundColor: 'lightblue', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>
                        STEP
                    </Text>
                </View>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', margin: 2 }}>
                    <SmallGrids grids={grids} />
                </View>
            </View> */}
        </VStack>
    )
}

export default React.memo(BetBestStep)