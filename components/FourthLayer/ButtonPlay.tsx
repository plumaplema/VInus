import { Center, Flex, Text, Button } from 'native-base';
import { View } from 'react-native';
import { useBigEyeStore } from '../../zustanstorage/bigEyeStorage';
import { useEffect } from 'react';
import { onPressButtonPlay, updateBigEyeGrid_ } from '../../utils/helperfunctions';
import { useBetStratStore } from '../../zustanstorage/betStratStorage';
import { useGameStore } from '../../zustanstorage/gameStorage';
import { ColorType } from 'native-base/lib/typescript/components/types';
import React from 'react';
import { useSmallRoadStore } from '../../zustanstorage/smallEyeRoad';
import SmallRoad from '../Roads/SmallRoad';


function ButtonPlay({ color, persona }: { color: ColorType, persona: 'B' | "P" }) {

    const { addToCompilation, betCompilations, addToBigEyeResultCompilation, bigEyeResultCompilation, upDateBigEyeGrid } = useBigEyeStore()

    const { addToCompilationSmallRoad, betCompilationsSmallRoad, addTosmallRoadResultCompilation,
        smallRoadResultCompilation, upDatesmallRoadGrid } = useSmallRoadStore()

    const { play, nextMove, currentStep, setBetAmount, setCurrentStep, upDateGrid, lastStateofGrid, gameGrid } = useGameStore()

    const updateSmallRoadonClick = () => {
        if (betCompilationsSmallRoad.length > 2) {
            if (betCompilationsSmallRoad[1].length > 1) {
                const indexOfLastColumn = betCompilationsSmallRoad.length - 1 //index of last column
                const lastColumn = betCompilationsSmallRoad[indexOfLastColumn] //last column
                const lengthOfLastColumn = lastColumn.length
                if (lengthOfLastColumn !== 1) {
                    const beforeColumn = betCompilationsSmallRoad[indexOfLastColumn - 2][lengthOfLastColumn - 1]
                    const upbeforeColumn = betCompilationsSmallRoad[indexOfLastColumn - 2][lengthOfLastColumn - 2]
                    console.log({ beforeColumn, upbeforeColumn, betCompilationsSmallRoad })
                    if (beforeColumn == upbeforeColumn) {
                        addTosmallRoadResultCompilation('🔴')
                    } else {
                        addTosmallRoadResultCompilation('🔵')
                    }
                } else {
                    const secondToLast = betCompilationsSmallRoad[indexOfLastColumn].length
                    const thirdToLast = betCompilationsSmallRoad[indexOfLastColumn - 1].length
                    console.log(secondToLast, thirdToLast, betCompilationsSmallRoad)
                    if (secondToLast == thirdToLast) {
                        addTosmallRoadResultCompilation('🔴')
                    } else {
                        addTosmallRoadResultCompilation('🔵')
                    }
                }
            }
        }
    }

    const updateBigEyeRoadonClick = () => {
        if (betCompilations.length > 1) {
            if (betCompilations[1].length > 1) {
                const indexOfLastColumn = betCompilations.length - 1 //index of last column
                const lastColumn = betCompilations[indexOfLastColumn] //last column
                const lengthOfLastColumn = lastColumn.length
                if (lengthOfLastColumn !== 1) {
                    const beforeColumn = betCompilations[indexOfLastColumn - 1][lengthOfLastColumn - 1]
                    const upbeforeColumn = betCompilations[indexOfLastColumn - 1][lengthOfLastColumn - 2]
                    console.log({ beforeColumn, upbeforeColumn, betCompilations })
                    if (beforeColumn == upbeforeColumn) {
                        addToBigEyeResultCompilation('🔴')
                    } else {
                        addToBigEyeResultCompilation('🔵')
                    }
                } else {
                    const secondToLast = betCompilations[indexOfLastColumn].length
                    const thirdToLast = betCompilations[indexOfLastColumn - 1].length
                    console.log(secondToLast, thirdToLast, betCompilations)
                    if (secondToLast == thirdToLast) {
                        addToBigEyeResultCompilation('🔴')
                    } else {
                        addToBigEyeResultCompilation('🔵')
                    }
                }
            }
        }
    }

    const updateBigEyeGrid_ = () => {
        bigEyeResultCompilation.map((result, column) => {
            result.map((value, row) => {
                upDateBigEyeGrid(value, row, column)
            })
        })
    }

    const updateSmallRoadGrid_ = () => {
        smallRoadResultCompilation.map((result, column) => {
            result.map((value, row) => {
                upDatesmallRoadGrid(value, row, column)
            })
        })
    }

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

    const onPressButtonPlay = (persona: 'P' | 'B') => {
        play(persona)
        addToCompilation(persona)
        addToCompilationSmallRoad(persona)
        if (nextMove != null) {
            if (nextMove === persona) {
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
        updateGrid(persona)
        updateBigEyeRoadonClick()
        updateSmallRoadonClick()
    }


    useEffect(() => {
        updateBigEyeGrid_()
    }, [bigEyeResultCompilation])

    useEffect(() => {
        updateSmallRoadGrid_()
    }, [smallRoadResultCompilation])

    const { strategy } = useBetStratStore()

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
                        onPressButtonPlay(persona)
                    }} m={'1px'} w={"70%"} h={'100%'} backgroundColor={color} borderRadius={10} borderColor={'black'} borderWidth={1}>
                        <Text color={'white'} fontWeight={'bold'}>
                            {persona}
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

export default React.memo(ButtonPlay)