import {
  Button,
  Icon,
  HStack,
  IconButton,
  Input,
  Modal,
  VStack,
  Text,
} from 'native-base';
import {usePatternStore} from '../../zustanstorage/patternStorage';
import {Table, Row, Rows} from 'react-native-table-component';
import {Dimensions} from 'react-native';

interface ChangePatternProps {
  show: boolean;
  disable: () => void;
}

const ChangePattern = (props: ChangePatternProps) => {
  const origPattern: Array<{
    nextMove: 'P' | 'B' | 'X';
    pattern: Array<'P' | 'B'>;
  }> = [
    {
      nextMove: 'P',
      pattern: ['P'],
    },
    {
      nextMove: 'B',
      pattern: ['B'],
    },
    {
      nextMove: 'B',
      pattern: ['P', 'B', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['B', 'P', 'B'],
    },
    {
      nextMove: 'X',
      pattern: ['B', 'P', 'P', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['P', 'B', 'P', 'P', 'B'],
    },
    {
      nextMove: 'B',
      pattern: ['B', 'P', 'B', 'B', 'P'],
    },
    {
      nextMove: 'B',
      pattern: ['P', 'B', 'B', 'P', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['B', 'P', 'P', 'B', 'B'],
    },
    {
      nextMove: 'B',
      pattern: ['P', 'B', 'B', 'P', 'P', 'B'],
    },
    {
      nextMove: 'P',
      pattern: ['B', 'P', 'P', 'B', 'B', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['P', 'B', 'P', 'P', 'P', 'B'],
    },
    {
      nextMove: 'B',
      pattern: ['B', 'P', 'B', 'B', 'B', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['P', 'B', 'B', 'P', 'B', 'B'],
    },
    {
      nextMove: 'B',
      pattern: ['B', 'P', 'P', 'B', 'P', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['P', 'B', 'P', 'P', 'B', 'B', 'B'],
    },
    {
      nextMove: 'B',
      pattern: ['B', 'P', 'B', 'B', 'P', 'P', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['P', 'B', 'B', 'B', 'P', 'B', 'B', 'B'],
    },
    {
      nextMove: 'B',
      pattern: ['B', 'P', 'P', 'P', 'B', 'P', 'P', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['P', 'B', 'B', 'P', 'B', 'B', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['B', 'P', 'P', 'B', 'P', 'P', 'B'],
    },
    {
      nextMove: 'B',
      pattern: ['P', 'B', 'B', 'P', 'B', 'B', 'P', 'B'],
    },
    {
      nextMove: 'P',
      pattern: ['B', 'P', 'P', 'B', 'P', 'P', 'B', 'P'],
    },
    {
      nextMove: 'B',
      pattern: ['P', 'B', 'B', 'B', 'P', 'P', 'P'],
    },
    {
      nextMove: 'P',
      pattern: ['B', 'P', 'P', 'P', 'B', 'B', 'B'],
    },
  ];
  const {disable, show} = props;
  const {height, width} = Dimensions.get('window');
  const {pattern, setPattern, reset} = usePatternStore();
  const data = pattern.map(pattern_ => {
    const {nextMove, pattern} = pattern_;
    return [pattern.join(''), nextMove];
  });

  return (
    <Modal closeOnOverlayClick isOpen={show} size={'lg'} backdropVisible={true}>
      <Modal.Content size={'full'} h={'full'}>
        <Icon name="camera" size={'md'} />
        <Modal.Body>
          {data.map((values, index) => {
            return (
              <HStack
                w={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text m={2}>{index + 1}</Text>
                <Input m={2} w={'50%'} placeholder={values[0]} />
                <Input m={2} w={'20%'} placeholder={values[1]} />
                <Button m={2} colorScheme={'red'}>
                  Delete
                </Button>
              </HStack>
            );
          })}
          <HStack>
            <Button
              m={3}
              onPress={() => {
                setPattern(origPattern);
              }}>
              Reset Pattern
            </Button>
            <Button m={3} colorScheme={'red'} onPress={disable}>
              Close
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ChangePattern;
