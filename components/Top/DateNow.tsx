import React, { useMemo } from 'react'
import { View, Text, DimensionValue } from 'react-native'

interface props {
    width: DimensionValue | undefined
}


function DateNow(props: props) {

    const dateAndTime = useMemo(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}.${month}.${day}`;

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return { formattedDate, formattedTime }

    }, [])

    const { formattedDate, formattedTime } = dateAndTime
    return (
        <View style={{ backgroundColor: 'black', padding: 2, margin: 2, width: props.width }}>
            <Text style={{ color: 'yellow', textAlign: 'center' }}>
                On {formattedDate}
            </Text>
            <Text style={{ color: 'yellow', textAlign: 'center' }}>
                {formattedTime}
            </Text>
        </View>
    )
}

export default DateNow