import {Button, HStack, ScrollView, Text, VStack, View} from 'native-base';
import {useEffect, useMemo, useState} from 'react';
import Modal from 'react-native-modal';
import RadioGroup from 'react-native-radio-buttons-group';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';
import {TouchableOpacity} from 'react-native';
import {useBetStratStore} from '../../zustanstorage/betStratStorage';
import {useStrategyList} from '../../zustanstorage/strategyList';

interface ChangeBetNumberUsageProps {
  isVisble: boolean;
  closeModal: () => void;
}

function ChangeBetNumberUsage(props: ChangeBetNumberUsageProps) {
  const {isVisble, closeModal} = props;
  const {selectedBetNumber, setSelectedBetNumber} = useGeneralStoreRoad();
  const setOfPatterns = useMemo(
    () => [
      {
        id: 'BET_1', // acts as primary key, should be unique and non-empty string
        label: 'BET_1',
        value: 'BET_1',
      },
      {
        id: 'BET_2', // acts as primary key, should be unique and non-empty string
        label: 'BET_2',
        value: 'BET_2',
      },
      {
        id: 'BET_3', // acts as primary key, should be unique and non-empty string
        label: 'BET_3',
        value: 'BET_3',
      },
      {
        id: 'BET_4', // acts as primary key, should be unique and non-empty string
        label: 'BET_4',
        value: 'BET_4',
      },
      {
        id: 'BET_5', // acts as primary key, should be unique and non-empty string
        label: 'BET_5',
        value: 'BET_5',
      },
      {
        id: 'BET_6', // acts as primary key, should be unique and non-empty string
        label: 'BET_6',
        value: 'BET_6',
      },
      {
        id: 'BET_7', // acts as primary key, should be unique and non-empty string
        label: 'BET_7',
        value: 'BET_7',
      },
      {
        id: 'BET_8', // acts as primary key, should be unique and non-empty string
        label: 'BET_8',
        value: 'BET_8',
      },
      {
        id: 'BET_9', // acts as primary key, should be unique and non-empty string
        label: 'BET_9',
        value: 'BET_9',
      },
      {
        id: 'BET_10', // acts as primary key, should be unique and non-empty string
        label: 'BET_10',
        value: 'BET_10',
      },
    ],
    [],
  );
  const {setStrategy} = useBetStratStore();
  const {getStrategy} = useStrategyList();
  const [selectedId, setSelectedId] = useState<
    | 'BET_1'
    | 'BET_2'
    | 'BET_3'
    | 'BET_4'
    | 'BET_5'
    | 'BET_6'
    | 'BET_7'
    | 'BET_8'
    | 'BET_9'
    | 'BET_10'
  >(selectedBetNumber);

  useEffect(() => {
    const index = parseInt(selectedId.substring(4)) - 1;
    setStrategy(getStrategy(index));
  }, [selectedId]);
  return (
    <Modal style={{backgroundColor: 'white'}} coverScreen isVisible={isVisble}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView w={'100%'}>
          <TouchableOpacity
            onPress={closeModal}
            style={{position: 'absolute', top: 5, right: 10}}>
            <Text>X</Text>
          </TouchableOpacity>
          <View
            style={{marginTop: 10}}
            p={5}
            w={'100%'}
            h={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              Choose Bet Plan
            </Text>
            <RadioGroup
              containerStyle={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
              radioButtons={setOfPatterns}
              onPress={(id: any) => setSelectedId(id)}
              selectedId={selectedId}
            />

            <Button
              onPress={() => {
                setSelectedBetNumber(selectedId);
                closeModal();
              }}>
              Select Bet Plan
            </Button>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default ChangeBetNumberUsage;
