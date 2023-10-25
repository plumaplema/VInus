import {Button, HStack, ScrollView, Text, VStack, View} from 'native-base';
import {useMemo, useState} from 'react';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-buttons-group';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';
import {TouchableOpacity} from 'react-native';

interface ChangePatternUsage {
  isVisble: boolean;
  closeModal: () => void;
}

function ChangePatternUsage(props: ChangePatternUsage) {
  const {isVisble, closeModal} = props;
  const {selectedPattern, setSelectedPattern} = useGeneralStoreRoad();
  const setOfPatterns = useMemo(
    () => [
      {
        id: 'GENERAL', // acts as primary key, should be unique and non-empty string
        label: 'GENERAL',
        value: 'GENERAL',
      },
      {
        id: 'CHINA 1', // acts as primary key, should be unique and non-empty string
        label: 'CHINA 1',
        value: 'CHINA 1',
      },
      {
        id: 'CHINA 2', // acts as primary key, should be unique and non-empty string
        label: 'CHINA 2',
        value: 'CHINA 2',
      },
      {
        id: 'CHINA 3', // acts as primary key, should be unique and non-empty string
        label: 'CHINA 3',
        value: 'CHINA 3',
      },
      {
        id: 'UNITED', // acts as primary key, should be unique and non-empty string
        label: 'UNITED',
        value: 'UNITED',
      },
    ],
    [],
  );
  const [selectedId, setSelectedId] = useState<any>(selectedPattern);
  return (
    <Modal style={{backgroundColor: 'white'}} coverScreen isVisible={isVisble}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView w={'100%'}>
          <View
            style={{marginTop: 10}}
            w={'100%'}
            h={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              Choose Pattern Below
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
                setSelectedPattern(selectedId);
                closeModal();
              }}>
              Select Pattern
            </Button>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default ChangePatternUsage;
