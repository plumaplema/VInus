import React, {useState} from 'react';
import {View, Text, DimensionValue, TouchableOpacity} from 'react-native';
import {useGameStore} from '../../zustanstorage/gameStorage';
import ChangePattern from '../Modals/ChangePattern';

interface props {
  width: DimensionValue | undefined;
}

function Round(props: props) {
  const {step} = useGameStore();
  const [showModal, setshowModal] = useState(false);
  const [count, setcount] = useState(0);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'blue',
        padding: 1,
        marginLeft: 15,
        marginRight: 1,
        width: props.width,
        height: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        console.log(count);
        setcount(count + 1);
      }}>
      <View>
        <ChangePattern
          disable={() => {
            setshowModal(false);
            setcount(0);
          }}
          show={count > 3}
        />
        <Text style={{fontSize: 7, fontWeight: 'bold', color: 'white'}}>
          {step} Round
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Round;
