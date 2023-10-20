import React from 'react'
import { Text, View } from 'react-native'
import { Rows } from 'react-native-table-component'

function ThreeBoxes() {
    return (
        <View style={{ width: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '50%', gap: 2 }}>
                <Rows style={{ width: '100%', height: '16.66%' }} textStyle={{ fontSize: 5 }} data={[['X'], ['X']]} />
            </View>
            <View style={{ width: '50%', gap: 2 }}>
                <View style={{ backgroundColor: 'white', width: "80%", height: "18%" }}>

                </View>
                <View style={{ backgroundColor: 'white', width: "80%", height: "18%" }}>

                </View>
                <View style={{ backgroundColor: 'white', width: "80%", height: "18%" }}>

                </View>
            </View>
        </View>
    )
}

export default ThreeBoxes