import React, {useState} from 'react';
import {
  DimensionValue,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import ChangePatternUsage from '../Modals/ChangePatternUsage';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';

interface props {
  width: DimensionValue | undefined;
}

function General(props: props) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const {selectedPattern} = useGeneralStoreRoad();
  return (
    <View
      style={{
        width: props.width,
        backgroundColor: 'white',
        padding: 3,
        margin: 2,
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
      }}>
      <ChangePatternUsage
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
            {selectedPattern}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default General;
