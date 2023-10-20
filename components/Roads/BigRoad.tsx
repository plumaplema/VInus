import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Rows } from 'react-native-table-component';
import { useGameStore } from '../../zustanstorage/gameStorage';

interface BigRoadProps { }

const BigRoad: React.FC<BigRoadProps> = () => {
    const { gameGrid } = useGameStore()

    const gameGridData = gameGrid.map((data) => {
        return data.map(grid => grid === 'B' ? '🔴' : grid == 'P' ? '🔵' : '⚪')
    })

    return (
        <ScrollView horizontal={true}>
            <View>
                <ScrollView style={styles.dataWrapper}>
                    <Table style={{ backgroundColor: 'white' }} borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Rows style={{ width: '100%', height: '16.66%' }} textStyle={{ fontSize: 10 }} data={gameGridData} />
                    </Table>

                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
});

export default React.memo(BigRoad);
