import React, {useMemo, useState} from 'react';
import {View, Text, DimensionValue, TouchableOpacity} from 'react-native';
import ChangeBetNumber from '../Modals/ChangeBetNumber';

interface props {
  width: DimensionValue | undefined;
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

    return {formattedDate, formattedTime};
  }, []);

  const [show, setShow] = useState(false);
  const [count, setcount] = useState(0);

  const {formattedDate, formattedTime} = dateAndTime;
  return (
    <TouchableOpacity
      style={{
        padding: 2,

        width: props.width,
        height: '100%',
      }}
      onPress={() => {
        setcount(count + 1);
      }}>
      <View
        style={{
          backgroundColor: 'black',
          width: '100%',
          height: '100%',
        }}>
        <ChangeBetNumber disable={() => setcount(0)} show={count > 3} />
        <Text style={{color: 'yellow', textAlign: 'center', fontSize: 5}}>
          On {formattedDate}
        </Text>
        <Text style={{color: 'yellow', textAlign: 'center', fontSize: 5}}>
          {formattedTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default DateNow;
