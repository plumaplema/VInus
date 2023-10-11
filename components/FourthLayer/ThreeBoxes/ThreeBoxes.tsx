import React from 'react'
import { Text, View } from 'react-native'

function ThreeBoxes() {
    return (
        <View style={{ width: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '50%', gap: 2 }}>
                <View style={{ backgroundColor: 'white', width: "80%", height: "18%" }}>

                </View>
                <View style={{ backgroundColor: 'white', width: "80%", height: "18%" }}>

                </View>
                <View style={{ backgroundColor: 'white', width: "80%", height: "18%" }}>

                </View>
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