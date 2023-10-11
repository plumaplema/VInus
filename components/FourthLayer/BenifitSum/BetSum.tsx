import React from 'react'
import { Text, View } from 'react-native'


function BetSum() {
    return (
        <View style={{ margin: 2, width: '50%', height: '100%', padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', gap: 5 }}>
            <View style={{ padding: 1, backgroundColor: 'black', height: "100%", alignItems: 'center', justifyContent: 'center', width: "40%" }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    BetSum
                </Text>
            </View>
            <View style={{ width: '60%', backgroundColor: 'white', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'black' }}>
                    0
                </Text>
            </View>
        </View>
    )
}

export default BetSum