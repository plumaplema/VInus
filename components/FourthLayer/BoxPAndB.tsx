import { Center } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'

interface props {
    color: string
    letter: string
}
function BoxPAndB(props: props) {
    const { color, letter } = props
    return (
        <Center w={"100%"} backgroundColor={'red.300'}>
            <Text>{letter}</Text>
        </Center>
    )
}

export default BoxPAndB