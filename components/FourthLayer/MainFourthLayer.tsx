import React from 'react'

import Benifit from './BenifitSum/Benifit'
import { Center, Flex, HStack, VStack } from 'native-base'
import { useGameStore } from '../../zustanstorage/gameStorage'
import ButtonPlayV2 from './ButtonPlayV2'

function MainFourthLayer() {
    const { betSum, betCompilations, totalbetAmount } = useGameStore()
    return (
        <VStack h={"100%"} w={"100%"} alignItems={'flex-end'} >
            <Flex height={'35%'} w={"100%"} flexDirection={'column'}>
                <Benifit text='Benifit' total={totalbetAmount} />
                <Benifit text='BetSum' total={betSum} />

            </Flex>
            {/* <Center m={1} w={'70%'} h={"25%"} borderRadius={100} backgroundColor={'red.100'}>            </Center> */}
            <Flex height={'65%'} w={"100%"} flexDirection={'column'}>
                <ButtonPlayV2 color={'blue.500'} persona='P' />
                <ButtonPlayV2 color={'red.500'} persona='B' />
            </Flex>
        </VStack>
    )
}

export default MainFourthLayer