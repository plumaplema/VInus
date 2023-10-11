import React from 'react'
import { View } from 'react-native'
import ThreeBoxes from './ThreeBoxes/ThreeBoxes'
import BoxPAndB from './BoxPAndB'
import BluePart from './BluePart'
import RedPart from './RedPart'
import Benifit from './BenifitSum/Benifit'
import BetSum from './BenifitSum/BetSum'
import Result from './Result'
import { Center, Flex, HStack, VStack } from 'native-base'
import { useGameStore } from '../../zustanstorage/gameStorage'

function MainFourthLayer() {
    const { betSum } = useGameStore()
    return (
        <VStack h={"100%"} w={"100%"} alignItems={'flex-end'} >
            <Flex height={'35%'} w={"100%"} flexDirection={'column'}>
                <Benifit text='Benifit' total={0} />
                <Benifit text='BetSum' total={betSum} />

            </Flex>
            {/* <Center m={1} w={'70%'} h={"25%"} borderRadius={100} backgroundColor={'red.100'}>            </Center> */}
            <Flex height={'65%'} w={"100%"} flexDirection={'column'}>
                <BluePart />
                <RedPart />

            </Flex>

        </VStack>
    )
}

export default MainFourthLayer