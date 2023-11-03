import React, {useState} from 'react';
import {DimensionValue, Text, TouchableOpacity, View} from 'react-native';
import ChangeBetNumberUsage from '../Modals/ChangeBetNumberUsage';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';

interface props {
  width: DimensionValue | undefined;
}

function BetNumber(props: props) {
  const {selectedBetNumber} = useGeneralStoreRoad();
  const [isModalOpen, setisModalOpen] = useState(false);
  return (
    <View
      style={{
        width: props.width,
        backgroundColor: 'white',
        padding: 3,
        margin: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ChangeBetNumberUsage
        isVisble={isModalOpen}
        closeModal={() => {
          setisModalOpen(false);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setisModalOpen(true);
        }}>
        <View
          style={{
            paddingTop: 2,
            paddingBottom: 2,
            width: '100%',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}>
          <Text style={{fontSize: 5}}>{selectedBetNumber}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default BetNumber;
