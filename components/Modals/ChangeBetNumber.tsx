import {
  Button,
  Icon,
  HStack,
  Input,
  Text,
  ScrollView,
  Center,
  VStack,
} from 'native-base';
import {usePatternStore} from '../../zustanstorage/patternStorage';
import Modal from 'react-native-modal';
import {useEffect, useMemo, useState} from 'react';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {useBetStratStore} from '../../zustanstorage/betStratStorage';
import {useStrategyList} from '../../zustanstorage/strategyList';

interface ChangeBetNumberProps {
  show: boolean;
  disable: () => void;
}

const ChangeBetNumber = (props: ChangeBetNumberProps) => {
  const {disable, show} = props;

  const {selectedBetNumber} = useGeneralStoreRoad();
  const primaryIndex = parseInt(selectedBetNumber.substring(4)) - 1;
  const {strategy} = useBetStratStore();
  const [edit, setEdit] = useState(false);
  const {editStrategy} = useStrategyList();

  return (
    <Modal isVisible={show} coverScreen>
      <ScrollView backgroundColor={'white'}>
        <Center m={2} padding={2}>
          <Text fontWeight={'bold'} fontSize={'lg'}>
            Set Pattern {`${selectedBetNumber}`}
          </Text>
        </Center>

        {strategy.map((values, index: number) => {
          const {amount, onLose, onWin, step} = values;
          return (
            <HStack
              w={'100%'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}>
              <Text m={2}>Step {step}</Text>

              <VStack alignItems={'center'} m={2} w={'50%'}>
                <Text>Bet Amount</Text>
                <Input
                  onChangeText={e =>
                    editStrategy(primaryIndex, index, {
                      ...values,
                      amount: parseInt(e),
                    })
                  }
                  isReadOnly={!edit}
                  placeholder={amount.toString()}
                />
              </VStack>
              <VStack alignItems={'center'} m={2} w={'15%'}>
                <Text>On Win</Text>
                <Input
                  isReadOnly={!edit}
                  m={2}
                  w={'100%'}
                  placeholder={`${onWin.toString()}`}
                  onChangeText={e =>
                    editStrategy(primaryIndex, index, {
                      ...values,
                      onWin: parseInt(e),
                    })
                  }
                />
              </VStack>

              <VStack alignItems={'center'} m={2} w={'15%'}>
                <Text>On Lose</Text>
                <Input
                  isReadOnly={!edit}
                  m={2}
                  w={'100%'}
                  placeholder={`${onLose.toString()}`}
                  onChangeText={e =>
                    editStrategy(primaryIndex, index, {
                      ...values,
                      onLose: parseInt(e),
                    })
                  }
                />
              </VStack>
            </HStack>
          );
        })}
        <Center>
          <HStack>
            {edit ? (
              <Button
                onPress={() => {
                  setEdit(false);
                }}
                m={3}>
                Save
              </Button>
            ) : (
              <>
                <Button
                  onPress={() => {
                    setEdit(true);
                  }}
                  m={3}>
                  Edit
                </Button>
                <Button m={3} colorScheme={'red'} onPress={disable}>
                  Close
                </Button>
              </>
            )}
          </HStack>
        </Center>
      </ScrollView>
    </Modal>
  );
};

export default ChangeBetNumber;
