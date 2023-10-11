import React from 'react'
import { Text, View } from 'react-native'

function FourBox() {
    return (
        <View style={{ height: "100%", width: "30%", display: "flex", flexDirection: 'row' }}>
            <View style={{ margin: 1, width: "50%", gap: 2 }}>
                <View style={{ height: "50%", width: "100%", backgroundColor: "white", display: 'flex', justifyContent: 'center' }}>
                    <Text>aA</Text>
                </View >
                <View style={{ height: "50%", width: "100%", backgroundColor: "white", display: 'flex', justifyContent: 'center' }}>
                    <Text>aA</Text>
                </View>
            </View>

            <View style={{ margin: 1, width: "50%", gap: 2 }}>
                <View style={{ height: "50%", width: "100%", backgroundColor: "white", display: 'flex', justifyContent: 'center' }}>
                    <Text>aA</Text>
                </View >
                <View style={{ height: "50%", width: "100%", backgroundColor: "white", display: 'flex', justifyContent: 'center' }}>
                    <Text>aA</Text>
                </View>
            </View>
        </View>
    )
}

export default FourBox