import {
  Button,
  Icon,
  HStack,
  Input,
  Text,
  ScrollView,
  Center,
} from 'native-base';
import {usePatternStore} from '../../zustanstorage/patternStorage';
import Modal from 'react-native-modal';
import {useEffect, useMemo, useState} from 'react';
import {useGeneralStoreRoad} from '../../zustanstorage/generalStorage';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface ChangePatternProps {
  show: boolean;
  disable: () => void;
}

const ChangePattern = (props: ChangePatternProps) => {
  const {disable, show} = props;

  const {allPatterns, updatePattern, addMorePattern} = usePatternStore();

  const {selectedPattern, selectedPatternNumber} = useGeneralStoreRoad();

  const patternKey_: 'G' | 'C1' | 'C2' | 'C3' | 'U' =
    selectedPattern === 'GENERAL'
      ? 'G'
      : selectedPattern === 'CHINA 1'
      ? 'C1'
      : selectedPattern === 'CHINA 2'
      ? 'C2'
      : selectedPattern === 'CHINA 3'
      ? 'C3'
      : 'U';

  const patternIndex = allPatterns.findIndex(
    pattern => pattern.patternKey == patternKey_,
  );

  const {patternKey, patterns} = allPatterns[patternIndex];

  const [edit, setedit] = useState(false);
  const selectedPatternNumber_ = parseInt(selectedPatternNumber);

  const pattern = patterns[selectedPatternNumber_ - 1];

  const [addCount, setaddCount] = useState(0);
  const [patternData, setpatternData] = useState(pattern);

  const patternToShow = useMemo(() => {
    const data = pattern?.map(pattern_ => {
      const {nextMove, pattern} = pattern_;
      return [pattern.join(''), nextMove];
    });
    return data;
  }, [edit, addCount, selectedPatternNumber_, patternIndex, addCount]);

  const handleOnChange = (index: number, patternToUse: string) => {
    const fixedPatternLogic = patternToUse.split('') as ('P' | 'B')[];
    const copy = pattern;
    copy[index]['pattern'] = fixedPatternLogic;
    setpatternData(copy);
  };

  const handleOnChangeNextMove = (index: number, nextMove: 'P' | 'B' | 'X') => {
    const copy = pattern;
    copy[index]['nextMove'] = nextMove;
    setpatternData(copy);
  };

  const saveToStorage = () => {
    updatePattern(patternIndex, selectedPatternNumber_ - 1, patternData);
  };

  const addRow = () => {
    addMorePattern(patternIndex, selectedPatternNumber_ - 1);
  };

  return (
    <Modal isVisible={show} coverScreen>
      <ScrollView backgroundColor={'white'}>
        <Center m={2} padding={2}>
          <Text fontWeight={'bold'} fontSize={'lg'}>
            Set Pattern {`${selectedPattern} ${selectedPatternNumber}`}
          </Text>
        </Center>

        {patternToShow.map((values: any, index: any) => {
          return (
            <HStack
              w={'100%'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}>
              <Text m={2}>{index + 1}</Text>
              <Input
                isReadOnly={!edit}
                onChangeText={e => handleOnChange(index, e)}
                m={2}
                w={'50%'}
                placeholder={values[0]}
              />
              <Input
                isReadOnly={!edit}
                m={2}
                w={'20%'}
                onChangeText={(e: any) => handleOnChangeNextMove(index, e)}
                placeholder={values[1]}
              />
              <Button m={2} colorScheme={'red'}>
                Delete
              </Button>
            </HStack>
          );
        })}
        <Center>
          <Button
            onPress={() => {
              // /
              addRow();
              setaddCount(addCount + 1);
              console.log('TESTE');
            }}
            backgroundColor={'blue.900'}
            w={'80%'}>
            + Add New Pattern
          </Button>
        </Center>

        <Center>
          <HStack>
            {edit ? (
              <Button
                m={3}
                onPress={() => {
                  setedit(false);
                  saveToStorage();
                  disable();
                }}>
                Save
              </Button>
            ) : (
              <Button
                m={3}
                onPress={() => {
                  setedit(true);
                }}>
                Edit
              </Button>
            )}

            <Button m={3} colorScheme={'red'} onPress={disable}>
              Close
            </Button>
          </HStack>
        </Center>
      </ScrollView>
    </Modal>
  );
};

export default ChangePattern;
