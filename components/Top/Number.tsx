import React from 'react'
import { View, Text, DimensionValue } from "react-native"

interface props {
    width: DimensionValue | undefined
}


function Number(props: props) {
    return (
        <View style={{ width: props.width, backgroundColor: 'white', padding: 3, margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ paddingTop: 2, paddingBottom: 2, width: "100%", borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <Text >
                    0
                </Text>
            </View>
        </View>
    )
}

export default Number