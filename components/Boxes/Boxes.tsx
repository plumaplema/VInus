import { Flex, VStack, ScrollView, View } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import React, { useMemo } from 'react'
import { ColorValue } from 'react-native'
import { useGameStore } from '../../zustanstorage/gameStorage';

function Box({ color }: { color: ColorValue | undefined }) {
    const memoizedBox = useMemo(() => {
        return (
            <Flex backgroundColor={'white'} w='13px' h='10px' justifyContent={'center'} alignItems={'center'} borderColor={'black'} borderWidth={1}>
                <View style={{ width: '90%', height: '90%', borderRadius: 50, borderColor: color, borderWidth: 2.5 }} />
            </Flex>
        )
    }, [color]);

    return memoizedBox;
}

function Boxes() {

    const { gameGrid, step } = useGameStore()

    return (
        <ScrollView horizontal w={"100%"}>
            <VStack borderColor={'black'} borderWidth={1}>
                {
                    gameGrid.map((data2, key) => {
                        return (
                            <FlatGrid
                                key={key}
                                data={data2}
                                numColumns={10}
                                renderItem={({ item, index }) => {
                                    const color = (item == null) ? 'white' : (item === 'B') ? 'red' : 'blue'
                                    return <Box key={index} color={color} />
                                }}
                                spacing={0.2}
                                style={{ margin: 1 }}
                                itemDimension={15}
                            />
                        )
                    })
                }
            </VStack>
        </ScrollView>
    )
}

export default Boxes;
