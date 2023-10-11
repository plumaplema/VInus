import { Button, Center, Flex, HStack, Text } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { useGameStore } from '../../zustanstorage/gameStorage'
import { useBetStratStore } from '../../zustanstorage/betStratStorage'


function RedPart() {
    const { play, nextMove, currentStep, setBetAmount, setCurrentStep, upDateGrid, lastStateofGrid, gameGrid } = useGameStore()
    const { strategy } = useBetStratStore()

    const updateGrid = (persona: 'P' | 'B') => {
        if (!lastStateofGrid) {
            gameGrid[0][0] = persona
            upDateGrid(persona, 0, 0)

        } else {

            const { coordinates, persona: lastPersona } = lastStateofGrid
            const [row, column] = coordinates
            if (lastPersona == persona) { //continue adding horizontally

                if (row === 5) {
                    gameGrid[row][column + 1] = persona
                    upDateGrid(persona, row, column + 1)
                } else {
                    if (gameGrid[row + 1][column]) {
                        gameGrid[row][column + 1] = persona
                        upDateGrid(persona, row, column + 1)
                    } else {
                        gameGrid[row + 1][column] = persona
                        upDateGrid(persona, row + 1, column)
                    }
                }

            } else { //create new 
                if (row == 5) {
                    const startColumn = gameGrid[0].findIndex(item => item == null)
                    upDateGrid(persona, 0, startColumn)
                } else {
                    gameGrid[0][column + 1] = persona
                    upDateGrid(persona, 0, column + 1)
                }
            }
        }

    }
    return (
        <Flex w={"100%"} h={"50%"} flexDirection={'row'}>
            <Center w={"100%"}  >
                <View style={{ width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '15%', gap: 5 }}>
                        <View style={{ backgroundColor: 'white', width: "90%", height: "20%", borderRadius: 100 }}>

                        </View>
                        <View style={{ backgroundColor: 'white', width: "90%", height: "20%", borderRadius: 100 }}>

                        </View>
                        <View style={{ backgroundColor: 'white', width: "90%", height: "20%", borderRadius: 100 }}>

                        </View>
                    </View>
                    <Button onPress={() => {
                        if (nextMove != null) {
                            if (nextMove === 'B') {
                                const indexInStrat = currentStep - 1
                                const { onWin } = strategy[indexInStrat]
                                setCurrentStep(onWin)

                                const { amount } = strategy[onWin - 1]
                                setBetAmount(amount[0])

                            } else {
                                const indexInStrat = currentStep - 1
                                const { onLose } = strategy[indexInStrat]
                                setCurrentStep(onLose)

                                const { amount } = strategy[onLose - 1]
                                setBetAmount(amount[0])
                            }
                        }
                        play('B')
                        updateGrid('B')
                    }} m={'1px'} w={"70%"} h={'100%'} backgroundColor={'red.500'} borderRadius={10} borderColor={'black'} borderWidth={1}>
                        <Text color={'white'} fontWeight={'bold'}>
                            B
                        </Text>
                    </Button>
                    <View style={{ width: '15%', gap: 5, margin: 2 }}>
                        <View style={{ backgroundColor: 'white', width: "90%", height: "20%", borderRadius: 100 }}>

                        </View>
                        <View style={{ backgroundColor: 'white', width: "90%", height: "20%", borderRadius: 100 }}>

                        </View>
                        <View style={{ backgroundColor: 'white', width: "90%", height: "20%", borderRadius: 100 }}>

                        </View>
                    </View>
                </View>

            </Center>

        </Flex >
    )
}

export default RedPart