import { Center, Flex, Text, Button } from 'native-base';
import { View } from 'react-native';
import { useBigEyeStore } from '../../zustanstorage/bigEyeStorage';
import { useEffect, useMemo, useState } from 'react';
import { onPressButtonPlay, updateBigEyeGrid_ } from '../../utils/helperfunctions';
import { useBetStratStore } from '../../zustanstorage/betStratStorage';
import { useGameStore } from '../../zustanstorage/gameStorage';
import { ColorType } from 'native-base/lib/typescript/components/types';
import React from 'react';
import { useSmallRoadStore } from '../../zustanstorage/smallEyeRoad';
import SmallRoad from '../Roads/SmallRoad';
import { useGeneralStoreRoad } from '../../zustanstorage/generalStorage';
import { Rows, Table } from 'react-native-table-component';


function ButtonPlayV2({ color, persona }: { color: ColorType, persona: 'B' | "P" }) {

    const { predictAddToBet, lastpick, updatelastpick, addToBetCompilation, betCompilations, bigRoadCompilation, cockroachRoadCompilation, updateRoadCompilation, smallRoadCompilation } = useGeneralStoreRoad()

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

    const updateRoadonClick = (lengthofData: number, topRow: { first: number, second: number }, notOntopRow: number, compilation: ("P" | "B")[][]) => {
        const { first, second } = topRow
        try {
            if (compilation.length > lengthofData) {
                if (compilation[lengthofData].length > 1) { // the second row is more than one
                    const indexOfLastColumn = compilation.length - 1 //index of last column
                    const lastColumn = compilation[indexOfLastColumn] //last column
                    const lengthOfLastColumn = lastColumn.length
                    if (lengthOfLastColumn === 1) {
                        const secondToLast = compilation[indexOfLastColumn - first].length //second to the last
                        const thirdToLast = compilation[indexOfLastColumn - second].length //third to the last
                        if (secondToLast == thirdToLast) {
                            return '🔴'
                        } else {
                            return '🔵'
                        }
                    } else {
                        const beforeColumn = compilation[indexOfLastColumn - notOntopRow][lengthOfLastColumn - 1]
                        const upbeforeColumn = compilation[indexOfLastColumn - notOntopRow][lengthOfLastColumn - 2]
                        if (beforeColumn == upbeforeColumn) {
                            return '🔴'
                        } else {
                            return '🔵'
                        }
                    }
                } else { //the second row is less than one
                    const indexOfLastColumn = compilation.length - 1 //index of last column
                    const lastColumn = compilation[indexOfLastColumn] //last column
                    const lengthOfLastColumn = lastColumn.length
                    if (lengthOfLastColumn === 1) {
                        const secondToLast = compilation[indexOfLastColumn - first].length //second to the last
                        const thirdToLast = compilation[indexOfLastColumn - second].length //third to the last
                        if (secondToLast == thirdToLast) {
                            return '🔴'
                        } else {
                            return '🔵'
                        }
                    } else {
                        const beforeColumn = compilation[indexOfLastColumn - notOntopRow][lengthOfLastColumn - 1]
                        const upbeforeColumn = compilation[indexOfLastColumn - notOntopRow][lengthOfLastColumn - 2]
                        if (beforeColumn == upbeforeColumn) {
                            return '🔴'
                        } else {
                            return '🔵'
                        }
                    }
                }
            }
            return null
        } catch (error) {
            console.log(error)
        }

    }

    const playerpredict = () => {
        const player = predictAddToBet('P')
        const bigRoad = updateRoadonClick(1, { first: 1, second: 2 }, 1, player);
        const smallRoad = updateRoadonClick(2, { first: 1, second: 3 }, 2, player);
        const cockroach = updateRoadonClick(3, { first: 1, second: 4 }, 3, player);
        return { bigRoad, smallRoad, cockroach }
    }

    const bankerpredict = () => {
        const player = predictAddToBet('B')
        const bigRoad = updateRoadonClick(1, { first: 1, second: 2 }, 1, player);
        const smallRoad = updateRoadonClick(2, { first: 1, second: 3 }, 2, player);
        const cockroach = updateRoadonClick(3, { first: 1, second: 4 }, 3, player);
        return { bigRoad, smallRoad, cockroach }
    }

    const bankerprediction = useMemo(() => bankerpredict(), [betCompilations])
    const playerprediction = useMemo(() => playerpredict(), [betCompilations])
    const getFreshRow = (where: 'bigroad' | 'smallroad' | 'cockroach') => {
        const whatRoad = where === 'bigroad' ? bigRoadCompilation : where == 'cockroach' ? cockroachRoadCompilation : smallRoadCompilation;
        let index = -1
        for (let rowIndex = 0; rowIndex < bigRoadCompilation[0].length; rowIndex++) {
            const fresh = whatRoad[0][rowIndex] == '⚪'
            if (fresh) {
                index = rowIndex
                break
            }
        }
        return index
    }

    const updateBigRoad = (pick: '🔴' | '🔵' | '⚪' | null | undefined, where: 'bigroad' | 'smallroad' | 'cockroach') => {
        if (pick) {
            const lastStateOfPick = where == 'bigroad' ? lastpick.bigroad : where == 'smallroad' ? lastpick.smallroad : lastpick.cockroach
            const whatRoad = where === 'bigroad' ? bigRoadCompilation : where == 'cockroach' ? cockroachRoadCompilation : smallRoadCompilation;
            let location: { row: number, column: number } = { column: -1, row: -1 }
            const columns = Array.from({ length: 6 }, (_, index) => index);
            const freshRow = getFreshRow(where)
            console.log('fresh row', freshRow)
            if (freshRow == 0) {
                location = { row: 0, column: 0 }
            } else {
                const { pick: lastPick, loc } = lastStateOfPick as any
                const [lastRow, lastColumn] = loc
                if (lastPick == pick) { //continue vertically
                    if (lastColumn == 5) {
                        location = { row: lastRow + 1, column: 5 }
                    } else {
                        //check below
                        const valueBelow = whatRoad[lastColumn + 1][lastRow]
                        console.log(valueBelow, 'below value')
                        if (valueBelow == '⚪') {
                            location = { row: lastRow, column: lastColumn + 1 }
                        } else {
                            location = { row: lastRow + 1, column: lastColumn }
                        }

                    }
                } else {
                    location = { row: freshRow, column: 0 }
                }
            }
            const copyofCompilation = whatRoad
            const { column, row } = location
            updatelastpick([row, column], where, pick)
            if (row == 0 && column == 0) {
                copyofCompilation[location.column][location.row] = pick as any
                updateRoadCompilation(where, copyofCompilation)
                return
            } else {
                copyofCompilation[location.column][location.row] = pick as any
                updateRoadCompilation(where, copyofCompilation)
                return
            }

        }
    }

    const setAmountAndStep = () => {
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
        } else {
            setBetAmount(1000)
        }
    }

    return (
        <Flex w={"100%"} h={"50%"} flexDirection={'row'}>
            <Center w={"100%"}  >
                <View style={{ width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        persona == 'B' ? <SymbolData data={bankerprediction} /> : <SymbolData data={playerprediction} />
                    }

                    <Button onPress={() => {
                        // onPressButtonPlay(persona)
                        try {
                            play(persona)
                            updateGrid(persona)
                            const compilation = addToBetCompilation(persona)
                            setAmountAndStep()
                            setTimeout(() => {
                                const bigRoad = updateRoadonClick(1, { first: 1, second: 2 }, 1, compilation);
                                const smallRoad = updateRoadonClick(2, { first: 1, second: 3 }, 2, compilation);
                                const cockroach = updateRoadonClick(3, { first: 1, second: 4 }, 3, compilation);
                                updateBigRoad(bigRoad, 'bigroad');
                                updateBigRoad(smallRoad, 'smallroad');
                                updateBigRoad(cockroach, 'cockroach');
                            }, 10);
                        } catch (error) {
                            console.log(error)
                        }

                    }} m={'1px'} w={"70%"} h={'100%'} backgroundColor={color} borderRadius={10} borderColor={'black'} borderWidth={1}>
                        <Text color={'white'} fontWeight={'bold'}>
                            {persona}
                        </Text>
                    </Button>

                    {
                        persona == 'B' ? <NumberData data={bankerprediction} /> : <NumberData data={playerprediction} />
                    }

                </View>
            </Center>
        </Flex >
    )
}

