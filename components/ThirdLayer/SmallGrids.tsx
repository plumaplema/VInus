import { Flex, HStack, ScrollView, VStack } from 'native-base';
import React from 'react'
import { View } from 'react-native';

interface props {
    numRows: number
    numCols: number
}

function Box() {
    return <Flex backgroundColor={'white'} width={0.5} height={0.5} p={'3px'} borderColor={'gray'} borderWidth={'1px'} />
}

function SmallGrids(props: props) {
    const { numCols, numRows } = props


    return (
        <ScrollView horizontal>
            <VStack>
                {
                    Array.from({ length: numRows }).map((key, index) => {
                        return (
                            <HStack key={index}>
                                {
                                    Array.from({ length: numCols }).map((_, key) => {
                                        return (
                                            <Box key={key} />
                                        )
                                    })
                                }
                            </HStack>)
                    })
                }
            </VStack>
        </ScrollView>
    )
}

export default SmallGrids