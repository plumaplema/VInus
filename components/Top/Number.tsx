import React, {useState} from 'react';
import {View, Text, DimensionValue, TouchableOpacity} from 'react-native';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';
import ChangePattern from '../Modals/ChangePatternNumber';
import ChangePatternNumber from '../Modals/ChangePatternNumber';

interface props {
  width: DimensionValue | undefined;
}

function Number(props: props) {
  const {selectedPatternNumber} = useGeneralStoreRoad();
  const [isModalOpen, setisModalOpen] = useState(false);
  return (
    <View
      style={{
        width: props.width,
        backgroundColor: 'white',
        padding: 3,
        margin: 2,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ChangePatternNumber
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
          <Text style={{fontSize: 7, fontWeight: 'bold'}}>
            {selectedPatternNumber}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Number;
