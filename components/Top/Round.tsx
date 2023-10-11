import React from 'react'
import { View, Text, DimensionValue } from "react-native"
import { useGameStore } from '../../zustanstorage/gameStorage'

interface props {
    width: DimensionValue | undefined
}


function Round(props: props) {
    const { step } = useGameStore()
    return (
        <View style={{ backgroundColor: "blue", padding: 3, margin: 2, width: props.width, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>{step} Round</Text>
        </View>
    )
}



export default Round