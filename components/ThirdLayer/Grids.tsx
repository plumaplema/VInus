import React from 'react'
import { View } from 'react-native'
import SmallGrids from './SmallGrids'

function Grids() {
    const grids = 216
    return (
        <View style={{ height: '100%', display: 'flex', width: '80%', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SmallGrids grids={grids} />
            <SmallGrids grids={grids} />
            <SmallGrids grids={grids} />
        </View>
    )
}

export default Grids