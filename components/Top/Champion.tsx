import React, {useState} from 'react';
import {View, Text, ViewProps, DimensionValue, Modal} from 'react-native';
import ModalData from '../Modals/ModalData';
import ChangePattern from '../Modals/ChangePattern';

interface props {
  width: DimensionValue | undefined;
}

function Champion(props: props) {
  const [modalVisibility, setmodalVisibility] = useState(false);
  return (
    <View
      style={{
        width: props.width,
        padding: 3,
        backgroundColor: 'white',
        margin: 2,
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 25}}>Kingstar v1.1</Text>
    </View>
  );
}

export default React.memo(Champion);