const SymbolData = ({ data }: {
    data: {
        bigRoad: string | null | undefined;
        smallRoad: string | null | undefined;
        cockroach: string | null | undefined;
    }

}) => {
    const { bigRoad, cockroach, smallRoad } = data
    return (<View style={{ width: '15%', gap: 1, margin: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'white', width: "90%", height: "27%", borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text fontSize={8}>{bigRoad}</Text>
        </View>
        <View style={{ backgroundColor: 'white', width: "90%", height: "27%", borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
                smallRoad === '🔵' ? <View style={{ borderRadius: 100, borderWidth: 2, borderColor: 'blue', width: "40%", height: '80%', margin: 4 }} /> : smallRoad === '🔴' ? <View style={{ borderRadius: 100, borderWidth: 2, borderColor: 'red', width: '40%', height: '80%', margin: 4 }} /> : <Text fontSize={8}>{cockroach}</Text>
            }
        </View>
        <View style={{ backgroundColor: 'white', width: "90%", height: "27%", borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
                cockroach === '🔵' ? <View style={{ backgroundColor: 'blue', width: 2, height: '90%', transform: 'rotate(45deg)', margin: 4 }} /> : cockroach === '🔴' ? <View style={{ backgroundColor: 'red', width: 2, height: '90%', transform: 'rotate(45deg)', margin: 4 }} /> : <Text fontSize={8}>{cockroach}</Text>
            }
        </View>

    </View>)
}

const NumberData = ({ data }: {
    data: {
        bigRoad: string | null | undefined;
        smallRoad: string | null | undefined;
        cockroach: string | null | undefined;
    }

}) => {
    const { bigRoad, cockroach, smallRoad } = data
    return (<View style={{ width: '15%', gap: 1, margin: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: bigRoad == '🔴' ? 'red' : bigRoad == '🔵' ? 'blue' : 'white', width: "90%", height: "27%", borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text fontSize={8} fontWeight={'bold'} color={'white'}>1</Text>
        </View>
        <View style={{ backgroundColor: smallRoad == '🔴' ? 'red' : smallRoad == '🔵' ? 'blue' : 'white', width: "90%", height: "27%", borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text fontSize={8} fontWeight={'bold'} color={'white'}>2</Text>
        </View>
        <View style={{ backgroundColor: cockroach == '🔴' ? 'red' : cockroach == '🔵' ? 'blue' : 'white', width: "90%", height: "27%", borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text fontSize={8} fontWeight={'bold'} color={'white'}>3</Text>
        </View>

    </View>)
}
export default React.memo(ButtonPlayV2)