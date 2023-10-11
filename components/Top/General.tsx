import React, { useState } from 'react'
import { DimensionValue, Text, View } from 'react-native'

interface props {
    width: DimensionValue | undefined
}


function General(props: props) {

    return (
        <View style={{ width: props.width, backgroundColor: 'white', padding: 3, margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ paddingTop: 2, paddingBottom: 2, width: "100%", borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <Text >
                    GENERAL
                </Text>
            </View>
        </View>
    )
}

export default General