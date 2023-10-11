import { Button, Modal, VStack } from "native-base";
import { usePatternStore } from "../../zustanstorage/patternStorage";
import { Table, Row, Rows } from 'react-native-table-component'
import { Dimensions } from "react-native";

interface ChangePatternProps {
    show: boolean
    disable: () => void
}

const ChangePattern = (props: ChangePatternProps) => {
    const origPattern: Array<{ 'nextMove': 'P' | 'B' | 'X', 'pattern': Array<'P' | 'B'> }> = [
        {
            nextMove: 'P',
            pattern: ['P']
        },
        {
            nextMove: 'B',
            pattern: ['B']
        },
        {
            nextMove: 'B',
            pattern: ['P', 'B', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['B', 'P', 'B']
        },
        {
            nextMove: 'X',
            pattern: ['B', 'P', 'P', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['P', 'B', 'P', 'P', 'B']
        },
        {
            nextMove: 'B',
            pattern: ['B', 'P', 'B', 'B', 'P']
        },
        {
            nextMove: 'B',
            pattern: ['P', 'B', 'B', 'P', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['B', 'P', 'P', 'B', 'B']
        },
        {
            nextMove: 'B',
            pattern: ['P', 'B', 'B', 'P', 'P', 'B']
        },
        {
            nextMove: 'P',
            pattern: ['B', 'P', 'P', 'B', 'B', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['P', 'B', 'P', 'P', 'P', 'B']
        },
        {
            nextMove: 'B',
            pattern: ['B', 'P', 'B', 'B', 'B', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['P', 'B', 'B', 'P', 'B', 'B']
        },
        {
            nextMove: 'B',
            pattern: ['B', 'P', 'P', 'B', 'P', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['P', 'B', 'P', 'P', 'B', 'B', 'B']
        },
        {
            nextMove: 'B',
            pattern: ['B', 'P', 'B', 'B', 'P', 'P', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['P', 'B', 'B', 'B', 'P', 'B', 'B', 'B']
        },
        {
            nextMove: 'B',
            pattern: ['B', 'P', 'P', 'P', 'B', 'P', 'P', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['P', 'B', 'B', 'P', 'B', 'B', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['B', 'P', 'P', 'B', 'P', 'P', 'B']
        },
        {
            nextMove: 'B',
            pattern: ['P', 'B', 'B', 'P', 'B', 'B', 'P', 'B']
        },
        {
            nextMove: 'P',
            pattern: ['B', 'P', 'P', 'B', 'P', 'P', 'B', 'P']
        },
        {
            nextMove: 'B',
            pattern: ['P', 'B', 'B', 'B', 'P', 'P', 'P']
        },
        {
            nextMove: 'P',
            pattern: ['B', 'P', 'P', 'P', 'B', 'B', 'B']
        }
    ]
    const { disable, show } = props
    const { height, width } = Dimensions.get('window')
    const { pattern, setPattern, reset } = usePatternStore()
    const data = pattern.map(pattern_ => {
        const { nextMove, pattern } = pattern_
        return [pattern.join(''), nextMove]
    })

    return (
        <Modal closeOnOverlayClick isOpen={show} size={'lg'} backdropVisible={true}>
            <Modal.Content size={"full"} h={'full'}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <Table>
                        <Row data={['Pattern', 'Result']} textStyle={{ fontWeight: 'bold' }} />
                        <Rows data={data} style={{ margin: 2, borderColor: 'black', borderWidth: 1 }} />
                    </Table>
                    <Button m={3} onPress={() => {
                        setPattern(origPattern)
                    }}>
                        Reset Pattern
                    </Button>
                    <Button m={3} colorScheme={'red'} onPress={disable}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal.Content>

        </Modal>)
}

export default ChangePattern;