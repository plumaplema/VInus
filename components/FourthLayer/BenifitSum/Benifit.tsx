import { Center, Flex, HStack, Text } from 'native-base'
import React from 'react'
import { View } from 'react-native'


function Benifit({ text, total }: { text: string, total: number }) {
    return (
        <Flex w={"100%"} h={"50%"} flexDirection={'row'}>
            <Center m={'1px'} p={'1px'} w={"30%"} backgroundColor={'black'} padding={'1px'} >
                <Text color={'white'}>
                    {text}
                </Text>

            </Center>
            <Center m={'1px'} w={"70%"} backgroundColor={'white'} >
                <Text color={'black'}>
                    {total}
                </Text>

            </Center>
        </Flex>
    )
}

export default Benifit