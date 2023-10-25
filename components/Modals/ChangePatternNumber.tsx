import {Button, HStack, ScrollView, Text, VStack, View} from 'native-base';
import {useMemo, useState} from 'react';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-buttons-group';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';
import {TouchableOpacity} from 'react-native';

interface ChangePatternNumberProps {
  isVisble: boolean;
  closeModal: () => void;
}

function ChangePatternNumber(props: ChangePatternNumberProps) {
  const {isVisble, closeModal} = props;
  const {selectedPatternNumber, setSelectedPatternNumber} =
    useGeneralStoreRoad();
  const setOfPatterns = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: '1',
        value: '1',
      },
      {
        id: '2', // acts as primary key, should be unique and non-empty string
        label: '2',
        value: '2',
      },
      {
        id: '3', // acts as primary key, should be unique and non-empty string
        label: '3',
        value: '3',
      },
    ],
    [],
  );
  const [selectedId, setSelectedId] = useState<any>(selectedPatternNumber);
  return (
    <Modal style={{backgroundColor: 'white'}} coverScreen isVisible={isVisble}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView w={'100%'}>
          <View
            style={{marginTop: 10}}
            p={5}
            w={'100%'}
            h={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              Choose Pattern Number
            </Text>
            <RadioGroup
              containerStyle={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
              radioButtons={setOfPatterns}
              onPress={setSelectedId}
              selectedId={selectedId}
            />

            <Button
              onPress={() => {
                setSelectedPatternNumber(selectedId);
                closeModal();
              }}>
              Select Pattern Number
            </Button>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default ChangePatternNumber;
